import React, { useState, useEffect } from 'react';
import { Volume2, RotateCw, ArrowLeft, ArrowRight, Bookmark, CheckCircle, Shuffle, Search, Sparkles } from 'lucide-react';
import { HSK_VOCABULARY } from '../data/hskVocabulary';
import { speakChinese } from '../utils/speech';
import { playClickSound, playCorrectSound } from '../utils/audioEffects';

export default function FlashcardDeck() {
  const [levelFilter, setLevelFilter] = useState('all'); // 'all' | 1 | 2 | 3
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'need_review' | 'mastered'
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // LocalStorage cho bookmark và từ đã thuộc
  const [masteredList, setMasteredList] = useState(() => {
    try {
      const s = localStorage.getItem('hsk_mastered_words');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  const [reviewList, setReviewList] = useState(() => {
    try {
      const s = localStorage.getItem('hsk_review_words');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  // Lọc danh sách từ
  const filteredCards = HSK_VOCABULARY.filter(word => {
    const matchLevel = levelFilter === 'all' || word.level === Number(levelFilter);
    const matchSearch = word.hanzi.includes(searchQuery) ||
                        word.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        word.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        word.sinoVietnamese.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchStatus = true;
    if (statusFilter === 'mastered') matchStatus = masteredList.includes(word.id);
    if (statusFilter === 'need_review') matchStatus = reviewList.includes(word.id);

    return matchLevel && matchSearch && matchStatus;
  });

  // Khi đổi bộ lọc, reset index
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [levelFilter, statusFilter, searchQuery]);

  const currentWord = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    if (filteredCards.length === 0) return;
    playClickSound();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    if (filteredCards.length === 0) return;
    playClickSound();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleFlip = () => {
    playClickSound();
    setIsFlipped(!isFlipped);
  };

  const toggleMastered = (id) => {
    playCorrectSound();
    let next;
    if (masteredList.includes(id)) {
      next = masteredList.filter(item => item !== id);
    } else {
      next = [...masteredList, id];
    }
    setMasteredList(next);
    localStorage.setItem('hsk_mastered_words', JSON.stringify(next));
  };

  const toggleReview = (id) => {
    playClickSound();
    let next;
    if (reviewList.includes(id)) {
      next = reviewList.filter(item => item !== id);
    } else {
      next = [...reviewList, id];
    }
    setReviewList(next);
    localStorage.setItem('hsk_review_words', JSON.stringify(next));
  };

  // Keyboard shortcut (phím mũi tên trái/phải và space để lật)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentIndex, filteredCards]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      
      {/* HEADER TỪ VỰNG */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-hanzi">
            Thẻ Ghi Nhớ Flashcard 3D
          </h1>
          <p className="text-xs text-gray-500">
            Hệ thống hóa từ vựng HSK 1, 2 và chuyển tiếp HSK 3 kèm Âm Hán-Việt và câu ví dụ
          </p>
        </div>

        {/* Thống kê nhỏ */}
        <div className="flex items-center space-x-3 text-xs">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
            Đã thuộc: {masteredList.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold">
            Cần ôn lại: {reviewList.length}
          </span>
        </div>
      </div>

      {/* THANH BỘ LỌC CẤP ĐỘ & TÌM KIẾM */}
      <div className="bg-white p-4 rounded-3xl border border-[#e8dfd5] shadow-sm mb-6 flex flex-wrap items-center justify-between gap-3">
        
        {/* Nút lọc Level */}
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          <span className="text-xs font-semibold text-gray-400 mr-1">Cấp độ:</span>
          {['all', 1, 2, 3].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                levelFilter === lvl
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {lvl === 'all' ? 'Tất cả' : `HSK ${lvl}`}
            </button>
          ))}
        </div>

        {/* Nút lọc Trạng thái */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setStatusFilter(statusFilter === 'need_review' ? 'all' : 'need_review')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              statusFilter === 'need_review'
                ? 'bg-amber-500 text-white font-bold'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Cần ôn lại ({reviewList.length})
          </button>
        </div>

        {/* Ô Tìm Kiếm */}
        <div className="relative w-full sm:w-48">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm từ vựng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600/30 text-gray-800"
          />
        </div>

      </div>

      {/* KHÔNG TÌM THẤY TỪ NÀO */}
      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#e8dfd5] text-gray-500">
          <p className="text-base font-bold">Không tìm thấy từ vựng phù hợp với bộ lọc.</p>
          <button
            onClick={() => { setLevelFilter('all'); setStatusFilter('all'); setSearchQuery(''); }}
            className="mt-3 px-4 py-2 rounded-xl bg-red-50 text-red-700 text-xs font-bold"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        /* KHUNG THẺ FLASHCARD 3D */
        <div className="space-y-6">
          
          <div className="perspective-1000 w-full min-h-[360px] sm:min-h-[400px]">
            <div
              onClick={handleFlip}
              className={`relative w-full h-full min-h-[360px] sm:min-h-[400px] rounded-3xl transition-transform duration-500 transform-style-preserve-3d cursor-pointer shadow-lg hover:shadow-xl ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              
              {/* MẶT TRƯỚC (HÁN TỰ, AUDIO, CẤP ĐỘ) */}
              <div className="absolute inset-0 backface-hidden bg-white border-2 border-red-900/10 rounded-3xl p-8 flex flex-col justify-between items-center text-center">
                
                <div className="w-full flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full font-bold bg-red-100 text-red-800">
                    HSK {currentWord.level} · {currentWord.category}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReview(currentWord.id);
                      }}
                      className={`p-2 rounded-xl transition ${
                        reviewList.includes(currentWord.id)
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-gray-100 text-gray-400 hover:text-amber-600'
                      }`}
                      title="Đánh dấu cần ôn lại"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMastered(currentWord.id);
                      }}
                      className={`p-2 rounded-xl transition ${
                        masteredList.includes(currentWord.id)
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-400 hover:text-emerald-600'
                      }`}
                      title="Đánh dấu đã thuộc"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Chữ Hán Cực Lớn */}
                <div className="my-auto py-4">
                  <div className="font-hanzi text-6xl sm:text-7xl font-bold text-gray-900 mb-4 tracking-wider">
                    {currentWord.hanzi}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakChinese(currentWord.hanzi);
                    }}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition shadow-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe phát âm chuẩn</span>
                  </button>
                </div>

                <div className="text-xs text-gray-400 font-medium">
                  💡 Chạm vào thẻ hoặc bấm phím Space để xem Pinyin, Hán Việt và Nghĩa
                </div>

              </div>

              {/* MẶT SAU (PINYIN, HÁN VIỆT, NGHĨA, VÍ DỤ) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#fffdfa] to-[#fbf8f2] border-2 border-red-700/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left">
                
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                    <span className="font-hanzi text-3xl font-bold text-gray-900">
                      {currentWord.hanzi}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakChinese(currentWord.hanzi, { rate: 0.7 });
                      }}
                      className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-red-100 text-red-800 text-xs font-bold"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Đọc chậm 0.7x</span>
                    </button>
                  </div>

                  {/* Pinyin & Hán Việt */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-red-50/70 p-3 rounded-2xl border border-red-100">
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">Phiên Âm Pinyin</span>
                      <span className="text-xl font-bold text-red-800 font-mono">{currentWord.pinyin}</span>
                    </div>
                    <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-100">
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">Âm Hán-Việt</span>
                      <span className="text-base font-bold text-amber-900">{currentWord.sinoVietnamese}</span>
                    </div>
                  </div>

                  {/* Nghĩa Tiếng Việt */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Nghĩa tiếng Việt:</span>
                    <p className="text-lg font-bold text-gray-900">{currentWord.meaning}</p>
                  </div>

                  {/* Câu Ví Dụ */}
                  <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-amber-900 uppercase">Ví dụ thực tế:</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakChinese(currentWord.exampleZh);
                        }}
                        className="text-xs text-red-700 hover:underline flex items-center space-x-1"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Nghe câu</span>
                      </button>
                    </div>
                    <p className="font-hanzi text-base font-medium text-gray-900">{currentWord.exampleZh}</p>
                    <p className="text-xs text-red-600 font-medium mt-0.5">{currentWord.examplePy}</p>
                    <p className="text-xs text-gray-600 italic mt-0.5">{currentWord.exampleVi}</p>
                  </div>
                </div>

                <div className="text-center text-xs text-gray-400 pt-2">
                  Chạm lại để quay về mặt trước
                </div>

              </div>

            </div>
          </div>

          {/* THANH ĐIỀU HƯỚNG TIẾP THEO / LÙI LẠI */}
          <div className="flex items-center justify-between px-2">
            <button
              onClick={handlePrev}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold shadow-sm transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Từ trước</span>
            </button>

            <span className="text-xs font-bold text-gray-500">
              {currentIndex + 1} / {filteredCards.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold shadow-md shadow-red-200 transition"
            >
              <span>Từ kế tiếp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
