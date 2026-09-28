/**
 * Dữ liệu Hệ thống Pinyin, Bảng Thanh Mẫu - Vận Mẫu, 4 Thanh Điệu và Bài tập Nhận Diện Âm
 */

export const PINYIN_TONES = [
  {
    tone: 1,
    name: "Thanh 1 (Âm bình - 高平调)",
    symbol: "ā",
    description: "Đọc cao và đều, ngân dài ngang, cao độ 5-5. Ví dụ: mā (妈 - mẹ).",
    color: "text-red-500",
    bg: "bg-red-50 border-red-200",
    sample: "mā"
  },
  {
    tone: 2,
    name: "Thanh 2 (Dương bình - 升调)",
    symbol: "á",
    description: "Đọc vút lên giống dấu sắc trong tiếng Việt, cao độ 3-5. Ví dụ: má (麻 - cây gai).",
    color: "text-amber-500",
    bg: "bg-amber-50 border-amber-200",
    sample: "má"
  },
  {
    tone: 3,
    name: "Thanh 3 (Thượng thanh - 降升调)",
    symbol: "ǎ",
    description: "Đọc trầm xuống rồi uốn lượn lên, tương tự dấu hỏi trầm, cao độ 2-1-4. Ví dụ: mǎ (马 - con ngựa).",
    color: "text-emerald-500",
    bg: "bg-emerald-50 border-emerald-200",
    sample: "mǎ"
  },
  {
    tone: 4,
    name: "Thanh 4 (Khứ thanh - 全降调)",
    symbol: "à",
    description: "Đọc dứt khoát, dằn giọng từ cao nhất rơi thẳng xuống thấp nhất, cao độ 5-1. Ví dụ: mà (骂 - mắng).",
    color: "text-blue-500",
    bg: "bg-blue-50 border-blue-200",
    sample: "mà"
  },
  {
    tone: 0,
    name: "Thanh nhẹ (Khinh thanh - 轻声)",
    symbol: "a",
    description: "Đọc rất nhẹ, ngắn và lướt nhanh, không mang dấu. Ví dụ: ma (吗 - từ trợ từ để hỏi).",
    color: "text-gray-500",
    bg: "bg-gray-50 border-gray-200",
    sample: "ma"
  }
];

export const PINYIN_INITIALS = [
  { group: "Âm hai môi & Răng môi", items: [
    { pinyin: "b", ipa: "[p]", tip: "Không bật hơi, đọc giống 'p' nhẹ trong tiếng Việt", sample: "bà (ba)" },
    { pinyin: "p", ipa: "[pʰ]", tip: "BẬT HƠI MẠNH, ngậm môi rồi bật luồng hơi mạnh ra", sample: "pà (sợ)" },
    { pinyin: "m", ipa: "[m]", tip: "Đọc giống 'm' tiếng Việt", sample: "mā (mẹ)" },
    { pinyin: "f", ipa: "[f]", tip: "Răng trên chạm môi dưới, đọc giống 'ph' tiếng Việt", sample: "fēi (bay)" }
  ]},
  { group: "Âm đầu lưỡi giữa", items: [
    { pinyin: "d", ipa: "[t]", tip: "Không bật hơi, đọc giống chữ 't' trong tiếng Việt", sample: "dà (to lớn)" },
    { pinyin: "t", ipa: "[tʰ]", tip: "BẬT HƠI MẠNH, đọc giống chữ 'th' tiếng Việt", sample: "tā (anh ấy)" },
    { pinyin: "n", ipa: "[n]", tip: "Đọc giống chữ 'n' tiếng Việt", sample: "nǐ (bạn)" },
    { pinyin: "l", ipa: "[l]", tip: "Đọc giống chữ 'l' tiếng Việt", sample: "lái (đến)" }
  ]},
  { group: "Âm cuống lưỡi (gốc lưỡi)", items: [
    { pinyin: "g", ipa: "[k]", tip: "Không bật hơi, đọc giống chữ 'c/k' tiếng Việt", sample: "gē (anh trai)" },
    { pinyin: "k", ipa: "[kʰ]", tip: "BẬT HƠI MẠNH từ cổ họng giống chữ 'kh' nhưng bật hơi", sample: "kàn (nhìn/xem)" },
    { pinyin: "h", ipa: "[x]", tip: "Đọc nhẹ nhàng giữa 'h' và 'kh'", sample: "hǎo (tốt)" }
  ]},
  { group: "Âm mặt lưỡi (Dễ nhầm nhất)", items: [
    { pinyin: "j", ipa: "[tɕ]", tip: "Không bật hơi, mặt lưỡi ép sát ngạc cứng, giống 'ch' nhẹ", sample: "jī (con gà)" },
    { pinyin: "q", ipa: "[tɕʰ]", tip: "BẬT HƠI MẠNH, vị trí giống j nhưng tống hơi cực mạnh", sample: "qī (số 7)" },
    { pinyin: "x", ipa: "[ɕ]", tip: "Mặt lưỡi nâng sát ngạc, đọc hơi giống 'x' tiếng Việt", sample: "xī (hướng tây)" }
  ]},
  { group: "Âm đầu lưỡi trước (z, c, s)", items: [
    { pinyin: "z", ipa: "[ts]", tip: "Đầu lưỡi chạm răng trên, không bật hơi", sample: "zài (ở)" },
    { pinyin: "c", ipa: "[tsʰ]", tip: "BẬT HƠI MẠNH đầu lưỡi, luồng hơi xì qua kẽ răng", sample: "cì (lần)" },
    { pinyin: "s", ipa: "[s]", tip: "Đầu lưỡi gần răng, ma sát luồng hơi xì ra giống 'x'", sample: "sān (số 3)" }
  ]},
  { group: "Âm uốn lưỡi (zh, ch, sh, r)", items: [
    { pinyin: "zh", ipa: "[ʈʂ]", tip: "Đầu lưỡi cong lên chạm ngạc cứng, không bật hơi giống 'tr'", sample: "zhōng (trung)" },
    { pinyin: "ch", ipa: "[ʈʂʰ]", tip: "Uốn lưỡi cong lên và BẬT HƠI MẠNH", sample: "chī (ăn)" },
    { pinyin: "sh", ipa: "[ʂ]", tip: "Uốn lưỡi cong lên, cọ xát hơi thoát ra giống 's' nặng", sample: "shū (sách)" },
    { pinyin: "r", ipa: "[ʐ]", tip: "Uốn cong lưỡi, dây thanh rung nhẹ giống 'r'", sample: "rén (người)" }
  ]}
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
