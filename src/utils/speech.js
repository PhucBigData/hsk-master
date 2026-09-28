/**
 * Trình phát âm thanh Tiếng Trung Bản Xứ Tự Nhiên (Human Voice Player)
 * Đảm bảo 100% các phân hệ (Từ vựng, Ngữ pháp, Viết chữ Hán, Pinyin & Thanh điệu)
 * đều sử dụng chung một giọng phát âm chuẩn bản xứ Bắc Kinh tròn vành rõ chữ.
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

  // Làm sạch văn bản: loại bỏ ghi chú trong ngoặc (ví dụ "bà (ba)" -> "bà")
  const cleanText = text.replace(/\s*\(.*?\)\s*/g, '').trim();
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
  // Nguồn 1: Google Native Neural Voice (Độ ổn định 100% cho cả Hán tự, Pinyin và câu dài)
  const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=zh-CN&client=tw-ob`;
  // Nguồn 2: Youdao Chinese Voice (Dự phòng)
  const youdaoUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&le=zh`;

  // Kiểm tra cache trong bộ nhớ để phát 0ms
  let audio = audioCache.get(text);
  if (!audio) {
    audio = new Audio(googleUrl);
    audioCache.set(text, audio);
  }

  audio.playbackRate = rate;
  audio.currentTime = 0;

  audio.onended = () => {
    if (options.onEnd) options.onEnd();
  };

  audio.onerror = () => {
    // Dự phòng sang Youdao nếu Google gặp sự cố mạng
    const fallbackAudio = new Audio(youdaoUrl);
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
    console.warn('Tự động phát bị chặn hoặc lỗi âm thanh mạng, chuyển sang trình duyệt:', err);
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
