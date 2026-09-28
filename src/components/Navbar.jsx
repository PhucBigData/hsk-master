import React, { useState } from 'react';
import { PenTool, Zap, BookOpen, Volume2, Layers, Award, User, VolumeX, FileText, Gauge } from 'lucide-react';
import { getVoiceType, setVoiceType, getSpeechRate, setSpeechRate, speakChinese } from '../utils/speech';

export default function Navbar({ activeTab, setActiveTab, stats }) {
  const [voiceType, setLocalVoiceType] = useState(getVoiceType());
  const [speechRate, setLocalSpeechRate] = useState(getSpeechRate());

  const navItems = [
    { id: 'writer', label: 'Luyện Viết Hán Tự', icon: PenTool, badge: 'Bút thuận' },
    { id: 'reflex', label: 'Đấu Trường Phản Xạ', icon: Zap, badge: 'Speed Quiz' },
    { id: 'grammar', label: 'Ngữ Pháp HSK 2', icon: BookOpen, badge: '17 Chủ điểm' },
    { id: 'exercises', label: 'Bộ Bài Tập & Đề Thi', icon: FileText, badge: '44 Câu + Dịch' },
    { id: 'pinyin', label: 'Pinyin & Phát Âm', icon: Volume2, badge: '4 Thanh điệu' },
    { id: 'flashcard', label: 'Từ Vựng & Thẻ Nhớ', icon: Layers, badge: 'HSK 1-2-3' },
  ];

  const handleToggleVoice = () => {
    const next = voiceType === 'female' ? 'male' : 'female';
    setLocalVoiceType(next);
    setVoiceType(next);
    speakChinese(next === 'female' ? '你好！我是中文女声老师。' : '你好！这是男声发音。', { rate: speechRate });
  };

  const handleToggleRate = () => {
    const nextRate = speechRate === 0.85 ? 1.0 : 0.85;
    setLocalSpeechRate(nextRate);
    setSpeechRate(nextRate);
    speakChinese(nextRate === 0.85 ? '慢速发音，听得更清楚。' : '正常语速。', { rate: nextRate });
  };

  const handleTestAudio = () => {
    speakChinese(voiceType === 'female' ? '你好！我是中文老师，祝你学习进步！' : '你好！祝你学习进步！', { rate: speechRate });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fffdf9]/95 backdrop-blur-md border-b border-[#e8dfd5] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('exercises')}>
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

          {/* Right Controls: Voice Gender + Speed + Stats */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Bộ chuyển đổi Giọng Nữ / Giọng Nam */}
            <div className="flex items-center bg-rose-50/80 border border-rose-200/80 rounded-2xl p-1 text-xs">
              <button
                onClick={handleToggleVoice}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl font-bold transition ${
                  voiceType === 'female'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-blue-600 text-white shadow-sm'
                }`}
                title="Bấm để chuyển đổi giữa Giọng Nữ và Giọng Nam"
              >
                <span>{voiceType === 'female' ? '👩 Giọng Nữ (Dễ nghe)' : '👨 Giọng Nam'}</span>
              </button>

              <button
                onClick={handleTestAudio}
                className="px-2 py-1 text-[11px] font-semibold text-rose-800 hover:text-red-700 flex items-center space-x-1"
                title="Nghe thử giọng phát âm"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Thử giọng</span>
              </button>
            </div>

            {/* Nút chỉnh tốc độ đọc */}
            <button
              onClick={handleToggleRate}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition"
              title="Đổi tốc độ đọc (0.85x chậm rãi hoặc 1.0x chuẩn)"
            >
              <Gauge className="w-3.5 h-3.5 text-amber-600" />
              <span>{speechRate}x</span>
            </button>

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
