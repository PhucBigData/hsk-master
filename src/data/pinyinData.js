/**
 * Dữ liệu Hệ thống Pinyin, Bảng Thanh Mẫu - Vận Mẫu, 4 Thanh Điệu và Bài tập Nhận Diện Âm
 * Tách biệt rõ ràng Hán tự mẫu (sampleZh) và Pinyin (samplePy) để âm thanh phát chuẩn 100% giọng người bản xứ
 */

export const PINYIN_TONES = [
  {
    tone: 1,
    name: "Thanh 1 (Âm bình - 高平调)",
    symbol: "ā",
    description: "Đọc cao và đều, ngân dài ngang, cao độ 5-5. Ví dụ: mā (妈 - mẹ).",
    color: "text-red-500",
    bg: "bg-red-50 border-red-200",
    sampleZh: "妈",
    samplePy: "mā",
    meaning: "mẹ"
  },
  {
    tone: 2,
    name: "Thanh 2 (Dương bình - 升调)",
    symbol: "á",
    description: "Đọc vút lên giống dấu sắc trong tiếng Việt, cao độ 3-5. Ví dụ: má (麻 - cây gai).",
    color: "text-amber-500",
    bg: "bg-amber-50 border-amber-200",
    sampleZh: "麻",
    samplePy: "má",
    meaning: "cây gai"
  },
  {
    tone: 3,
    name: "Thanh 3 (Thượng thanh - 降升调)",
    symbol: "ǎ",
    description: "Đọc trầm xuống rồi uốn lượn lên, tương tự dấu hỏi trầm, cao độ 2-1-4. Ví dụ: mǎ (马 - con ngựa).",
    color: "text-emerald-500",
    bg: "bg-emerald-50 border-emerald-200",
    sampleZh: "马",
    samplePy: "mǎ",
    meaning: "con ngựa"
  },
  {
    tone: 4,
    name: "Thanh 4 (Khứ thanh - 全降调)",
    symbol: "à",
    description: "Đọc dứt khoát, dằn giọng từ cao nhất rơi thẳng xuống thấp nhất, cao độ 5-1. Ví dụ: mà (骂 - mắng).",
    color: "text-blue-500",
    bg: "bg-blue-50 border-blue-200",
    sampleZh: "骂",
    samplePy: "mà",
    meaning: "mắng"
  },
  {
    tone: 0,
    name: "Thanh nhẹ (Khinh thanh - 轻声)",
    symbol: "a",
    description: "Đọc rất nhẹ, ngắn và lướt nhanh, không mang dấu. Ví dụ: ma (吗 - từ trợ từ để hỏi).",
    color: "text-gray-500",
    bg: "bg-gray-50 border-gray-200",
    sampleZh: "吗",
    samplePy: "ma",
    meaning: "từ hỏi (phải không)"
  }
];

export const PINYIN_INITIALS = [
  { 
    group: "Âm hai môi & Răng môi", 
    items: [
      { pinyin: "b", ipa: "[p]", tip: "Không bật hơi, đọc giống 'p' nhẹ", hanzi: "爸", samplePy: "bà", meaning: "ba, bố" },
      { pinyin: "p", ipa: "[pʰ]", tip: "BẬT HƠI MẠNH, ngậm môi rồi bật hơi ra", hanzi: "怕", samplePy: "pà", meaning: "sợ" },
      { pinyin: "m", ipa: "[m]", tip: "Đọc giống 'm' tiếng Việt", hanzi: "妈", samplePy: "mā", meaning: "mẹ" },
      { pinyin: "f", ipa: "[f]", tip: "Răng trên chạm môi dưới, giống 'ph'", hanzi: "飞", samplePy: "fēi", meaning: "bay" }
    ]
  },
  { 
    group: "Âm đầu lưỡi giữa", 
    items: [
      { pinyin: "d", ipa: "[t]", tip: "Không bật hơi, đọc giống chữ 't'", hanzi: "大", samplePy: "dà", meaning: "to lớn" },
      { pinyin: "t", ipa: "[tʰ]", tip: "BẬT HƠI MẠNH, đọc giống chữ 'th'", hanzi: "他", samplePy: "tā", meaning: "anh ấy" },
      { pinyin: "n", ipa: "[n]", tip: "Đọc giống chữ 'n' tiếng Việt", hanzi: "你", samplePy: "nǐ", meaning: "bạn" },
      { pinyin: "l", ipa: "[l]", tip: "Đọc giống chữ 'l' tiếng Việt", hanzi: "来", samplePy: "lái", meaning: "đến" }
    ]
  },
  { 
    group: "Âm cuống lưỡi (gốc lưỡi)", 
    items: [
      { pinyin: "g", ipa: "[k]", tip: "Không bật hơi, đọc giống chữ 'c/k'", hanzi: "哥", samplePy: "gē", meaning: "anh trai" },
      { pinyin: "k", ipa: "[kʰ]", tip: "BẬT HƠI MẠNH từ cổ họng giống 'kh'", hanzi: "看", samplePy: "kàn", meaning: "nhìn, xem" },
      { pinyin: "h", ipa: "[x]", tip: "Đọc nhẹ nhàng giữa 'h' và 'kh'", hanzi: "好", samplePy: "hǎo", meaning: "tốt" }
    ]
  },
  { 
    group: "Âm mặt lưỡi (Dễ nhầm nhất)", 
    items: [
      { pinyin: "j", ipa: "[tɕ]", tip: "Không bật hơi, mặt lưỡi ép sát ngạc, giống 'ch'", hanzi: "鸡", samplePy: "jī", meaning: "con gà" },
      { pinyin: "q", ipa: "[tɕʰ]", tip: "BẬT HƠI MẠNH, vị trí giống j nhưng tống hơi mạnh", hanzi: "七", samplePy: "qī", meaning: "số 7" },
      { pinyin: "x", ipa: "[ɕ]", tip: "Mặt lưỡi nâng sát ngạc, giống 'x' tiếng Việt", hanzi: "西", samplePy: "xī", meaning: "hướng tây" }
    ]
  },
  { 
    group: "Âm đầu lưỡi trước (z, c, s)", 
    items: [
      { pinyin: "z", ipa: "[ts]", tip: "Đầu lưỡi chạm răng trên, không bật hơi", hanzi: "在", samplePy: "zài", meaning: "ở" },
      { pinyin: "c", ipa: "[tsʰ]", tip: "BẬT HƠI MẠNH đầu lưỡi, luồng hơi xì qua kẽ răng", hanzi: "次", samplePy: "cì", meaning: "lần" },
      { pinyin: "s", ipa: "[s]", tip: "Đầu lưỡi gần răng, ma sát xì hơi ra giống 'x'", hanzi: "三", samplePy: "sān", meaning: "số 3" }
    ]
  },
  { 
    group: "Âm uốn lưỡi (zh, ch, sh, r)", 
    items: [
      { pinyin: "zh", ipa: "[ʈʂ]", tip: "Uốn lưỡi cong lên chạm ngạc cứng, không bật hơi giống 'tr'", hanzi: "中", samplePy: "zhōng", meaning: "trung" },
      { pinyin: "ch", ipa: "[ʈʂʰ]", tip: "Uốn lưỡi cong lên và BẬT HƠI MẠNH", hanzi: "吃", samplePy: "chī", meaning: "ăn" },
      { pinyin: "sh", ipa: "[ʂ]", tip: "Uốn lưỡi cong lên, cọ xát hơi thoát ra giống 's' nặng", hanzi: "书", samplePy: "shū", meaning: "sách" },
      { pinyin: "r", ipa: "[ʐ]", tip: "Uốn cong lưỡi, dây thanh rung nhẹ giống 'r'", hanzi: "人", samplePy: "rén", meaning: "người" }
    ]
  }
];

export const PINYIN_DRILLS = [
  {
    id: "pd-1",
    audioWord: "妈",
    pinyinAnswer: "mā",
    options: ["mā", "má", "mǎ", "mà"],
    explain: "Thanh 1 (mā - âm bình, cao đều)."
  },
  {
    id: "pd-2",
    audioWord: "吃",
    pinyinAnswer: "chī",
    options: ["cī", "chī", "zhī", "shī"],
    explain: "'ch' là âm uốn lưỡi bật hơi mạnh: chī (ăn)."
  },
  {
    id: "pd-3",
    audioWord: "七",
    pinyinAnswer: "qī",
    options: ["jī", "qī", "xī", "chī"],
    explain: "'q' là âm mặt lưỡi bật hơi mạnh: qī (số 7)."
  },
  {
    id: "pd-4",
    audioWord: "很",
    pinyinAnswer: "hěn",
    options: ["hén", "hèn", "hěn", "hēn"],
    explain: "'hěn' mang thanh 3: trầm rồi uốn lên (rất)."
  },
  {
    id: "pd-5",
    audioWord: "看",
    pinyinAnswer: "kàn",
    options: ["kàn", "gàn", "hàn", "kān"],
    explain: "'k' bật hơi, thanh 4 dứt khoát giật xuống: kàn (nhìn, xem)."
  }
];
