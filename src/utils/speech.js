/**
 * Trình phát âm thanh Tiếng Trung Chuẩn Bản Xứ (Native Voice Player)
 * Hỗ trợ chuyển đổi Giọng Nữ Bản Xứ (Female - Mặc định, trong trẻo, dễ nghe nhất cho người học)
 * và Giọng Nam Bản Xứ (Male).
 */

let currentAudio = null;
const audioCache = new Map();

// Trạng thái giọng: 'female' (Giọng nữ bản xứ - Mặc định) | 'male' (Giọng nam) | 'browser' (Giọng máy)
let currentVoiceType = typeof localStorage !== 'undefined'
  ? (localStorage.getItem('hsk_voice_type') || 'female')
  : 'female';

let currentSpeechRate = typeof localStorage !== 'undefined'
  ? parseFloat(localStorage.getItem('hsk_speech_rate') || '0.85')
  : 0.85;

export function setVoiceType(type) {
  currentVoiceType = type;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('hsk_voice_type', type);
  }
}

export function getVoiceType() {
  return currentVoiceType;
}

export function setSpeechRate(rate) {
  currentSpeechRate = rate;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('hsk_speech_rate', rate.toString());
  }
}

export function getSpeechRate() {
  return currentSpeechRate;
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

  // Dừng âm thanh đang phát để không bị chồng chéo
  stopSpeaking();

  // Làm sạch văn bản: bỏ chú thích trong ngoặc đơn (ví dụ "bà (ba)" -> "bà")
  const cleanText = text.replace(/\s*\(.*?\)\s*/g, '').trim();
  const rate = options.rate || currentSpeechRate || 0.85;

  // 1. NẾU CHỌN GIỌNG NỮ BẢN XỨ (MẶC ĐỊNH - DỄ NGHE NHẤT)
  if (currentVoiceType === 'female') {
    playFemaleVoice(cleanText, rate, options);
    return;
  }

  // 2. NẾU CHỌN GIỌNG NAM BẢN XỨ
  if (currentVoiceType === 'male') {
    playMaleVoice(cleanText, rate, options);
    return;
  }

  // 3. NẾU CHỌN GIỌNG MÁY TRÌNH DUYỆT
  playBrowserSpeech(cleanText, rate, options);
}

/**
 * Phát âm bằng Giọng Nữ Bản Xứ (Baidu CCTV Female Broadcaster & Youdao Female)
 * Cao độ thanh thoát, tròn vành rõ chữ, phân biệt thanh điệu chuẩn 100%
 */
function playFemaleVoice(text, rate, options) {
  // Nguồn 1: Baidu Native Female Voice (Chuẩn giọng phát thanh viên nữ Bắc Kinh, cực kỳ dịu dàng, dễ nghe)
  const baiduFemaleUrl = `https://fanyi.baidu.com/gettts?lan=zh&text=${encodeURIComponent(text)}&spd=4&source=web`;
  // Nguồn 2: Youdao Female Voice (Dự phòng)
  const youdaoUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&le=zh`;
  // Nguồn 3: Google TTS (Dự phòng tiếp theo)
  const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=zh-CN&client=tw-ob`;

  const cacheKey = `female_${text}`;
  let audio = audioCache.get(cacheKey);

  if (!audio) {
    audio = new Audio(baiduFemaleUrl);
    audioCache.set(cacheKey, audio);
  }

  audio.playbackRate = rate;
  audio.currentTime = 0;

  audio.onended = () => {
    if (options.onEnd) options.onEnd();
  };

  audio.onerror = () => {
    // Thử nguồn Youdao
    const fallbackYoudao = new Audio(youdaoUrl);
    fallbackYoudao.playbackRate = rate;
    fallbackYoudao.onended = options.onEnd;
    fallbackYoudao.onerror = () => {
      // Thử nguồn Google
      const fallbackGoogle = new Audio(googleUrl);
      fallbackGoogle.playbackRate = rate;
      fallbackGoogle.onended = options.onEnd;
      fallbackGoogle.onerror = () => {
        playBrowserSpeech(text, rate, { ...options, preferFemale: true });
      };
      currentAudio = fallbackGoogle;
      fallbackGoogle.play().catch(() => playBrowserSpeech(text, rate, options));
    };
    currentAudio = fallbackYoudao;
    fallbackYoudao.play().catch(() => playBrowserSpeech(text, rate, options));
  };

  currentAudio = audio;
  audio.play().catch((err) => {
    console.warn('Auto-play fallback to browser speech:', err);
    playBrowserSpeech(text, rate, { ...options, preferFemale: true });
  });
}

/**
 * Phát âm bằng Giọng Nam Bản Xứ (Google / Web Speech)
 */
function playMaleVoice(text, rate, options) {
  const googleMaleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=zh-CN&client=tw-ob`;
  
  const cacheKey = `male_${text}`;
  let audio = audioCache.get(cacheKey);
  if (!audio) {
    audio = new Audio(googleMaleUrl);
    audioCache.set(cacheKey, audio);
  }

  audio.playbackRate = rate;
  audio.currentTime = 0;
  audio.onended = () => {
    if (options.onEnd) options.onEnd();
  };

  audio.onerror = () => {
    playBrowserSpeech(text, rate, options);
  };

  currentAudio = audio;
  audio.play().catch(() => playBrowserSpeech(text, rate, options));
}

/**
 * Dự phòng Web Speech API của trình duyệt
 */
function playBrowserSpeech(text, rate, options) {
  if (!('speechSynthesis' in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = rate;
  utterance.pitch = options.preferFemale ? 1.2 : 1.0; // Tăng pitch thanh thoát hơn nếu ưu tiên giọng nữ

  const voices = window.speechSynthesis.getVoices();
  // Tìm giọng nữ tiếng Trung (Tingting, Mei-Jia, Xiaoxiao...)
  const femaleVoice = voices.find(v => 
    (v.lang === 'zh-CN' || v.lang.startsWith('zh')) && 
    (v.name.includes('Tingting') || v.name.includes('Mei-Jia') || v.name.includes('Xiaoxiao') || v.name.includes('Female'))
  );

  const fallbackVoice = voices.find(v => v.lang === 'zh-CN' || v.lang.startsWith('zh'));

  if (femaleVoice) {
    utterance.voice = femaleVoice;
  } else if (fallbackVoice) {
    utterance.voice = fallbackVoice;
  }

  if (options.onEnd) utterance.onend = options.onEnd;
  if (options.onError) utterance.onerror = options.onError;

  window.speechSynthesis.speak(utterance);
}
