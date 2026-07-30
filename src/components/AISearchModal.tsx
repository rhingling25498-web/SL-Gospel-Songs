import React, { useState } from 'react';
import { Song } from '../types';
import { Sparkles, Search, Loader2, Music, Key, X, AlertCircle } from 'lucide-react';

interface AISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSongGenerated: (newSong: Song) => void;
}

export const AISearchModal: React.FC<AISearchModalProps> = ({
  isOpen,
  onClose,
  onSongGenerated,
}) => {
  const [songTitle, setSongTitle] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [targetKey, setTargetKey] = useState<string>('C');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songTitle.trim()) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/gemini/song', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: songTitle.trim(),
          artist: artistName.trim(),
          keyPreference: targetKey,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate song chords from Gemini AI');
      }

      const data = await response.json();

      const newGeneratedSong: Song = {
        id: `ai-song-${Date.now()}`,
        title: data.title || songTitle,
        titleMyanmar: data.titleMyanmar || songTitle,
        artist: data.artist || 'Gospel Worship',
        originalKey: data.originalKey || targetKey,
        category: data.category || 'Worship',
        tempo: data.tempo || 'Moderate',
        timeSignature: data.timeSignature || '4/4',
        chordsUsed: data.chordsUsed || ['C', 'G', 'Am', 'F'],
        sections: data.sections || [],
        devotionalNote: data.devotionalContext || '',
      };

      onSongGenerated(newGeneratedSong);
      setSongTitle('');
      setArtistName('');
      onClose();
    } catch (err: any) {
      console.error('AI search error:', err);
      setErrorMsg('သီချင်း Chord များကို Gemini AI မှ ရှာဖွေရာတွင် အမှားအယွင်းရှိခဲ့ပါသည်။ ပြန်လည်ကြိုးစားပေးပါ။');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Gemini AI Song & Chord Finder
            </h2>
            <p className="text-xs text-blue-600">
              Find guitar chords for any Myanmar or English Gospel song
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              သီချင်းခေါင်းစဉ် (Song Title) *
            </label>
            <input
              type="text"
              required
              placeholder="ဥပမာ- အံ့ဩဖွယ်ကျေးဇူးတော် / How Great Is Our God"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-full text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">
              အဆိုတော် / အဖွဲ့ (Artist Name - Optional)
            </label>
            <input
              type="text"
              placeholder="ဥပမာ- Hillsong / Myanmar Gospel Choir"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-full text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">
              လိုချင်သော Key (Target Key)
            </label>
            <select
              value={targetKey}
              onChange={(e) => setTargetKey(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-full text-xs text-slate-900 outline-none transition-colors"
            >
              {['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'].map((k) => (
                <option key={k} value={k}>
                  Key: {k}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-semibold transition-colors text-xs"
            >
              မလုပ်တော့ပါ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full flex items-center gap-2 shadow-sm disabled:opacity-50 transition-colors text-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Chord ရှာဖွေနေပါသည်...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Chord ရှာမည်</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
