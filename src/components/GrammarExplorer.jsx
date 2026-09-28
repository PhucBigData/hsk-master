import React, { useState, useEffect } from 'react';
import { BookOpen, Volume2, CheckCircle, Check, Search, Sparkles, HelpCircle } from 'lucide-react';
import { HSK2_GRAMMAR } from '../data/hskGrammar';
import { speakChinese } from '../utils/speech';
import { playCorrectSound, playWrongSound } from '../utils/audioEffects';

export default function GrammarExplorer() {
  const [selectedGrammarId, setSelectedGrammarId] = useState(1);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('hsk2_mastered_grammar');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quiz state cho bài tập trong bài học
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setQuizAnswer(null);
    setIsAnswered(false);
  }, [selectedGrammarId]);

  const toggleMastered = (id) => {
    let next;
    if (masteredIds.includes(id)) {
      next = masteredIds.filter(item => item !== id);
    } else {
      next = [...masteredIds, id];
    }
    setMasteredIds(next);
    localStorage.setItem('hsk2_mastered_grammar', JSON.stringify(next));
  };

  // Danh mục phân loại
  const categories = ['Tất cả', ...new Set(HSK2_GRAMMAR.map(g => g.category))];

  // Lọc bài học
  const filteredGrammar = HSK2_GRAMMAR.filter(g => {
    const matchCategory = activeCategory === 'Tất cả' || g.category === activeCategory;
    const matchSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        g.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        g.details.some(d => d.word.includes(searchQuery) || d.meaning.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const selectedGrammar = HSK2_GRAMMAR.find(g => g.id === selectedGrammarId) || HSK2_GRAMMAR[0];
  const isMastered = masteredIds.includes(selectedGrammar.id);

  const handleQuizOption = (index) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setQuizAnswer(index);
    if (index === selectedGrammar.quiz.answer) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* HEADER GIỚI THIỆU */}
      <div className="mb-6 bg-gradient-to-r from-red-800 to-amber-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chuẩn Tài Liệu Ngữ Pháp HSK 2 Cốt Lõi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-hanzi">
            Hệ Thống 17 Điểm Ngữ Pháp HSK 2
          </h1>
          <p className="text-sm text-red-100/90 mt-1 max-w-2xl">
            Toàn bộ các điểm ngữ pháp trọng yếu từ tài liệu của bạn (Đại từ, Lượng từ, Phó từ, Giới từ, Trợ từ, Câu chữ 比, Động từ trùng điệp...). Đầy đủ âm thanh giọng đọc và bài tập thực hành.
          </p>
        </div>

        {/* Thanh Tiến Độ Hoàn Thành */}
        <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-right">
          <span className="text-xs text-amber-200 block font-medium">Tiến độ nắm vững:</span>
          <span className="text-xl font-black text-white">
            {masteredIds.length} / {HSK2_GRAMMAR.length}
          </span>
          <span className="text-xs text-red-200 block">chủ điểm ({Math.round((masteredIds.length / HSK2_GRAMMAR.length) * 100)}%)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CỘT TRÁI: DANH SÁCH BÀI HỌC (4 Cột) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-white rounded-3xl p-5 border border-[#e8dfd5] shadow-sm">
            
            {/* Bộ lọc danh mục */}
            <div className="flex space-x-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                    activeCategory === cat
                      ? 'bg-red-700 text-white font-bold'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Ô tìm kiếm */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm điểm ngữ pháp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#f8f5ef] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600/30 text-gray-800"
              />
            </div>

            {/* Danh sách cuộn 17 điểm ngữ pháp */}
            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {filteredGrammar.map((item) => {
                const isSelected = selectedGrammar.id === item.id;
                const mastered = masteredIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedGrammarId(item.id)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition border text-left flex items-start justify-between ${
                      isSelected
                        ? 'bg-red-50/80 border-red-300 shadow-sm'
                        : 'bg-[#fffdfa] border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-amber-100 text-amber-900">
                          {item.category}
                        </span>
                        {mastered && (
                          <span className="flex items-center text-[10px] font-bold text-emerald-700">
                            <Check className="w-3 h-3 mr-0.5" /> Thuộc
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-sm text-gray-900 mt-1 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {item.formula}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* CỘT PHẢI: NỘI DUNG CHI TIẾT BÀI HỌC (8 Cột) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd5] shadow-sm">
            
            {/* Header bài học */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-5 mb-6 gap-3">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                  Chủ điểm {selectedGrammar.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  {selectedGrammar.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {selectedGrammar.summary}
                </p>
              </div>

              {/* Nút Đánh dấu Đã Nắm Vững */}
              <button
                onClick={() => toggleMastered(selectedGrammar.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-xs font-bold transition flex-shrink-0 ${
                  isMastered
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <CheckCircle className={`w-4 h-4 ${isMastered ? 'text-emerald-600' : 'text-gray-400'}`} />
                <span>{isMastered ? 'Đã Nắm Vững' : 'Đánh dấu đã thuộc'}</span>
              </button>
            </div>

            {/* Thẻ Công Thức Vàng */}
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80 mb-6">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                ⭐ Công Thức & Quy Tắc Cốt Lõi:
              </span>
              <div className="font-mono text-sm sm:text-base font-bold text-amber-950">
                {selectedGrammar.formula}
              </div>
            </div>

            {/* Bảng Chi Tiết & Ví Dụ Thuyết Minh */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                Ví dụ minh họa & cách dùng thực tế:
              </h3>

              <div className="space-y-3">
                {selectedGrammar.details.map((detail, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-[#fcfaf7] border border-gray-200/80 hover:border-red-200 transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-hanzi text-xl font-bold text-red-700">
                          {detail.word}
                        </span>
                        <span className="text-xs font-semibold text-gray-500">
                          [{detail.pinyin}]
                        </span>
                        <span className="text-xs font-bold text-gray-700">
                          : {detail.meaning}
                        </span>
                      </div>

                      {/* Nút Nghe Audio */}
                      <button
                        onClick={() => speakChinese(detail.exampleZh)}
                        className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-medium transition"
                        title="Nghe câu ví dụ giọng bản xứ"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe</span>
                      </button>
                    </div>

                    {/* Câu ví dụ */}
                    <div className="pl-3 border-l-2 border-red-500/40 space-y-0.5">
                      <p className="font-hanzi text-base text-gray-900 font-medium">
                        {detail.exampleZh}
                      </p>
                      <p className="text-xs text-red-600 font-medium">
                        {detail.examplePy}
                      </p>
                      <p className="text-xs text-gray-600 italic">
                        {detail.exampleVi}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini-Quiz Phản Xạ Ngữ Pháp Cho Bài Này */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-red-50/60 to-amber-50/40 border border-red-200/80">
              <div className="flex items-center space-x-2 mb-3 text-red-800">
                <HelpCircle className="w-4 h-4 text-red-700" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Thử Thách Nhanh Ngữ Pháp:
                </span>
              </div>

              <p className="text-sm sm:text-base font-bold text-gray-900 mb-4">
                {selectedGrammar.quiz.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedGrammar.quiz.options.map((opt, oIndex) => {
                  let optStyle = "bg-white border-gray-200 text-gray-700 hover:bg-gray-50";

                  if (isAnswered) {
                    if (oIndex === selectedGrammar.quiz.answer) {
                      optStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold";
                    } else if (oIndex === quizAnswer) {
                      optStyle = "bg-red-100 border-red-500 text-red-950 line-through";
                    } else {
                      optStyle = "opacity-40 border-gray-200 text-gray-400";
                    }
                  }

                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleQuizOption(oIndex)}
                      disabled={isAnswered}
                      className={`p-3 rounded-2xl border text-xs sm:text-sm font-medium transition text-left ${optStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="mt-4 p-3 rounded-xl bg-white/80 border border-amber-200 text-xs text-amber-900">
                  💡 <strong>Giải thích:</strong> {selectedGrammar.quiz.explain}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
