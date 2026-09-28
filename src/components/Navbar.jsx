import React, { useState } from 'react';
import { PenTool, Zap, BookOpen, Volume2, Layers, Award, Mic, Settings2 } from 'lucide-react';
import { getVoiceSource, setVoiceSource, speakChinese } from '../utils/speech';

export default function Navbar({ activeTab, setActiveTab, stats }) {
  const [voiceSource, setLocalVoiceSource] = useState(getVoiceSource());

  const navItems = [
    { id: 'writer', label: 'Luyện Viết Hán Tự', icon: PenTool, badge: 'Bút thuận' },
    { id: 'reflex', label: 'Đấu Trường Phản Xạ', icon: Zap, badge: 'Speed Quiz' },
    { id: 'grammar', label: 'Ngữ Pháp HSK 2', icon: BookOpen, badge: '17 Chủ điểm' },
    { id: 'pinyin', label: 'Pinyin & Phát Âm', icon: Volume2, badge: '4 Thanh điệu' },
    { id: 'flashcard', label: 'Từ Vựng & Thẻ Nhớ', icon: Layers, badge: 'HSK 1-2-3' },
  ];

  const handleToggleVoice = () => {
    const next = voiceSource === 'human' ? 'browser' : 'human';
    setLocalVoiceSource(next);
    setVoiceSource(next);
    speakChinese(next === 'human' ? '你好！这是真人发音。' : '你好！这是系统合成音。');
  };

  const handleTestAudio = () => {
    speakChinese('你好，欢迎学习汉语！');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fffdf9]/95 backdrop-blur-md border-b border-[#e8dfd5] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('writer')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-amber-200 flex items-center justify-center font-hanzi text-2xl font-bold shadow-md shadow-red-200">
              汉
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-hanzi text-lg sm:text-xl font-bold text-gray-900 tracking-wide">
                  HSK MASTER
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                  HSK 1 · 2 · 3
                </span>
              </div>
              <p className="text-xs text-gray-500 hidden sm:block">
                Lấy lại phản xạ · Viết Hán tự · Nắm chắc ngữ pháp HSK 2
              </p>
            </div>
          </div>

          {/* Right Controls: Voice Toggle + Stats */}
          <div className="flex items-center space-x-3">
            
            {/* Bộ chuyển đổi giọng đọc Người thật vs Giọng máy */}
            <div className="flex items-center bg-emerald-50 border border-emerald-200/80 rounded-2xl p-1 text-xs">
              <button
                onClick={handleToggleVoice}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl font-bold transition ${
                  voiceSource === 'human'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-emerald-700'
                }`}
                title="Bấm để chuyển đổi giữa Giọng người bản xứ và Giọng máy"
              >
                <Mic className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Giọng Người Bản Xứ (HD)</span>
                <span className="sm:hidden">Người thật</span>
              </button>

              <button
                onClick={handleTestAudio}
                className="px-2 py-1 text-[11px] font-semibold text-emerald-800 hover:text-red-700 flex items-center space-x-1"
                title="Nghe thử âm thanh giọng đọc"
              >
                <Volume2 className="w-3 h-3" />
                <span className="hidden md:inline">Thử giọng</span>
              </button>
            </div>

            {/* Quick Stats Pill */}
            <div className="hidden lg:flex items-center space-x-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl px-3.5 py-1.5 text-xs text-amber-900">
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Điểm: <strong>{stats?.reflexScore || 0}</strong></span>
              </div>
              <span className="text-amber-300">|</span>
              <div>
                <span>Max: <strong>{stats?.bestStreak || 0} 🔥</strong></span>
              </div>
            </div>

          </div>

        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 border-t border-[#f0e7dd] scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-red-700 text-white shadow-sm shadow-red-300 font-semibold'
                    : 'text-gray-600 hover:text-red-700 hover:bg-red-50/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-gray-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                    isActive ? 'bg-red-800/80 text-amber-200' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
