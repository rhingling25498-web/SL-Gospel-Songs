import React from 'react';
import { Music, Smartphone, Search, Sparkles, BookOpen, Guitar, Bookmark } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeView: 'songs' | 'devotionals' | 'chords' | 'favorites';
  setActiveView: (view: 'songs' | 'devotionals' | 'chords' | 'favorites') => void;
  onOpenInstallModal: () => void;
  onOpenAiSearchModal: () => void;
  favoriteCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  activeView,
  setActiveView,
  onOpenInstallModal,
  onOpenAiSearchModal,
  favoriteCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveView('songs')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-sm group-hover:scale-105 transition-transform">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight leading-tight block">
                Grace Gospel
              </span>
              <span className="text-[10px] sm:text-xs text-blue-600 font-semibold block">
                Songs & Guitar Chords
              </span>
            </div>
          </div>

          {/* Center Search Input */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="သီချင်း၊ Chord သို့မဟုတ် စာသားရှာရန် (Search songs, chords)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* AI Generator Button */}
            <button
              onClick={onOpenAiSearchModal}
              className="p-2 sm:px-3.5 sm:py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Find or Generate Chords with Gemini AI"
            >
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="hidden sm:inline">AI Song Finder</span>
            </button>

            {/* Mobile Download/Install App Button */}
            <button
              onClick={onOpenInstallModal}
              className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Smartphone className="w-4 h-4 shrink-0 text-slate-300" />
              <span>ဖုန်းထဲသို့ထည့်ရန်</span>
            </button>

          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="သီချင်း၊ Chord သို့မဟုတ် စာသားရှာရန်..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-t border-slate-100 py-2.5 overflow-x-auto no-scrollbar text-xs font-medium">
          <button
            onClick={() => setActiveView('songs')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shrink-0 transition-all ${
              activeView === 'songs'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            သီချင်းများ (Songs)
          </button>

          <button
            onClick={() => setActiveView('favorites')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shrink-0 transition-all ${
              activeView === 'favorites'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            Offline သိမ်းဆည်းထားသည်များ ({favoriteCount})
          </button>

          <button
            onClick={() => setActiveView('devotionals')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shrink-0 transition-all ${
              activeView === 'devotionals'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            Daily Devotional (ဝိညာဉ်ခွန်အား)
          </button>

          <button
            onClick={() => setActiveView('chords')}
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shrink-0 transition-all ${
              activeView === 'chords'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Guitar className="w-3.5 h-3.5 text-sky-500" />
            Guitar Chord Diagram (Chord ဇယား)
          </button>
        </div>
      </div>
    </header>
  );
};
