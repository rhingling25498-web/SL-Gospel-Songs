import React, { useState, useEffect } from 'react';
import { Song } from './types';
import { SAMPLE_SONGS } from './data/sampleSongs';
import { Navbar } from './components/Navbar';
import { SongList } from './components/SongList';
import { SongDetail } from './components/SongDetail';
import { DevotionalView } from './components/DevotionalView';
import { ChordDictionary } from './components/ChordDictionary';
import { InstallGuideModal } from './components/InstallGuideModal';
import { AISearchModal } from './components/AISearchModal';
import { Music, Smartphone, BookOpen, Guitar, Bookmark, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [songs, setSongs] = useState<Song[]>(() => {
    try {
      const stored = localStorage.getItem('grace_gospel_songs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading songs from local storage:', e);
    }
    return SAMPLE_SONGS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('grace_gospel_favs');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return ['song-1', 'song-3'];
  });

  const [activeView, setActiveView] = useState<'songs' | 'devotionals' | 'chords' | 'favorites'>('songs');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  // Save songs & favorites to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('grace_gospel_songs', JSON.stringify(songs));
    } catch (e) {}
  }, [songs]);

  useEffect(() => {
    try {
      localStorage.setItem('grace_gospel_favs', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  const handleToggleFavorite = (songId: string) => {
    setFavorites((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };

  const handleSongGenerated = (newSong: Song) => {
    setSongs((prev) => [newSong, ...prev]);
    setSelectedSong(newSong);
  };

  const favoriteSongs = songs.filter((s) => favorites.includes(s.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v);
          setSelectedSong(null);
        }}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        onOpenAiSearchModal={() => setIsAiModalOpen(true)}
        favoriteCount={favorites.length}
      />

      {/* Main Content Body */}
      <main className="flex-1 pb-20 md:pb-12">
        {selectedSong ? (
          <SongDetail
            song={selectedSong}
            onBack={() => setSelectedSong(null)}
            isFavorite={favorites.includes(selectedSong.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <>
            {activeView === 'songs' && (
              <SongList
                songs={songs}
                searchQuery={searchQuery}
                onSelectSong={(song) => setSelectedSong(song)}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onOpenAiSearch={() => setIsAiModalOpen(true)}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            )}

            {activeView === 'favorites' && (
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
                      Offline သိမ်းဆည်းထားသော သီချင်းများ
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      အင်တာနက်မလိုဘဲ ဖုန်းထဲတွင် အချိန်မရွေး ကြည့်ရှုနိုင်ပါသည်
                    </p>
                  </div>
                </div>

                {favoriteSongs.length > 0 ? (
                  <SongList
                    songs={favoriteSongs}
                    searchQuery={searchQuery}
                    onSelectSong={(song) => setSelectedSong(song)}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenAiSearch={() => setIsAiModalOpen(true)}
                    activeCategory="ALL"
                    setActiveCategory={() => {}}
                  />
                ) : (
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center max-w-md mx-auto my-12 shadow-sm">
                    <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-800">
                      Offline သိမ်းဆည်းထားသော သီချင်း မရှိသေးပါ
                    </h3>
                    <p className="text-xs text-slate-500 mt-2">
                      သီချင်းများ၏ ကြယ်ပွင့် (⭐ Save Offline) ကို နှိပ်ထားပါက ဤနေရာတွင် အဆင်သင့် တွေ့ရှိနိုင်ပါသည်။
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeView === 'devotionals' && <DevotionalView />}

            {activeView === 'chords' && <ChordDictionary />}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden px-2 py-2 flex items-center justify-around text-[10px]">
        <button
          onClick={() => {
            setActiveView('songs');
            setSelectedSong(null);
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            activeView === 'songs' && !selectedSong
              ? 'text-blue-600 font-bold'
              : 'text-slate-500'
          }`}
        >
          <Music className="w-5 h-5" />
          <span>သီချင်းများ</span>
        </button>

        <button
          onClick={() => {
            setActiveView('favorites');
            setSelectedSong(null);
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            activeView === 'favorites'
              ? 'text-amber-600 font-bold'
              : 'text-slate-500'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span>Offline</span>
        </button>

        <button
          onClick={() => {
            setActiveView('devotionals');
            setSelectedSong(null);
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            activeView === 'devotionals'
              ? 'text-emerald-600 font-bold'
              : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Devotional</span>
        </button>

        <button
          onClick={() => {
            setActiveView('chords');
            setSelectedSong(null);
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            activeView === 'chords'
              ? 'text-sky-600 font-bold'
              : 'text-slate-500'
          }`}
        >
          <Guitar className="w-5 h-5" />
          <span>Chord</span>
        </button>

        <button
          onClick={() => setIsInstallModalOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-blue-600 font-bold"
        >
          <Smartphone className="w-5 h-5 text-blue-600" />
          <span>ဖုန်းထဲထည့်နည်း</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-700">
            <Music className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-slate-800">Grace Gospel - Songs & Chords</span>
          </div>
          <p className="text-slate-500">Praise & Worship Songs for Myanmar & Global Believers</p>
          <button
            onClick={() => setIsInstallModalOpen(true)}
            className="text-blue-600 hover:underline font-semibold"
          >
            ဖုန်းထဲသို့ App ဒေါင်းလုဒ်ဆွဲ ထည့်သွင်းနည်းလမ်းညွှန်
          </button>
        </div>
      </footer>

      {/* Modals */}
      <InstallGuideModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      <AISearchModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSongGenerated={handleSongGenerated}
      />
    </div>
  );
}
