export interface ChordLine {
  chordLine: string;
  lyricLine: string;
}

export interface SongSection {
  sectionName: string; // e.g. "Verse 1", "Chorus", "Bridge"
  lines: ChordLine[];
}

export interface Song {
  id: string;
  title: string;
  titleMyanmar?: string;
  artist: string;
  originalKey: string;
  category: 'Praise' | 'Worship' | 'Hymn' | 'Youth' | 'Myanmar Traditional Gospel';
  tempo?: string;
  timeSignature?: string;
  chordsUsed: string[];
  sections: SongSection[];
  devotionalNote?: string;
  isFavorite?: boolean;
}

export interface Devotional {
  id: string;
  date: string;
  title: string;
  titleEnglish: string;
  scriptureVerse: string;
  scriptureTextMyanmar: string;
  scriptureTextEnglish: string;
  reflectionMyanmar: string;
  reflectionEnglish: string;
  prayerMyanmar: string;
  recommendedSongs: string[];
}

export interface ChordDiagram {
  name: string;
  frets: number[]; // e.g., [-1, 3, 2, 0, 1, 0] for C major (-1 is muted/X)
  fingers: number[]; // finger positions 1, 2, 3, 4
  baseFret?: number;
}
