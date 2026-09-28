import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HanziWriterView from './components/HanziWriterView';
import ReflexArena from './components/ReflexArena';
import GrammarExplorer from './components/GrammarExplorer';
import PinyinMaster from './components/PinyinMaster';
import FlashcardDeck from './components/FlashcardDeck';
import ExerciseCenter from './components/ExerciseCenter';

export default function App() {
  const [activeTab, setActiveTab] = useState('exercises'); // Mặc định mở tab Bài tập mới cho học viên trải nghiệm ngay!
  
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('hsk_user_stats');
      return saved ? JSON.parse(saved) : { reflexScore: 0, bestStreak: 0 };
    } catch {
      return { reflexScore: 0, bestStreak: 0 };
    }
  });

  const handleScoreUpdate = (newScore, streak) => {
    setStats((prev) => {
      const updated = {
        reflexScore: prev.reflexScore + newScore,
        bestStreak: Math.max(prev.bestStreak, streak)
      };
      localStorage.setItem('hsk_user_stats', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#2c2725] flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} stats={stats} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'writer' && <HanziWriterView />}
        {activeTab === 'reflex' && <ReflexArena onScoreUpdate={handleScoreUpdate} />}
        {activeTab === 'grammar' && <GrammarExplorer />}
        {activeTab === 'exercises' && <ExerciseCenter />}
        {activeTab === 'pinyin' && <PinyinMaster />}
        {activeTab === 'flashcard' && <FlashcardDeck />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e8dfd5] py-6 mt-12 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-gray-700">
            🎯 Lộ trình 15 phút mỗi ngày bước đệm lên HSK 3:
          </p>
          <p className="text-gray-500 max-w-xl mx-auto">
            5 phút tập viết nét bút thuận + 5 phút đấu trường phản xạ tốc độ + 5 phút ôn lại 1-2 chủ điểm ngữ pháp HSK 2.
          </p>
          <div className="pt-2 text-[11px] text-gray-400">
            HSK Reflex & Hanzi Master · Phát triển cho học viên HSK
          </div>
        </div>
      </footer>

    </div>
  );
}
