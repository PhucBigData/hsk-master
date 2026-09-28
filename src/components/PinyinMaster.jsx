import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { PINYIN_TONES, PINYIN_INITIALS, PINYIN_DRILLS } from '../data/pinyinData';
import { speakChinese } from '../utils/speech';
import { playCorrectSound, playWrongSound } from '../utils/audioEffects';

export default function PinyinMaster() {
  const [activeTab, setActiveTab] = useState('tones'); // 'tones' | 'initials' | 'drills'
  
  // Drill quiz state
  const [currentDrillIndex, setCurrentDrillIndex] = useState(0);
  const [selectedDrillOption, setSelectedDrillOption] = useState(null);
  const [isDrillAnswered, setIsDrillAnswered] = useState(false);
  const [drillScore, setDrillScore] = useState(0);

  const currentDrill = PINYIN_DRILLS[currentDrillIndex];

  const handlePlayDrillAudio = () => {
    speakChinese(currentDrill.audioWord, { rate: 0.85 });
  };

  const handleSelectDrill = (opt) => {
    if (isDrillAnswered) return;
    setIsDrillAnswered(true);
    setSelectedDrillOption(opt);

    if (opt === currentDrill.pinyinAnswer) {
      playCorrectSound();
      setDrillScore(prev => prev + 1);
    } else {
      playWrongSound();
    }
  };

  const handleNextDrill = () => {
    if (currentDrillIndex + 1 < PINYIN_DRILLS.length) {
      setCurrentDrillIndex(prev => prev + 1);
      setIsDrillAnswered(false);
      setSelectedDrillOption(null);
    } else {
      // Reset
      setCurrentDrillIndex(0);
      setIsDrillAnswered(false);
      setSelectedDrillOption(null);
      setDrillScore(0);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* HEADER */}
      <div className="mb-6 bg-gradient-to-r from-red-800 to-amber-900 rounded-3xl p-6 text-white shadow-xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gốc Rễ Phát Âm Tiếng Trung Chuẩn Bắc Kinh</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-hanzi">
          Pinyin & Thanh Điệu Tiếng Trung
        </h1>
        <p className="text-sm text-red-100/90 mt-1 max-w-2xl">
          Lâu ngày quên cách đọc? Hãy ôn lại ngay quy tắc 4 thanh điệu cốt lõi, bí quyết phân biệt âm bật hơi và thử thách nhận diện thanh điệu qua thính giác với giọng đọc chuẩn bản xứ.
        </p>

        {/* Tab chuyển đổi */}
        <div className="flex space-x-2 mt-6">
          <button
            onClick={() => setActiveTab('tones')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'tones'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            1. 4 Thanh Điệu Cốt Lõi
          </button>
          <button
            onClick={() => setActiveTab('initials')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'initials'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            2. Thanh Mẫu & Âm Bật Hơi
          </button>
          <button
            onClick={() => {
              setActiveTab('drills');
              speakChinese(currentDrill.audioWord);
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'drills'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            3. Thử Thách Thính Giác Pinyin
          </button>
        </div>
      </div>

      {/* TAB 1: 4 THANH ĐIỆU CỐT LÕI */}
      {activeTab === 'tones' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PINYIN_TONES.map((item) => (
              <div
                key={item.tone}
                className={`p-5 rounded-3xl border bg-white shadow-sm hover:shadow-md transition flex flex-col justify-between ${item.bg}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-2xl font-black ${item.color}`}>
                      {item.symbol}
                    </span>
                    <button
                      onClick={() => speakChinese(item.sampleZh, { rate: 0.85 })}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white shadow-sm border border-gray-100 hover:scale-105 active:scale-95 transition text-gray-700 text-xs font-semibold"
                      title="Bấm để nghe âm thanh người bản xứ phát âm"
                    >
                      <Volume2 className="w-4 h-4 text-red-700" />
                      <span>Nghe mẫu</span>
                    </button>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Từ mẫu:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold font-hanzi text-lg text-red-700">
                      {item.sampleZh}
                    </span>
                    <span className="font-mono font-bold text-gray-700">
                      [{item.samplePy}]
                    </span>
                    <span className="text-gray-500">
                      ({item.meaning})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* QUY TẮC BIẾN ĐIỆU QUAN TRỌNG */}
          <div className="bg-white rounded-3xl p-6 border border-[#e8dfd5] shadow-sm">
            <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center space-x-2">
              <span>⚠️ 3 Quy Tắc Biến Điệu Cần Nhớ Khi Lên HSK 3:</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-700">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <span className="font-bold text-amber-900 block mb-1">1. Hai Thanh 3 Đi Liền Nhau</span>
                <p>Thanh 3 thứ nhất biến thành <strong>Thanh 2</strong>:</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-red-700 font-bold">
                    nǐ + hǎo ➔ <span className="underline">ní</span> hǎo (你好)
                  </span>
                  <button
                    onClick={() => speakChinese('你好')}
                    className="p-1.5 rounded-lg bg-white shadow-sm text-red-700"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200">
                <span className="font-bold text-red-900 block mb-1">2. Biến Điệu Của Chữ 不 (bù)</span>
                <p>Trước một chữ mang Thanh 4, '不' biến thành <strong>bú</strong> (Thanh 2):</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-red-700 font-bold">
                    bù + shì ➔ <span className="underline">bú</span> shì (不是)
                  </span>
                  <button
                    onClick={() => speakChinese('不是')}
                    className="p-1.5 rounded-lg bg-white shadow-sm text-red-700"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <span className="font-bold text-emerald-900 block mb-1">3. Biến Điệu Của Chữ 一 (yī)</span>
                <p>Đứng trước thanh 4 đọc là <strong>yí</strong>, trước thanh 1, 2, 3 đọc là <strong>yì</strong>:</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-emerald-800 font-bold">
                    yī + yàng ➔ <span className="underline">yí</span> yàng (一样)
                  </span>
                  <button
                    onClick={() => speakChinese('一样')}
                    className="p-1.5 rounded-lg bg-white shadow-sm text-emerald-700"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: THANH MẪU & ÂM BẬT HƠI */}
      {activeTab === 'initials' && (
        <div className="space-y-6">
          <div className="space-y-4">
            {PINYIN_INITIALS.map((group, gIdx) => (
              <div key={gIdx} className="bg-white rounded-3xl p-5 border border-[#e8dfd5] shadow-sm">
                <h3 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-3">
                  {group.group}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {group.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#fcfaf7] border border-gray-100 hover:border-red-200 transition flex items-start justify-between"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-black text-red-700 font-mono">
                            {item.pinyin}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">
                            {item.ipa}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {item.tip}
                        </p>
                        <div className="text-xs font-semibold text-gray-800 mt-2 flex items-center space-x-1">
                          <span>Ví dụ:</span>
                          <span className="font-hanzi font-bold text-red-800 text-sm">{item.hanzi}</span>
                          <span className="text-gray-500 font-mono">[{item.samplePy}]</span>
                          <span className="text-gray-400">({item.meaning})</span>
                        </div>
                      </div>

                      <button
                        onClick={() => speakChinese(item.hanzi, { rate: 0.85 })}
                        className="p-2 rounded-xl bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-red-700 hover:scale-105 active:scale-95 transition"
                        title={`Nghe phát âm từ mẫu ${item.hanzi}`}
                      >
                        <Volume2 className="w-4 h-4 text-red-700" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: THỬ THÁCH THÍNH GIÁC PINYIN */}
      {activeTab === 'drills' && currentDrill && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-[#e8dfd5] shadow-xl text-center">
          
          <div className="flex items-center justify-between text-xs text-gray-400 mb-6">
            <span>Câu hỏi {currentDrillIndex + 1} / {PINYIN_DRILLS.length}</span>
            <span className="font-bold text-red-700">Điểm đúng: {drillScore}</span>
          </div>

          <div className="mb-6">
            <button
              onClick={handlePlayDrillAudio}
              className="w-24 h-24 mx-auto rounded-3xl bg-red-100 hover:bg-red-200 text-red-700 flex items-center justify-center transition shadow-md group mb-3"
            >
              <Volume2 className="w-12 h-12 group-hover:scale-110 transition" />
            </button>
            <h2 className="text-lg font-bold text-gray-900">
              Hãy nghe và chọn Pinyin tương ứng:
            </h2>
            <p className="text-xs text-gray-400 mt-1">Bấm vào loa lớn để nghe lại âm thanh</p>
          </div>

          {/* 4 Lựa chọn Pinyin */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {currentDrill.options.map((opt, idx) => {
              let btnClass = "bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100";

              if (isDrillAnswered) {
                if (opt === currentDrill.pinyinAnswer) {
                  btnClass = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold";
                } else if (opt === selectedDrillOption) {
                  btnClass = "bg-red-100 border-red-500 text-red-950 line-through";
                } else {
                  btnClass = "opacity-40 border-gray-200 text-gray-400";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectDrill(opt)}
                  disabled={isDrillAnswered}
                  className={`p-4 rounded-2xl border text-lg font-bold font-mono transition flex items-center justify-center ${btnClass}`}
                >
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Giải thích khi trả lời */}
          {isDrillAnswered && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900">
              💡 <strong>Giải thích:</strong> {currentDrill.explain} (Từ tương ứng: <span className="font-hanzi font-bold text-sm text-red-800">{currentDrill.audioWord}</span>)
            </div>
          )}

          {isDrillAnswered && (
            <button
              onClick={handleNextDrill}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-md shadow-red-200 transition"
            >
              <span>{currentDrillIndex + 1 < PINYIN_DRILLS.length ? 'Câu tiếp theo' : 'Bắt đầu lại'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

        </div>
      )}

    </div>
  );
}
