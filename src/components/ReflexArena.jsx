import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Zap, Volume2, Timer, Flame, Award, RefreshCw, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { HSK_VOCABULARY } from '../data/hskVocabulary';
import { HSK2_GRAMMAR } from '../data/hskGrammar';
import { speakChinese } from '../utils/speech';
import { playCorrectSound, playWrongSound, playStreakSound } from '../utils/audioEffects';

export default function ReflexArena({ onScoreUpdate }) {
  const [gameMode, setGameMode] = useState('flash_hanzi'); // 'flash_hanzi' | 'audio_rush' | 'grammar_speed'
  const [gameState, setGameState] = useState('ready'); // 'ready' | 'playing' | 'ended'
  
  // Game state variables
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  // Stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5000); // 5 seconds in ms
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const QUESTION_TIME_LIMIT = gameMode === 'grammar_speed' ? 7000 : 4500;

  // Sinh bộ câu hỏi ngẫu nhiên dựa vào game mode
  const generateQuestions = (mode = gameMode) => {
    let newQuestions = [];

    if (mode === 'grammar_speed') {
      // 10 câu hỏi ngữ pháp
      const shuffledGrammar = [...HSK2_GRAMMAR].sort(() => 0.5 - Math.random()).slice(0, 10);
      newQuestions = shuffledGrammar.map(g => ({
        id: g.id,
        type: 'grammar',
        prompt: g.quiz.question,
        options: g.quiz.options,
        correctIndex: g.quiz.answer,
        explain: g.quiz.explain,
        audioText: g.details[0]?.exampleZh || ""
      }));
    } else {
      // 10 câu hỏi từ vựng (Chớp mắt Hán tự hoặc Nghe âm)
      const shuffledVocab = [...HSK_VOCABULARY].sort(() => 0.5 - Math.random()).slice(0, 10);
      
      newQuestions = shuffledVocab.map((targetWord) => {
        // Lấy 3 lựa chọn sai ngẫu nhiên khác
        const distractors = HSK_VOCABULARY
          .filter(v => v.id !== targetWord.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const allOptions = [...distractors, targetWord].sort(() => 0.5 - Math.random());
        const correctIndex = allOptions.findIndex(o => o.id === targetWord.id);

        if (mode === 'flash_hanzi') {
          return {
            id: targetWord.id,
            type: 'hanzi',
            target: targetWord,
            prompt: targetWord.hanzi,
            pinyinHint: targetWord.pinyin,
            options: allOptions.map(o => o.meaning),
            correctIndex,
            audioText: targetWord.hanzi
          };
        } else {
          // Audio rush: Nghe âm -> Chọn chữ Hán
          return {
            id: targetWord.id,
            type: 'audio',
            target: targetWord,
            prompt: "Nghe phát âm và chọn Hán tự đúng:",
            options: allOptions.map(o => `${o.hanzi} (${o.pinyin})`),
            correctIndex,
            audioText: targetWord.hanzi
          };
        }
      });
    }

    return newQuestions;
  };

  // Khởi động ván chơi mới
  const startGame = () => {
    const qList = generateQuestions();
    setQuestions(qList);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setWrongAnswers([]);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setGameState('playing');
    setTimeLeft(QUESTION_TIME_LIMIT);
  };

  const currentQ = questions[currentIndex];

  // Logic đếm ngược thời gian
  useEffect(() => {
    if (gameState !== 'playing' || !currentQ || isAnswered) return;

    // Phát âm thanh tự động ở chế độ Audio Rush hoặc Chữ Hán
    if (currentQ.type === 'audio') {
      speakChinese(currentQ.audioText);
    }

    startTimeRef.current = Date.now();
    setTimeLeft(QUESTION_TIME_LIMIT);

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, QUESTION_TIME_LIMIT - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timerRef.current);
        handleTimeout();
      }
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, gameState, isAnswered]);

  const handleTimeout = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(-1); // Hết giờ
    playWrongSound();
    setStreak(0);
    setWrongAnswers(prev => [...prev, { question: currentQ, reason: 'Hết giờ (quá 5s)' }]);
    scheduleNextQuestion();
  };

  const handleSelectOption = (index) => {
    if (isAnswered || gameState !== 'playing') return;
    if (timerRef.current) clearInterval(timerRef.current);

    setIsAnswered(true);
    setSelectedAnswer(index);

    const isCorrect = index === currentQ.correctIndex;
    const reactionTime = (QUESTION_TIME_LIMIT - timeLeft) / 1000;

    if (isCorrect) {
      playCorrectSound();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      if (newStreak % 3 === 0) {
        playStreakSound();
      }

      // Điểm: 100đ cơ sở + điểm tốc độ (tối đa 50đ) + điểm combo streak
      const timeBonus = Math.round((timeLeft / QUESTION_TIME_LIMIT) * 50);
      const streakBonus = Math.min(newStreak * 15, 60);
      const earned = 100 + timeBonus + streakBonus;
      setScore(prev => prev + earned);
    } else {
      playWrongSound();
      setStreak(0);
      setWrongAnswers(prev => [...prev, { question: currentQ, reason: 'Chọn sai đáp án' }]);
    }

    scheduleNextQuestion();
  };

  const scheduleNextQuestion = () => {
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        // Hết ván chơi
        setGameState('ended');
        if (onScoreUpdate) {
          onScoreUpdate(score, maxStreak);
        }
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    }, 1100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      
      {/* HEADER ĐẤU TRƯỜNG PHẢN XẠ */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-2">
          <Zap className="w-4 h-4 text-red-600 fill-current" />
          <span>Rèn Luyện Phản Xạ 5 Giây - Không Dịch Thầm</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Đấu Trường Phản Xạ HSK
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Tập trung cao độ! Chọn đáp án chính xác trước khi thanh thời gian chạm đáy để kích hoạt chuỗi Combo!
        </p>
      </div>

      {/* CHỌN CHẾ ĐỘ PHẢN XẠ KHI CHƯA CHƠI HOẶC ĐÃ KẾT THÚC */}
      {gameState !== 'playing' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd5] shadow-sm mb-6">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
            1. Chọn Chế Độ Phản Xạ:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            
            <button
              onClick={() => setGameMode('flash_hanzi')}
              className={`p-4 rounded-2xl border text-left transition ${
                gameMode === 'flash_hanzi'
                  ? 'border-red-600 bg-red-50/70 ring-2 ring-red-600/30'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="text-2xl mb-1 font-hanzi font-bold text-red-700">汉</div>
              <div className="font-bold text-sm text-gray-900">Chớp Mắt Đoán Nghĩa</div>
              <p className="text-xs text-gray-500 mt-1">Nhìn Hán tự & Pinyin, chọn ngay nghĩa tiếng Việt.</p>
            </button>

            <button
              onClick={() => setGameMode('audio_rush')}
              className={`p-4 rounded-2xl border text-left transition ${
                gameMode === 'audio_rush'
                  ? 'border-red-600 bg-red-50/70 ring-2 ring-red-600/30'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="text-2xl mb-1">🎧</div>
              <div className="font-bold text-sm text-gray-900">Bắt Âm Thanh</div>
              <p className="text-xs text-gray-500 mt-1">Nghe giọng đọc bản xứ, bắt nhanh chữ Hán chuẩn.</p>
            </button>

            <button
              onClick={() => setGameMode('grammar_speed')}
              className={`p-4 rounded-2xl border text-left transition ${
                gameMode === 'grammar_speed'
                  ? 'border-red-600 bg-red-50/70 ring-2 ring-red-600/30'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="text-2xl mb-1">⚡</div>
              <div className="font-bold text-sm text-gray-900">Bắn Tỉa Ngữ Pháp</div>
              <p className="text-xs text-gray-500 mt-1">Điền đúng cấu trúc 17 điểm ngữ pháp HSK 2 trong nháy mắt.</p>
            </button>

          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-base shadow-lg shadow-red-200 hover:scale-[1.02] active:scale-[0.98] transition"
            >
              <Zap className="w-5 h-5 fill-current text-amber-300" />
              <span>BẮT ĐẦU VÁN ĐẤU (10 CÂU)</span>
            </button>
          </div>
        </div>
      )}

      {/* MÀN HÌNH ĐANG CHƠI */}
      {gameState === 'playing' && currentQ && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd5] shadow-xl relative overflow-hidden">
          
          {/* Thanh Đếm Ngược Thời Gian */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gray-100">
            <div
              className={`h-full transition-all duration-100 ease-linear ${
                timeLeft < 1500 ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
              }`}
              style={{ width: `${(timeLeft / QUESTION_TIME_LIMIT) * 100}%` }}
            />
          </div>

          {/* Stats Bar (Tiến trình, Điểm, Streak) */}
          <div className="flex items-center justify-between mb-6 pt-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-gray-500">
              <span className="px-2.5 py-1 rounded-lg bg-gray-100">
                Câu {currentIndex + 1} / {questions.length}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {streak > 1 && (
                <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold animate-bounce">
                  <Flame className="w-4 h-4 text-amber-600 fill-current" />
                  <span>x{streak} Combo!</span>
                </div>
              )}
              <div className="text-sm font-bold text-red-700">
                {score} điểm
              </div>
            </div>
          </div>

          {/* Khung Câu Hỏi */}
          <div className="text-center py-6 border-b border-gray-100">
            {currentQ.type === 'hanzi' && (
              <div>
                <div className="font-hanzi text-5xl sm:text-6xl font-extrabold text-gray-900 mb-2">
                  {currentQ.prompt}
                </div>
                <div className="text-sm font-bold text-red-700">
                  {currentQ.pinyinHint}
                </div>
              </div>
            )}

            {currentQ.type === 'audio' && (
              <div className="space-y-3">
                <button
                  onClick={() => speakChinese(currentQ.audioText)}
                  className="w-20 h-20 mx-auto rounded-3xl bg-red-100 hover:bg-red-200 text-red-700 flex items-center justify-center transition shadow-md group"
                >
                  <Volume2 className="w-10 h-10 group-hover:scale-110 transition" />
                </button>
                <p className="text-xs text-gray-400 font-medium">Bấm để nghe lại phát âm</p>
              </div>
            )}

            {currentQ.type === 'grammar' && (
              <div className="max-w-xl mx-auto">
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider block mb-2">
                  Ngữ pháp HSK 2:
                </span>
                <div className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed">
                  {currentQ.prompt}
                </div>
              </div>
            )}
          </div>

          {/* 4 Lựa Chọn Đáp Án */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {currentQ.options.map((option, idx) => {
              let btnClass = "bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300";

              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  btnClass = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/50";
                } else if (idx === selectedAnswer) {
                  btnClass = "bg-red-100 border-red-500 text-red-950 line-through ring-2 ring-red-500/50";
                } else {
                  btnClass = "opacity-40 border-gray-200 text-gray-400";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border text-sm font-medium transition flex items-center justify-between text-left ${btnClass}`}
                >
                  <span>{option}</span>
                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 ml-2" />
                  )}
                  {isAnswered && idx === selectedAnswer && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Giải thích câu hỏi khi đã chọn */}
          {isAnswered && currentQ.explain && (
            <div className="mt-4 p-3 rounded-2xl bg-amber-50 text-amber-900 text-xs border border-amber-200">
              💡 <strong>Giải thích:</strong> {currentQ.explain}
            </div>
          )}

        </div>
      )}

      {/* MÀN HÌNH TỔNG KẾT VÁN ĐẤU */}
      {gameState === 'ended' && (
        <div className="bg-white rounded-3xl p-8 border border-[#e8dfd5] shadow-xl text-center">
          
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-1">
            Ván Đấu Hoàn Thành!
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Não bộ của bạn vừa trải qua 10 lượt kích thích phản xạ tốc độ cao.
          </p>

          {/* Thẻ Thống Kê */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
              <span className="text-[11px] font-bold text-red-500 uppercase tracking-wider block">Tổng Điểm</span>
              <span className="text-2xl font-black text-red-700">{score}</span>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Max Combo</span>
              <span className="text-2xl font-black text-amber-700">{maxStreak} 🔥</span>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Độ Chính Xác</span>
              <span className="text-2xl font-black text-emerald-700">
                {Math.round(((10 - wrongAnswers.length) / 10) * 100)}%
              </span>
            </div>
          </div>

          {/* Danh Sách Từ Cần Ôn Lại Nếu Có Câu Sai */}
          {wrongAnswers.length > 0 && (
            <div className="max-w-md mx-auto text-left mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                Các câu cần lưu ý ôn lại:
              </span>
              <div className="space-y-2">
                {wrongAnswers.map((w, index) => (
                  <div key={index} className="text-xs text-gray-600 flex items-center justify-between border-b border-gray-200/60 pb-1">
                    <span>
                      <strong>{w.question.target?.hanzi || w.question.prompt}</strong>: {w.question.target?.meaning || w.question.explain}
                    </span>
                    <span className="text-[10px] text-red-600 font-medium">{w.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={startGame}
              className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-md shadow-red-200 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Chơi lại ván mới</span>
            </button>
            <button
              onClick={() => setGameState('ready')}
              className="px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition"
            >
              Đổi chế độ
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
