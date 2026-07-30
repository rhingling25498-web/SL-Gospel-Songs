import React, { useState } from 'react';
import { Song } from '../types';
import { Music, Bookmark, Sparkles, Filter, ChevronRight, Guitar } from 'lucide-react';

interface SongListProps {
  songs: Song[];
  searchQuery: string;
  onSelectSong: (song: Song) => void;
  favorites: string[];
  onToggleFavorite: (songId: string) => void;
  onOpenAiSearch: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export const SongList: React.FC<SongListProps> = ({
  songs,
  searchQuery,
  onSelectSong,
  favorites,
  onToggleFavorite,
  onOpenAiSearch,
  activeCategory,
  setActiveCategory,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>('ALL');

  const categories = ['ALL', 'Worship', 'Praise', 'Hymn'];
  const keys = ['ALL', 'C', 'D', 'E', 'F', 'G', 'A', 'B'];

  const filteredSongs = songs.filter((song) => {
    // Search matching
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      song.title.toLowerCase().includes(query) ||
      (song.titleMyanmar && song.titleMyanmar.toLowerCase().includes(query)) ||
      song.artist.toLowerCase().includes(query) ||
      song.sections.some((sec) =>
        sec.lines.some((line) => line.lyricLine.toLowerCase().includes(query))
      );

    // Category matching
    const matchesCategory =
      activeCategory === 'ALL' || song.category === activeCategory;

    // Key matching
    const matchesKey =
      selectedKey === 'ALL' || song.originalKey.toUpperCase() === selectedKey;

    return matchesSearch && matchesCategory && matchesKey;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Category Pills & Key Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'သီချင်းအားလုံး' : cat}
            </button>
          ))}
        </div>

        {/* Key Dropdown Filter */}
        <div className="flex items-center gap-2 shrink-0 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-500 font-medium">Key ဖြင့်စစ်ထုတ်ရန်:</span>
          <select
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
            className="bg-white text-slate-800 border border-slate-200 rounded-full px-3 py-1.5 text-xs outline-none focus:border-blue-600 shadow-sm"
          >
            {keys.map((k) => (
              <option key={k} value={k}>
                {k === 'ALL' ? 'Key အားလုံး' : `Key: ${k}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Song Cards Grid */}
      {filteredSongs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSongs.map((song) => {
            const isFav = favorites.includes(song.id);
            return (
              <div
                key={song.id}
                className="group relative bg-white hover:border-blue-300 border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-semibold">
                      {song.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-mono font-bold">
                        Key: {song.originalKey}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(song.id);
                        }}
                        className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg transition-colors"
                        title={isFav ? 'Remove Offline' : 'Save Offline'}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isFav ? 'fill-amber-500 text-amber-500' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Title & Artist */}
                  <h3
                    onClick={() => onSelectSong(song)}
                    className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {song.title}
                  </h3>

                  {song.titleMyanmar && song.titleMyanmar !== song.title && (
                    <p className="text-sm text-blue-600 font-medium mt-0.5">
                      {song.titleMyanmar}
                    </p>
                  )}

                  <p className="text-xs text-slate-500 mt-2">
                    {song.artist}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <Guitar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Chords: {song.chordsUsed.slice(0, 4).join(', ')}</span>
                  </div>

                  <button
                    onClick={() => onSelectSong(song)}
                    className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1 transition-colors"
                  >
                    <span>Chord ကြည့်မည်</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State & Gemini Search Suggestion */
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center max-w-md mx-auto my-12 shadow-sm">
          <Music className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            ရှာဖွေထားသော သီချင်း မတွေ့ရှိသေးပါ
          </h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            သင်ရှာဖွေလိုသော Gospel သီချင်းကို Gemini AI ဖြင့် တိုက်ရိုက် Chord & Lyrics ရှာဖွေနိုင်ပါသည်။
          </p>
          <button
            onClick={onOpenAiSearch}
            className="mt-4 py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-full shadow-sm flex items-center justify-center gap-2 mx-auto transition-all"
          >
            <Sparkles className="w-4 h-4" />
            AI ဖြင့် သီချင်း Chord ရှာဖွေမည်
          </button>
        </div>
      )}

    </div>
  );
};
