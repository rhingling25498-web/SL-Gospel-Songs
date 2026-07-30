const CHROMATIC_SCALE = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

const FLAT_CONVERSIONS: Record<string, string> = {
  Db: 'C#',
  Eb: 'D#',
  Gb: 'F#',
  Ab: 'G#',
  Bb: 'A#',
};

/**
 * Transposes a single chord string (e.g., "C", "Am7", "F#m/G") by semitones.
 */
export function transposeChord(chord: string, semitones: number): string {
  if (!chord || chord.trim() === '') return chord;

  // Handle slash chords like C/E or Am/G
  if (chord.includes('/')) {
    const [root, bass] = chord.split('/');
    return `${transposeChord(root, semitones)}/${transposeChord(bass, semitones)}`;
  }

  // Regex to extract root note (A-G with optional # or b) and quality/extensions (e.g., m7, maj7, sus4, 7)
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;

  let rootNote = match[1];
  const suffix = match[2];

  // Standardize flat notes to sharp equivalent for transposition lookup
  if (FLAT_CONVERSIONS[rootNote]) {
    rootNote = FLAT_CONVERSIONS[rootNote];
  }

  const index = CHROMATIC_SCALE.indexOf(rootNote);
  if (index === -1) return chord;

  let newIndex = (index + semitones) % 12;
  if (newIndex < 0) newIndex += 12;

  return CHROMATIC_SCALE[newIndex] + suffix;
}

/**
 * Transposes an entire line of chords while preserving character spacing alignment.
 */
export function transposeChordLine(line: string, semitones: number): string {
  if (semitones === 0 || !line) return line;

  // Regex matches chord tokens (letters A-G with optional #/b, m, dim, aug, sus, numbers, slash)
  const chordRegex = /\b[A-G][#b]?(m|maj|dim|aug|sus|add|7|9|11|13)*(\/[A-G][#b]?)?\b/g;

  return line.replace(chordRegex, (matchedChord) => {
    return transposeChord(matchedChord, semitones);
  });
}
