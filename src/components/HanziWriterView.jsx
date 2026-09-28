import React, { useState, useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';
import confetti from 'canvas-confetti';
import { Volume2, Play, Edit3, Eye, EyeOff, RotateCcw, CheckCircle, Search, Sparkles } from 'lucide-react';
import { HSK_VOCABULARY } from '../data/hskVocabulary';
import { speakChinese } from '../utils/speech';
import { playCorrectSound, playWrongSound, playStreakSound } from '../utils/audioEffects';

export default function HanziWriterView() {
  const [selectedWord, setSelectedWord] = useState(HSK_VOCABULARY[0]);
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [showOutline, setShowOutline] = useState(true);
  const [quizStatus, setQuizStatus] = useState('idle'); // 'idle' | 'writing' | 'completed' | 'mistake'
  const [mistakesCount, setMistakesCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [customChar, setCustomChar] = useState('');

  const writerContainerRef = useRef(null);
  const writerInstanceRef = useRef(null);

  // Lấy danh sách các ký tự đơn của từ đang chọn
  const characters = Array.from(selectedWord.hanzi);
  const currentChar = characters[selectedCharIndex] || characters[0];

  // Khởi tạo và render HanziWriter khi đổi ký tự hoặc tùy chọn
  useEffect(() => {
    if (!writerContainerRef.current || !currentChar) return;

    // Dọn dẹp DOM cũ
    writerContainerRef.current.innerHTML = '';
    setQuizStatus('idle');
    setMistakesCount(0);

    try {
      const writer = HanziWriter.create(writerContainerRef.current, currentChar, {
        width: 260,
        height: 260,
        padding: 15,
        showOutline: showOutline,
        strokeAnimationSpeed: 1.1,
        delayBetweenStrokes: 220,
        strokeColor: '#991b1b', // Màu mực đỏ thẫm truyền thống
        outlineColor: '#fecaca',
        highlightColor: '#16a34a',
        drawingColor: '#1e293b',
        drawingWidth: 10,
        showCharacter: !isQuizMode,
        charDataLoader: (char, onComplete) => {
          fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${char}.json`)
            .then(res => res.json())
            .then(onComplete)
            .catch(err => {
              console.warn('Could not load char data from CDN:', err);
            });
        }
      });

      writerInstanceRef.current = writer;

      // Nếu đang ở chế độ kiểm tra viết, tự động kích hoạt quiz
      if (isQuizMode) {
        startQuiz(writer);
      } else {
        writer.animateCharacter();
      }
    } catch (e) {
      console.error('Error initializing HanziWriter:', e);
    }

    return () => {
      if (writerInstanceRef.current) {
        writerInstanceRef.current.cancelQuiz();
      }
    };
  }, [currentChar, isQuizMode, showOutline]);

  const handleAnimate = () => {
    if (writerInstanceRef.current) {
      setIsQuizMode(false);
      writerInstanceRef.current.cancelQuiz();
      writerInstanceRef.current.showCharacter();
      writerInstanceRef.current.animateCharacter();
      setQuizStatus('idle');
    }
  };

  const startQuiz = (writer = writerInstanceRef.current) => {
    if (!writer) return;
    setIsQuizMode(true);
    setQuizStatus('writing');
    setMistakesCount(0);

    writer.hideCharacter();
    writer.quiz({
      onMistake: (strokeData) => {
        playWrongSound();
        setQuizStatus('mistake');
        setMistakesCount(prev => prev + 1);
        setTimeout(() => setQuizStatus('writing'), 1200);
      },
      onCorrectStroke: (strokeData) => {
        playCorrectSound();
      },
      onComplete: (summaryData) => {
        playStreakSound();
        setQuizStatus('completed');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    });
  };

  const handleToggleOutline = () => {
    const nextState = !showOutline;
    setShowOutline(nextState);
    if (writerInstanceRef.current) {
      if (nextState) {
        writerInstanceRef.current.showOutline();
      } else {
        writerInstanceRef.current.hideOutline();
      }
    }
  };

  const handlePlayAudio = () => {
    speakChinese(selectedWord.hanzi);
  };

  const handleSelectWord = (word) => {
    setSelectedWord(word);
    setSelectedCharIndex(0);
    speakChinese(word.hanzi);
  };

  const handleCustomCharSubmit = (e) => {
    e.preventDefault();
    if (!customChar.trim()) return;
    const char = customChar.trim()[0];
    const customWordObj = {
      id: `custom-${Date.now()}`,
      hanzi: char,
      pinyin: "Tự do",
      sinoVietnamese: "HÁN TỰ TÙY CHỌN",
      meaning: "Chữ Hán tự nhập",
      level: 0,
      category: "Tùy biến",
      exampleZh: `${char}`,
      examplePy: "",
      exampleVi: "Luyện viết chữ tự chọn"
    };
    setSelectedWord(customWordObj);
    setSelectedCharIndex(0);
    setCustomChar('');
  };

  // Lọc từ vựng theo tìm kiếm
  const filteredVocab = HSK_VOCABULARY.filter(item => 
    item.hanzi.includes(searchQuery) ||
    item.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sinoVietnamese.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Giới thiệu */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-red-900 via-red-800 to-amber-900 rounded-3xl p-6 text-white shadow-xl">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quy tắc Bút Thuận Chuẩn Quốc Tế</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-hanzi">
            Luyện Viết Chữ Hán Từng Nét
          </h1>
          <p className="text-sm text-red-100/90 mt-1 max-w-2xl">
            Quên cách viết? Đừng lo! Xem hoạt ảnh thứ tự từng nét và trực tiếp dùng chuột hoặc ngón tay vẽ trên ô chữ Mễ (米字格) có chấm điểm tự động.
          </p>
        </div>

        {/* Ô nhập chữ bất kỳ */}
        <form onSubmit={handleCustomCharSubmit} className="flex items-center bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
          <input
            type="text"
            placeholder="Nhập chữ Hán bất kỳ..."
            value={customChar}
            onChange={(e) => setCustomChar(e.target.value)}
            className="bg-transparent px-3 py-1.5 text-sm text-white placeholder-red-200/70 focus:outline-none w-44"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-xl transition"
          >
            Luyện viết
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CỘT TRÁI: BẢNG TẬP VIẾT CHỮ HÁN TƯƠNG TÁC (7 Cột) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-[#e8dfd5] shadow-sm">
            
            {/* Thanh chọn chữ nếu từ có nhiều hơn 1 chữ */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Chọn ký tự trong từ:
                </span>
                <div className="flex space-x-1.5">
                  {characters.map((char, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCharIndex(index)}
                      className={`w-9 h-9 rounded-xl font-hanzi text-lg font-bold transition-all ${
                        selectedCharIndex === index
                          ? 'bg-red-700 text-white shadow-md shadow-red-200 scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nút phát âm */}
              <button
                onClick={handlePlayAudio}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition text-xs font-semibold"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe đọc từ</span>
              </button>
            </div>

            {/* Khung vẽ Canvas trên ô chữ Mễ */}
            <div className="flex flex-col items-center">
              <div className="relative p-3 rounded-3xl border-2 border-red-700/30 bg-[#fffdfa] shadow-inner">
                
                {/* Canvas ô chữ Mễ */}
                <div
                  ref={writerContainerRef}
                  className="mizige-bg rounded-2xl overflow-hidden cursor-crosshair"
                />

                {/* Status Indicator Badge */}
                {isQuizMode && (
                  <div className="absolute top-5 right-5">
                    {quizStatus === 'completed' && (
                      <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shadow animate-bounce">
                        <CheckCircle className="w-4 h-4" />
                        <span>Xuất sắc! Đã viết đúng!</span>
                      </span>
                    )}
                    {quizStatus === 'mistake' && (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold shadow animate-pulse">
                        Sai nét! Thử lại nét này...
                      </span>
                    )}
                    {quizStatus === 'writing' && (
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-medium border border-blue-200">
                        Vẽ theo thứ tự nét bút
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Thông báo số lỗi nếu có */}
              {isQuizMode && mistakesCount > 0 && quizStatus !== 'completed' && (
                <p className="text-xs text-amber-700 mt-2">
                  Số lần sai nét: <strong>{mistakesCount}</strong> (Hệ thống sẽ gợi ý nét nếu bạn gặp khó khăn)
                </p>
              )}

              {/* Bảng Nút Điều Khiển */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                
                <button
                  onClick={handleAnimate}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition shadow-sm ${
                    !isQuizMode
                      ? 'bg-red-700 text-white shadow-red-200 ring-2 ring-red-700/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>Xem Bút Thuận</span>
                </button>

                <button
                  onClick={() => startQuiz()}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition shadow-sm ${
                    isQuizMode
                      ? 'bg-emerald-700 text-white shadow-emerald-200 ring-2 ring-emerald-700/30'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Tự Tay Luyện Viết</span>
                </button>

                <button
                  onClick={handleToggleOutline}
                  className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-2xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                  title="Bật/Tắt nét gợi ý mờ"
                >
                  {showOutline ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>{showOutline ? 'Ẩn nét mờ' : 'Hiện nét mờ'}</span>
                </button>

                <button
                  onClick={() => {
                    if (isQuizMode) startQuiz();
                    else handleAnimate();
                  }}
                  className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-2xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                  title="Vẽ lại từ đầu"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại</span>
                </button>

              </div>
            </div>

            {/* Chi tiết thông tin chữ */}
            <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-[#fcfaf7] p-3 rounded-2xl border border-gray-100">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">Hán Tự</span>
                <span className="font-hanzi text-2xl font-bold text-gray-900">{selectedWord.hanzi}</span>
              </div>
              <div className="bg-[#fcfaf7] p-3 rounded-2xl border border-gray-100">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">Pinyin</span>
                <span className="text-lg font-bold text-red-700">{selectedWord.pinyin}</span>
              </div>
              <div className="bg-[#fcfaf7] p-3 rounded-2xl border border-gray-100">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">Hán Việt</span>
                <span className="text-sm font-bold text-amber-800">{selectedWord.sinoVietnamese}</span>
              </div>
              <div className="bg-[#fcfaf7] p-3 rounded-2xl border border-gray-100">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">Cấp Độ</span>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                  HSK {selectedWord.level}
                </span>
              </div>
            </div>

            {/* Ví dụ ứng dụng trong câu */}
            <div className="mt-4 bg-amber-50/60 rounded-2xl p-4 border border-amber-200/60">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  Ví dụ câu giao tiếp thực tế:
                </span>
                <button
                  onClick={() => speakChinese(selectedWord.exampleZh)}
                  className="text-xs text-amber-800 hover:text-red-700 flex items-center space-x-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe cả câu</span>
                </button>
              </div>
              <p className="font-hanzi text-lg text-gray-900 font-medium">{selectedWord.exampleZh}</p>
              <p className="text-xs text-red-700 font-medium mt-0.5">{selectedWord.examplePy}</p>
              <p className="text-xs text-gray-600 mt-1 italic">{selectedWord.exampleVi}</p>
            </div>

          </div>

          {/* Hướng Dẫn Quy Tắc Bút Thuận */}
          <div className="bg-white rounded-3xl p-6 border border-[#e8dfd5] text-xs text-gray-600">
            <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center space-x-1.5">
              <span>💡 7 Quy tắc Bút Thuận Căn Bản (Để không bao giờ quên cách viết):</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">1. <strong>Ngang trước, sổ sau</strong> (ví dụ: 十)</div>
              <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">2. <strong>Phẩy trước, mác sau</strong> (ví dụ: 人, 八)</div>
              <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">3. <strong>Trên trước, dưới sau</strong> (ví dụ: 三, 二)</div>
              <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">4. <strong>Trái trước, phải sau</strong> (ví dụ: 你, 好)</div>
              <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">5. <strong>Ngoài trước, trong sau</strong> (ví dụ: 同, 用)</div>
              <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">6. <strong>Vào trước, đóng sau</strong> (ví dụ: 国, 回, 四)</div>
              <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 col-span-1 sm:col-span-2">7. <strong>Giữa trước, hai bên sau</strong> (ví dụ: 小, 水)</div>
            </div>
          </div>

        </div>

        {/* CỘT PHẢI: DANH SÁCH TỪ VỰNG CHỌN NHANH (5 Cột) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl p-5 border border-[#e8dfd5] shadow-sm">
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">
                Kho Từ Ôn Tập & Luyện Viết
              </h2>
              <span className="text-xs text-gray-500">
                {filteredVocab.length} từ
              </span>
            </div>

            {/* Ô tìm kiếm từ vựng */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm Hán tự, Pinyin, nghĩa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#f8f5ef] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600/30 text-gray-800"
              />
            </div>

            {/* Danh sách cuộn các từ */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredVocab.map((word) => {
                const isSelected = selectedWord.id === word.id;
                return (
                  <div
                    key={word.id}
                    onClick={() => handleSelectWord(word)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-red-50/80 border-red-300 shadow-sm'
                        : 'bg-[#fffdfa] border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center font-hanzi text-xl font-bold text-gray-900 shadow-sm">
                        {word.hanzi}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-red-700">{word.pinyin}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-semibold">
                            {word.sinoVietnamese}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">{word.meaning}</p>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end space-y-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-gray-100 text-gray-600">
                        HSK {word.level}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
