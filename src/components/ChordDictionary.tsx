import React, { useState } from 'react';
import { CHORD_DIAGRAMS } from '../data/sampleSongs';
import { playChordSound } from '../utils/soundSynthesizer';
import { Guitar, Volume2, Sparkles } from 'lucide-react';

export const ChordDictionary: React.FC = () => {
  const [selectedChordKey, setSelectedChordKey] = useState<string>('C');

  const chordKeys = Object.keys(CHORD_DIAGRAMS);
  const activeChord = CHORD_DIAGRAMS[selectedChordKey] || CHORD_DIAGRAMS['C'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
          <Guitar className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Guitar Chord Diagram (ဂီတာ Chord ဇယားများ)
          </h2>
          <p className="text-xs text-slate-500">
            Interactive finger charts & sound preview for worship guitarists
          </p>
        </div>
      </div>

      {/* Chord Selector Buttons */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
        {chordKeys.map((c) => (
          <button
            key={c}
            onClick={() => {
              setSelectedChordKey(c);
              playChordSound(c);
            }}
            className={`py-2 px-4 rounded-full font-mono font-bold text-sm transition-all ${
              selectedChordKey === c
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Chord Visualizer Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-around gap-8 shadow-sm">
        
        {/* Visual SVG Guitar Fretboard */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center">
          <div className="text-xl font-bold text-slate-900 font-mono mb-2">
            {activeChord.name}
          </div>

          <button
            onClick={() => playChordSound(selectedChordKey)}
            className="mb-4 py-1.5 px-3.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Volume2 className="w-4 h-4 text-blue-600" />
            <span>Play Chord Sound</span>
          </button>

          {/* Fretboard SVG */}
          <svg width="200" height="240" viewBox="0 0 200 240" className="text-slate-800">
            {/* Nut / Base Fret */}
            <rect x="30" y="30" width="140" height="8" fill="#334155" rx="2" />

            {/* Frets (Horizontal lines) */}
            {[1, 2, 3, 4, 5].map((fret) => (
              <line
                key={fret}
                x1="30"
                y1={30 + fret * 35}
                x2="170"
                y2={30 + fret * 35}
                stroke="#cbd5e1"
                strokeWidth="2"
              />
            ))}

            {/* Strings (Vertical lines: E, A, D, G, B, e) */}
            {[0, 1, 2, 3, 4, 5].map((str) => (
              <line
                key={str}
                x1={30 + str * 28}
                y1="30"
                x2={30 + str * 28}
                y2="205"
                stroke="#64748b"
                strokeWidth={str < 3 ? '2.5' : '1.5'}
              />
            ))}

            {/* Finger placements and muted/open strings */}
            {activeChord.frets.map((fretVal, strIdx) => {
              const xPos = 30 + strIdx * 28;

              // Muted string (X)
              if (fretVal === -1) {
                return (
                  <text
                    key={strIdx}
                    x={xPos}
                    y="20"
                    textAnchor="middle"
                    fill="#e11d48"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    ✕
                  </text>
                );
              }

              // Open string (O)
              if (fretVal === 0) {
                return (
                  <circle
                    key={strIdx}
                    cx={xPos}
                    cy="18"
                    r="5"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                );
              }

              // Fretted position
              const yPos = 30 + (fretVal - 0.5) * 35;
              const fingerNum = activeChord.fingers[strIdx];

              return (
                <g key={strIdx}>
                  <circle cx={xPos} cy={yPos} r="12" fill="#2563eb" />
                  {fingerNum > 0 && (
                    <text
                      x={xPos}
                      y={yPos + 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {fingerNum}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="mt-2 text-[11px] text-slate-500 font-mono">
            Strings: E A D G B e
          </div>
        </div>

        {/* Instructions / Explanation */}
        <div className="space-y-4 max-w-sm text-xs text-slate-600 leading-relaxed">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-blue-700 mb-2">ဂီတာ တီးခတ်နည်း အကြံပြုချက်:</h4>
            <ul className="space-y-2 list-disc list-inside text-slate-700">
              <li>
                <span className="text-rose-600 font-bold">✕ ( Red Cross )</span> : ထိုကြိုးကို မတီးခတ်ပါနှင့်။
              </li>
              <li>
                <span className="text-blue-600 font-bold">◯ ( Open Circle )</span> : ဘာမှမနှိပ်ဘဲ ဒီအတိုင်းတီးပါ။
              </li>
              <li>
                <span className="text-blue-600 font-bold">1, 2, 3, 4</span> : လက်ညှိုး(1)၊ လက်လယ်(2)၊ လက်သန်းကြွယ်(3)၊ လက်သန်း(4) တို့ဖြင့် နှိပ်ပါ။
              </li>
            </ul>
          </div>

          <button
            onClick={() => playChordSound(selectedChordKey)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <Volume2 className="w-4 h-4" />
            <span>{selectedChordKey} Chord အသံအား နားထောင်မည်</span>
          </button>
        </div>

      </div>
    </div>
  );
};
