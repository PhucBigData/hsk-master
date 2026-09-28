import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  FileText, CheckCircle2, XCircle, Volume2, ArrowLeft, ArrowRight, 
  HelpCircle, Clock, Award, RotateCcw, Sparkles, BookOpen, Send, Eye, EyeOff
} from 'lucide-react';
import { HSK_PRACTICE_QUESTIONS, HSK_TRANSLATION_EXERCISES } from '../data/hskExercises';
import { speakChinese } from '../utils/speech';
import { playCorrectSound, playWrongSound, playStreakSound } from '../utils/audioEffects';

export default function ExerciseCenter() {
  const [activeSubTab, setActiveSubTab] = useState('quiz'); // 'quiz' | 'translate'
  const [quizMode, setQuizMode] = useState('practice'); // 'practice' | 'exam'
  
  // State chế độ Luyện từng câu
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState({}); // { [qId]: selectedIndex }
  
  // State chế độ Thi thử 44 câu
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examTimeLeft, setExamTimeLeft] = useState(25 * 60); // 25 phút
  const [examActive, setExamActive] = useState(false);

  // State phần Luyện dịch
  const [transDirection, setTransDirection] = useState('forward'); // 'forward' (Trung->Việt) | 'reverse' (Việt->Trung)
  const [userTransInputs, setUserTransInputs] = useState({});
  const [showTransAnswers, setShowTransAnswers] = useState({});

  const currentQ = HSK_PRACTICE_QUESTIONS[currentQIndex];

  // Đếm ngược giờ thi thử
  useEffect(() => {
    let timer = null;
    if (examActive && !examSubmitted && examTimeLeft > 0) {
      timer = setInterval(() => {
        setExamTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examActive, examSubmitted, examTimeLeft]);

  // Chọn đáp án ở chế độ luyện tập
  const handleSelectPractice = (optionIndex) => {
    if (practiceAnswers[currentQ.id] !== undefined) return; // Đã trả lời rồi

    const isCorrect = optionIndex === currentQ.answer;
    setPracticeAnswers(prev => ({ ...prev, [currentQ.id]: optionIndex }));

    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  // Chọn đáp án ở chế độ thi thử
  const handleSelectExam = (qId, optionIndex) => {
    if (examSubmitted) return;
    setExamAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  // Nộp bài thi thử
  const handleSubmitExam = () => {
    setExamSubmitted(true);
    setExamActive(false);

    let correctCount = 0;
    HSK_PRACTICE_QUESTIONS.forEach(q => {
      if (examAnswers[q.id] === q.answer) correctCount++;
    });

    const scorePct = Math.round((correctCount / HSK_PRACTICE_QUESTIONS.length) * 100);
    if (scorePct >= 75) {
      playStreakSound();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  const startExam = () => {
    setExamAnswers({});
    setExamSubmitted(false);
    setExamTimeLeft(25 * 60);
    setExamActive(true);
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Tính điểm thi thử
  const getExamScore = () => {
    let correct = 0;
    HSK_PRACTICE_QUESTIONS.forEach(q => {
      if (examAnswers[q.id] === q.answer) correct++;
    });
    return {
      correct,
      total: HSK_PRACTICE_QUESTIONS.length,
      pct: Math.round((correct / HSK_PRACTICE_QUESTIONS.length) * 100)
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* HEADER BÀI TẬP */}
      <div className="mb-6 bg-gradient-to-r from-red-800 via-red-700 to-amber-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tài Liệu Bài Tập Ngữ Pháp Sơ Cấp (2)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-hanzi">
            Trung Tâm Luyện Đề & Bài Tập HSK 2
          </h1>
          <p className="text-sm text-red-100/90 mt-1 max-w-2xl">
            Tích hợp toàn bộ 44 câu hỏi trắc nghiệm ngữ pháp và 10 bài dịch thực hành từ tập đề của bạn. Có chấm điểm, lời giải thích và phát âm mẫu từng câu.
          </p>
        </div>

        {/* Nút Chuyển Đổi Tab Lớn */}
        <div className="flex space-x-2 bg-black/20 p-1.5 rounded-2xl border border-white/20 self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeSubTab === 'quiz'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>44 Câu Trắc Nghiệm</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('translate')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeSubTab === 'translate'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Bài Tập Luyện Dịch</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PHÂN HỆ 1: 44 CÂU TRẮC NGHIỆM NGỮ PHÁP                     */}
      {/* ======================================================== */}
      {activeSubTab === 'quiz' && (
        <div className="space-y-6">
          
          {/* Thanh chuyển chế độ Luyện Từng Câu vs Thi Thử */}
          <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-[#e8dfd5] shadow-sm">
            <div className="flex space-x-2">
              <button
                onClick={() => setQuizMode('practice')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  quizMode === 'practice'
                    ? 'bg-red-700 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Luyện Từng Câu (Có Lời Giải Tức Thì)
              </button>
              
              <button
                onClick={() => {
                  setQuizMode('exam');
                  if (!examActive && !examSubmitted) startExam();
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  quizMode === 'exam'
                    ? 'bg-red-700 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Thi Thử 25 Phút (Chấm Điểm HSK)
              </button>
            </div>

            {quizMode === 'exam' && examActive && (
              <div className="flex items-center space-x-2 text-sm font-bold text-red-700 px-3 py-1 bg-red-50 rounded-xl border border-red-200">
                <Clock className="w-4 h-4" />
                <span>{formatTimer(examTimeLeft)}</span>
              </div>
            )}
          </div>

          {/* CHẾ ĐỘ 1: LUYỆN TỪNG CÂU (PRACTICE) */}
          {quizMode === 'practice' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Khung Câu Hỏi Hiện Tại (8 Cột) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd5] shadow-sm">
                
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                    Câu {currentQIndex + 1} / {HSK_PRACTICE_QUESTIONS.length}
                  </span>
                  
                  {/* Nút nghe đọc câu hoàn chỉnh */}
                  <button
                    onClick={() => speakChinese(currentQ.correctSentence)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition"
                    title="Nghe phát âm câu đúng bằng giọng người bản xứ"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe câu mẫu</span>
                  </button>
                </div>

                {/* Tiêu đề & Nội dung câu */}
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  {currentQ.title}
                </h2>
                
                <div className="p-4 rounded-2xl bg-[#faf7f2] border border-gray-200/80 mb-6">
                  <p className="font-hanzi text-lg sm:text-xl font-bold text-gray-900 leading-relaxed whitespace-pre-line">
                    {currentQ.sentence}
                  </p>
                </div>

                {/* 4 Lựa chọn đáp án */}
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((opt, idx) => {
                    const hasAnswered = practiceAnswers[currentQ.id] !== undefined;
                    const userSelected = practiceAnswers[currentQ.id] === idx;
                    const isCorrect = idx === currentQ.answer;

                    let btnStyle = "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800";

                    if (hasAnswered) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/30";
                      } else if (userSelected) {
                        btnStyle = "bg-red-50 border-red-500 text-red-950 line-through ring-2 ring-red-500/30";
                      } else {
                        btnStyle = "opacity-40 border-gray-200 text-gray-400";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectPractice(idx)}
                        disabled={hasAnswered}
                        className={`w-full p-4 rounded-2xl border text-sm font-medium transition flex items-center justify-between text-left ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {hasAnswered && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 ml-2" />
                        )}
                        {hasAnswered && userSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Khung giải thích chi tiết khi đã làm */}
                {practiceAnswers[currentQ.id] !== undefined && (
                  <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2 text-xs text-amber-950">
                    <div className="flex items-center space-x-1.5 font-bold text-amber-900 uppercase">
                      <HelpCircle className="w-4 h-4" />
                      <span>Đáp án chuẩn & Giải thích:</span>
                    </div>
                    
                    <p className="text-sm font-bold font-hanzi text-gray-900">
                      ✓ Câu hoàn chỉnh: {currentQ.correctSentence}
                    </p>
                    <p className="text-red-700 font-mono">
                      {currentQ.pinyin}
                    </p>
                    <p className="text-gray-700 italic">
                      Dịch nghĩa: {currentQ.meaning}
                    </p>
                    <p className="pt-1 text-amber-900 border-t border-amber-200/60 font-medium">
                      💡 <strong>Ngữ pháp cốt lõi:</strong> {currentQ.explain}
                    </p>
                  </div>
                )}

                {/* Thanh điều hướng câu trước / câu sau */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQIndex === 0}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-bold transition disabled:opacity-30"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Câu trước</span>
                  </button>

                  <span className="text-xs text-gray-400">
                    Bấm phím mũi tên hoặc chọn số câu bên cạnh
                  </span>

                  <button
                    onClick={() => setCurrentQIndex(prev => Math.min(HSK_PRACTICE_QUESTIONS.length - 1, prev + 1))}
                    disabled={currentQIndex === HSK_PRACTICE_QUESTIONS.length - 1}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-700 text-white hover:bg-red-800 text-xs font-bold shadow-md shadow-red-200 transition disabled:opacity-30"
                  >
                    <span>Câu tiếp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Bảng Bản Đồ 44 Câu Hỏi (4 Cột) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-[#e8dfd5] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900">
                    Bản Đồ 44 Câu Hỏi
                  </h3>
                  <span className="text-xs text-gray-500 font-medium">
                    Đã làm: {Object.keys(practiceAnswers).length} / {HSK_PRACTICE_QUESTIONS.length}
                  </span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-6 gap-2 max-h-[500px] overflow-y-auto pr-1">
                  {HSK_PRACTICE_QUESTIONS.map((q, index) => {
                    const isAnswered = practiceAnswers[q.id] !== undefined;
                    const isCorrect = practiceAnswers[q.id] === q.answer;
                    const isCurrent = currentQIndex === index;

                    let boxStyle = "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100";
                    if (isAnswered) {
                      boxStyle = isCorrect
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold"
                        : "bg-red-100 text-red-800 border-red-300 font-bold";
                    }

                    if (isCurrent) {
                      boxStyle += " ring-2 ring-red-600 ring-offset-1";
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQIndex(index)}
                        className={`h-9 rounded-xl border text-xs font-semibold flex items-center justify-center transition ${boxStyle}`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-around text-[11px] text-gray-500">
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Đúng</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span>Sai</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                    <span>Chưa làm</span>
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* CHẾ ĐỘ 2: THI THỬ 25 PHÚT (EXAM) */}
          {quizMode === 'exam' && (
            <div className="space-y-6">
              
              {/* Thẻ Kết Quả nếu đã nộp bài */}
              {examSubmitted && (
                <div className="bg-white rounded-3xl p-8 border border-[#e8dfd5] shadow-xl text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  
                  <h2 className="text-2xl font-black text-gray-900 mb-1">
                    Kết Quả Bài Thi Thử HSK 2
                  </h2>
                  <p className="text-xs text-gray-500 mb-6">
                    Đã hoàn thành đề thi ngữ pháp sơ cấp gồm 44 câu hỏi
                  </p>

                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                    <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                      <span className="text-[11px] font-bold text-red-500 uppercase block">Số Câu Đúng</span>
                      <span className="text-2xl font-black text-red-700">
                        {getExamScore().correct} / {getExamScore().total}
                      </span>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                      <span className="text-[11px] font-bold text-amber-600 uppercase block">Tỷ Lệ Đạt</span>
                      <span className="text-2xl font-black text-amber-700">
                        {getExamScore().pct}%
                      </span>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                      <span className="text-[11px] font-bold text-emerald-600 uppercase block">Đánh Giá</span>
                      <span className="text-sm font-black text-emerald-700 mt-2 block">
                        {getExamScore().pct >= 75 ? 'ĐẠT (HSK 2+)' : 'CẦN ÔN LẠI'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={startExam}
                    className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-md shadow-red-200 transition mx-auto"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Làm lại bài thi</span>
                  </button>
                </div>
              )}

              {/* Danh sách 44 câu hỏi thi thử */}
              <div className="space-y-4">
                {HSK_PRACTICE_QUESTIONS.map((q, qIdx) => {
                  const selectedIdx = examAnswers[q.id];
                  const isCorrect = selectedIdx === q.answer;

                  return (
                    <div key={q.id} className="bg-white rounded-3xl p-6 border border-[#e8dfd5] shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-red-700">
                          Câu {qIdx + 1}: {q.title}
                        </span>
                        {examSubmitted && (
                          <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                            {isCorrect ? '✓ Đúng' : '✗ Sai'}
                          </span>
                        )}
                      </div>

                      <p className="font-hanzi text-base font-bold text-gray-900 mb-3 whitespace-pre-line">
                        {q.sentence}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, optIdx) => {
                          let optClass = "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100";
                          
                          if (examSubmitted) {
                            if (optIdx === q.answer) {
                              optClass = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold";
                            } else if (optIdx === selectedIdx) {
                              optClass = "bg-red-100 border-red-500 text-red-950 line-through";
                            } else {
                              optClass = "opacity-40 border-gray-200 text-gray-400";
                            }
                          } else if (selectedIdx === optIdx) {
                            optClass = "bg-red-700 text-white font-bold border-red-700";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectExam(q.id, optIdx)}
                              disabled={examSubmitted}
                              className={`p-3 rounded-2xl border text-xs sm:text-sm font-medium transition text-left ${optClass}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {examSubmitted && (
                        <div className="mt-3 p-3 rounded-xl bg-amber-50 text-xs text-amber-900 border border-amber-200">
                          💡 <strong>Đáp án đúng:</strong> {q.correctSentence} ({q.meaning}) — {q.explain}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!examSubmitted && (
                <div className="text-center py-6">
                  <button
                    onClick={handleSubmitExam}
                    className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-lg shadow-red-200 transition"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-300" />
                    <span>NỘP BÀI THI THỬ ({Object.keys(examAnswers).length}/44 câu)</span>
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* PHÂN HỆ 2: BÀI TẬP LUYỆN DỊCH THỰC CHIẾN (TRANG 6)       */}
      {/* ======================================================== */}
      {activeSubTab === 'translate' && (
        <div className="space-y-6">
          
          {/* Nút chuyển chiều Dịch xuôi (Trung->Việt) vs Dịch ngược (Việt->Trung) */}
          <div className="flex space-x-3 bg-white p-4 rounded-3xl border border-[#e8dfd5] shadow-sm">
            <button
              onClick={() => setTransDirection('forward')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                transDirection === 'forward'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Bài 1: Dịch Xuôi (Trung ➔ Việt)
            </button>
            <button
              onClick={() => setTransDirection('reverse')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                transDirection === 'reverse'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Bài 2: Dịch Ngược (Việt ➔ Trung)
            </button>
          </div>

          {/* BÀI 1: DỊCH XUÔI (TRUNG -> VIỆT) */}
          {transDirection === 'forward' && (
            <div className="space-y-4">
              {HSK_TRANSLATION_EXERCISES.forward.map((item) => {
                const showAns = showTransAnswers[item.id];
                return (
                  <div key={item.id} className="bg-white rounded-3xl p-6 border border-[#e8dfd5] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-red-700 uppercase">
                        Câu {item.id}:
                      </span>
                      <button
                        onClick={() => speakChinese(item.chinese)}
                        className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe phát âm chuẩn</span>
                      </button>
                    </div>

                    <div className="font-hanzi text-2xl font-bold text-gray-900 mb-1">
                      {item.chinese}
                    </div>
                    <div className="text-xs text-red-600 font-mono mb-4">
                      {item.pinyin}
                    </div>

                    {/* Ô nhập bản dịch tiếng Việt của bạn */}
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Nhập bản dịch tiếng Việt của bạn vào đây..."
                        value={userTransInputs[item.id] || ''}
                        onChange={(e) => setUserTransInputs(prev => ({ ...prev, [item.id]: e.target.value }))}
                        className="w-full p-3 text-xs rounded-xl bg-[#faf7f2] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600/30 text-gray-800"
                      />

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-gray-400">
                          Gợi ý từ vựng: {item.hints}
                        </span>
                        
                        <button
                          onClick={() => setShowTransAnswers(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                          className="flex items-center space-x-1 text-xs text-amber-800 font-bold hover:text-red-700"
                        >
                          {showAns ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{showAns ? 'Ẩn đáp án' : 'Xem đáp án chuẩn'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Đáp án chuẩn */}
                    {showAns && (
                      <div className="mt-3 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                        <p>✓ <strong>Bản dịch chuẩn:</strong> <span className="font-bold text-gray-900">{item.vietnamese}</span></p>
                        <p className="text-gray-600">💡 <strong>Điểm ngữ pháp:</strong> {item.grammarPoint}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* BÀI 2: DỊCH NGƯỢC (VIỆT -> TRUNG) */}
          {transDirection === 'reverse' && (
            <div className="space-y-4">
              {HSK_TRANSLATION_EXERCISES.reverse.map((item) => {
                const showAns = showTransAnswers[`rev-${item.id}`];
                return (
                  <div key={item.id} className="bg-white rounded-3xl p-6 border border-[#e8dfd5] shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-800 uppercase">
                        Câu {item.id}:
                      </span>
                      {showAns && (
                        <button
                          onClick={() => speakChinese(item.chinese)}
                          className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe phát âm</span>
                        </button>
                      )}
                    </div>

                    <div className="text-lg font-bold text-gray-900 mb-3">
                      "{item.vietnamese}"
                    </div>

                    {/* Ô nhập câu tiếng Trung của học viên */}
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Gõ chữ Hán hoặc Pinyin tương ứng..."
                        value={userTransInputs[`rev-${item.id}`] || ''}
                        onChange={(e) => setUserTransInputs(prev => ({ ...prev, [`rev-${item.id}`]: e.target.value }))}
                        className="w-full p-3 text-xs rounded-xl bg-[#faf7f2] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600/30 text-gray-800 font-hanzi"
                      />

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-gray-400">
                          Gợi ý từ khóa: {item.hints}
                        </span>

                        <button
                          onClick={() => setShowTransAnswers(prev => ({ ...prev, [`rev-${item.id}`]: !prev[`rev-${item.id}`] }))}
                          className="flex items-center space-x-1 text-xs text-amber-800 font-bold hover:text-red-700"
                        >
                          {showAns ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{showAns ? 'Ẩn câu mẫu' : 'Xem câu tiếng Trung chuẩn'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Câu mẫu tiếng Trung chuẩn */}
                    {showAns && (
                      <div className="mt-3 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                        <div className="font-hanzi text-xl font-bold text-red-800">
                          {item.chinese}
                        </div>
                        <div className="text-red-700 font-mono">
                          {item.pinyin}
                        </div>
                        {item.chineseAlt && (
                          <div className="text-gray-500 pt-1">
                            Cách diễn đạt khác: <span className="font-hanzi">{item.chineseAlt}</span> ({item.pinyinAlt})
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
