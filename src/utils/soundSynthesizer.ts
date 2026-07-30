// Frequency map for guitar chord notes (in Hz)
const NOTE_FREQUENCIES: Record<string, number> = {
  C3: 130.81,
  'C#3': 138.59,
  D3: 146.83,
  'D#3': 155.56,
  E3: 164.81,
  F3: 174.61,
  'F#3': 185.0,
  G3: 196.0,
  'G#3': 207.65,
  A3: 220.0,
  'A#3': 233.08,
  B3: 246.94,
  C4: 261.63,
  'C#4': 277.18,
  D4: 293.66,
  'D#4': 311.13,
  E4: 329.63,
  F4: 349.23,
  'F#4': 369.99,
  G4: 392.0,
  'G#4': 415.3,
  A4: 440.0,
  'A#4': 466.16,
  B4: 493.88,
  C5: 523.25,
};

// Chord note compositions for common chords
const CHORD_NOTES: Record<string, string[]> = {
  C: ['C3', 'E3', 'G3', 'C4', 'E4'],
  Cm: ['C3', 'D#3', 'G3', 'C4', 'D#4'],
  D: ['D3', 'A3', 'D4', 'F#4'],
  Dm: ['D3', 'A3', 'D4', 'F4'],
  E: ['E3', 'B3', 'E4', 'G#4', 'B4', 'E5'],
  Em: ['E3', 'B3', 'E4', 'G4', 'B4', 'E5'],
  F: ['F3', 'C4', 'F4', 'A4'],
  Fm: ['F3', 'C4', 'F4', 'G#4'],
  G: ['G3', 'B3', 'D4', 'G4', 'B4', 'G5'],
  Gm: ['G3', 'A#3', 'D4', 'G4'],
  A: ['A3', 'E4', 'A4', 'C#5', 'E5'],
  Am: ['A3', 'E4', 'A4', 'C4', 'E4'],
  B: ['B3', 'F#4', 'B4', 'D#5'],
  Bm: ['B3', 'F#4', 'B4', 'D4'],
  B7: ['B3', 'D#4', 'A4', 'B4', 'F#5'],
  G7: ['G3', 'B3', 'D4', 'F4', 'G4'],
  C7: ['C3', 'E3', 'A#3', 'C4', 'E4'],
  D7: ['D3', 'A3', 'C4', 'F#4'],
  A7: ['A3', 'E4', 'G4', 'C#5'],
  E7: ['E3', 'B3', 'D4', 'G#4', 'B4'],
};

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playChordSound(chordName: string) {
  try {
    const ctx = getAudioContext();

    // Clean up chord name to base chord
    const baseChord = chordName.trim().replace(/\/.*$/, '');
    const notes = CHORD_NOTES[baseChord] || CHORD_NOTES['C'];

    const now = ctx.currentTime;

    notes.forEach((note, index) => {
      const freq = NOTE_FREQUENCIES[note] || 261.63;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Plucked string envelope
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Strum delay simulation (20ms between strings)
      const strumTime = now + index * 0.025;

      gain.gain.setValueAtTime(0, strumTime);
      gain.gain.linearRampToValueAtTime(0.25, strumTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, strumTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(strumTime);
      osc.stop(strumTime + 1.9);
    });
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}
