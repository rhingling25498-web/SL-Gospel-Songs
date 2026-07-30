import React, { useState, useEffect, useRef } from 'react';
import { Song } from '../types';
import { transposeChordLine } from '../utils/chordTransposer';
import { playChordSound } from '../utils/soundSynthesizer';
import { ArrowLeft, Play, Pause, Bookmark, Download, Volume2, Plus, Minus, RotateCcw, Share2, Copy, Check, Sparkles, BookOpen } from 'lucide-react';

interface SongDetailProps {
  song: Song;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (songId: string) => void;
}

export const SongDetail: React.FC<SongDetailProps> = ({
  song,
  onBack,
  isFavorite,
  onToggleFavorite,
}) => {
  const [semitones, setSemitones] = useState<number>(0);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(2); // 1 to 5
  const [copied, setCopied] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll effect
  useEffect(() => {
    let interval: any;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        window.scrollBy({ top: scrollSpeed, behavior: 'smooth' });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, scrollSpeed]);

  const handleDownloadText = () => {
    let content = `=====================================\n`;
    content += `${song.title}\n`;
    if (song.titleMyanmar) content += `${song.titleMyanmar}\n`;
    content += `Artist: ${song.artist}\n`;
    content += `Key: ${song.originalKey} (Transposed: ${semitones >= 0 ? '+' : ''}${semitones})\n`;
    content += `Category: ${song.category}\n`;
    content += `=====================================\n\n`;

    song.sections.forEach((sec) => {
      content += `[${sec.sectionName}]\n`;
      sec.lines.forEach((l) => {
        const transposedChords = transposeChordLine(l.chordLine, semitones);
        content += `${transposedChords}\n`;
        content += `${l.lyricLine}\n\n`;
      });
      content += `\n`;
    });

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${song.title.replace(/[^a-zA-Z0-9]/g, '_')}_Chords.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyLyrics = () => {
    let content = `${song.title}\n\n`;
    song.sections.forEach((sec) => {
      content += `[${sec.sectionName}]\n`;
      sec.lines.forEach((l) => {
        content += `${transposeChordLine(l.chordLine, semitones)}\n${l.lyricLine}\n`;
      });
      content += `\n`;
    });
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fontSizeClasses = {
    sm: 'text-xs',
    base: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  return (
    <div ref={scrollRef} className="max-w-4xl mx-auto pb-16 px-4">
      
      {/* Top Back & Quick Bar */}
      <div className="flex items-center justify-between py-4 border-b border-slate-200/80 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 py-2 px-4 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold rounded-full transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
          သီချင်းစာရင်းသို့ ပြန်သွားမည်
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(song.id)}
            className={`py-2 px-3.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm ${
              isFavorite
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isFavorite ? 'Saved Offline' : 'Save Offline'}</span>
          </button>

          <button
            onClick={handleDownloadText}
            className="py-2 px-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            title="Download Chords & Lyrics TXT file"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download TXT</span>
          </button>
        </div>
      </div>

      {/* Song Header Info Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold">
                {song.category}
              </span>
              <span className="px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">
                Key: {song.originalKey}
              </span>
              {song.tempo && (
                <span className="px-3 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium">
                  {song.tempo}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {song.title}
            </h1>
            {song.titleMyanmar && song.titleMyanmar !== song.title && (
              <p className="text-lg text-blue-600 mt-1 font-semibold">
                {song.titleMyanmar}
              </p>
            )}
            <p className="text-xs text-slate-500 mt-2">
              Artist: <span className="text-slate-800 font-semibold">{song.artist}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLyrics}
              className="py-2 px-3.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all border border-slate-200 shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copied ? 'Copied' : 'Copy Lyrics'}</span>
            </button>
          </div>
        </div>

        {song.devotionalNote && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
            <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-blue-700">ကျမ်းဂန်နှင့် ဆင်ခြင်ရန်: </span>
              {song.devotionalNote}
            </div>
          </div>
        )}
      </div>

      {/* Control Toolbar (Key Transpose, Auto-scroll, Sound, Font Size) */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border border-slate-200 rounded-full px-4 py-2 mb-8 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Key Transposer */}
        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-full border border-slate-200">
          <span className="text-slate-600 font-medium px-2">Key Transpose:</span>
          <button
            onClick={() => setSemitones((s) => s - 1)}
            className="w-7 h-7 bg-white hover:bg-slate-100 text-slate-800 rounded-full border border-slate-200 flex items-center justify-center font-bold shadow-sm"
            title="Transpose down 1 semitone"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-mono font-bold text-blue-600 text-sm">
            {semitones > 0 ? `+${semitones}` : semitones}
          </span>
          <button
            onClick={() => setSemitones((s) => s + 1)}
            className="w-7 h-7 bg-white hover:bg-slate-100 text-slate-800 rounded-full border border-slate-200 flex items-center justify-center font-bold shadow-sm"
            title="Transpose up 1 semitone"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          {semitones !== 0 && (
            <button
              onClick={() => setSemitones(0)}
              className="p-1 text-slate-400 hover:text-slate-700"
              title="Reset Key"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Auto Scroll Controls */}
        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-full border border-slate-200">
          <span className="text-slate-600 font-medium px-2">Auto Scroll:</span>
          <button
            onClick={() => setIsAutoScrolling(!isAutoScrolling)}
            className={`py-1 px-3.5 rounded-full font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isAutoScrolling
                ? 'bg-amber-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isAutoScrolling ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isAutoScrolling ? 'Pause' : 'Play'}</span>
          </button>
          {isAutoScrolling && (
            <select
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(Number(e.target.value))}
              className="bg-white text-slate-800 py-1 px-2.5 rounded-full text-xs border border-slate-200 outline-none"
            >
              <option value={1}>Slow (1x)</option>
              <option value={2}>Normal (2x)</option>
              <option value={4}>Fast (4x)</option>
            </select>
          )}
        </div>

        {/* Font Size Selector */}
        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-200">
          <span className="text-slate-600 font-medium px-2">Font:</span>
          {(['sm', 'base', 'lg', 'xl'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                fontSize === size
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Used Chords Audio Listeners */}
      {song.chordsUsed && song.chordsUsed.length > 0 && (
        <div className="mb-6 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-blue-600" />
            အသုံးပြုထားသော Chord များ (Listen Chord Sound):
          </div>
          <div className="flex flex-wrap gap-2">
            {song.chordsUsed.map((ch) => (
              <button
                key={ch}
                onClick={() => playChordSound(ch)}
                className="py-1.5 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-mono font-bold text-xs rounded-full flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                {ch}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Song Body (Chords & Lyrics) */}
      <div className="space-y-8 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
        {song.sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-full uppercase tracking-wider">
              {section.sectionName}
            </div>

            <div className="space-y-4 pl-3 border-l-2 border-blue-600/30">
              {section.lines.map((line, lIdx) => {
                const transposedChordLine = transposeChordLine(line.chordLine, semitones);
                return (
                  <div key={lIdx} className="font-mono">
                    {/* Chord Line */}
                    {line.chordLine && line.chordLine.trim().length > 0 && (
                      <div className="text-blue-600 font-bold tracking-wider whitespace-pre text-sm sm:text-base leading-snug">
                        {transposedChordLine}
                      </div>
                    )}
                    {/* Lyric Line */}
                    <div className={`text-slate-900 font-sans tracking-normal leading-relaxed mt-0.5 ${fontSizeClasses[fontSize]}`}>
                      {line.lyricLine}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
