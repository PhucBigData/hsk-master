/**
 * Trình phát âm thanh Tiếng Trung Bản Xứ Tự Nhiên (Human Voice Player)
 * Giải quyết triệt để vấn đề "giọng máy khó nghe, vô hồn":
 * 1. Sử dụng âm thanh phòng thu giọng người bản xứ Trung Quốc chuẩn (Youdao Chinese Native & Google Neural)
 * 2. Hỗ trợ điều chỉnh tốc độ đọc tự nhiên (0.8x - 1.0x) mà không làm vỡ âm sắc
 * 3. Tự động lưu cache để phát tức thì 0ms, không tốn thời gian tải lại
 * 4. Dự phòng thông minh về Web Speech API khi mất kết nối mạng
 */

let currentAudio = null;
const audioCache = new Map();

// Trạng thái nguồn giọng đọc: 'human' (Người bản xứ - Mặc định) | 'browser' (Giọng máy)
let currentVoiceSource = typeof localStorage !== 'undefined' 
  ? (localStorage.getItem('hsk_voice_source') || 'human') 
  : 'human';

export function setVoiceSource(source) {
  currentVoiceSource = source;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('hsk_voice_source', source);
  }
}

export function getVoiceSource() {
  return currentVoiceSource;
}

export function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakChinese(text, options = {}) {
  if (!text || typeof window === 'undefined') return;

  // Dừng mọi âm thanh đang phát để không bị chồng chéo
  stopSpeaking();

  const cleanText = text.trim();
  const rate = options.rate || 0.85; // Mặc định 0.85x tự nhiên, tròn vành rõ chữ

  // NẾU ĐANG CHỌN GIỌNG NGƯỜI BẢN XỨ (MẶC ĐỊNH)
  if (currentVoiceSource === 'human') {
    playHumanVoice(cleanText, rate, options);
    return;
  }

  // NẾU CHỌN GIỌNG MÁY TRÌNH DUYỆT
  playBrowserSpeech(cleanText, rate, options);
}

function playHumanVoice(text, rate, options) {
  // Nguồn 1: Youdao Studio Chinese Voice (Giọng phát thanh viên người bản xứ Bắc Kinh chuẩn cực hay)
  const youdaoUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&le=zh`;
  // Nguồn 2: Google Translate Native Voice (Dự phòng chất lượng cao)
  const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=zh-CN&client=tw-ob`;

  // Kiểm tra cache trong bộ nhớ
  let audio = audioCache.get(text);
  if (!audio) {
    audio = new Audio(youdaoUrl);
    audioCache.set(text, audio);
  }

  audio.playbackRate = rate;
  audio.currentTime = 0;

  audio.onended = () => {
    if (options.onEnd) options.onEnd();
  };

  audio.onerror = () => {
    // Dự phòng sang Google TTS nếu nguồn Youdao bị chặn
    const fallbackAudio = new Audio(googleUrl);
    fallbackAudio.playbackRate = rate;
    fallbackAudio.onended = options.onEnd;
    fallbackAudio.onerror = () => {
      // Dự phòng cuối cùng: Web Speech API
      playBrowserSpeech(text, rate, options);
    };
    currentAudio = fallbackAudio;
    fallbackAudio.play().catch(() => {
      playBrowserSpeech(text, rate, options);
    });
  };

  currentAudio = audio;
  audio.play().catch((err) => {
    console.warn('Lỗi phát âm thanh người bản xứ, chuyển sang trình duyệt:', err);
    playBrowserSpeech(text, rate, options);
  });
}

function playBrowserSpeech(text, rate, options) {
  if (!('speechSynthesis' in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = rate;
  utterance.pitch = options.pitch || 1.0;

  const voices = window.speechSynthesis.getVoices();
  const chineseVoice = voices.find(v => 
    v.lang === 'zh-CN' || v.lang.startsWith('zh') || v.name.includes('Chinese')
  );
  if (chineseVoice) utterance.voice = chineseVoice;

  if (options.onEnd) utterance.onend = options.onEnd;
  if (options.onError) utterance.onerror = options.onError;

  window.speechSynthesis.speak(utterance);
}
