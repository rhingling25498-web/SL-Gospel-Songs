import { Song, ChordDiagram } from '../types';

export const SAMPLE_SONGS: Song[] = [
  {
    id: 'song-1',
    title: 'ကျေးဇူးတော်ကြောင့်ပဲ (By Grace Alone)',
    titleMyanmar: 'ကျေးဇူးတော်ကြောင့်ပဲ',
    artist: 'Myanmar Worship Song',
    originalKey: 'G',
    category: 'Worship',
    tempo: '72 BPM',
    timeSignature: '4/4',
    chordsUsed: ['G', 'Em', 'C', 'D', 'Am'],
    devotionalNote: 'ဧဖက် ၂:၈ "အကြောင်းမူကား၊ သင်တို့သည် ယုံကြည်သောအားဖြင့် ကျေးဇူးတော်ကြောင့် ကယ်တင်ခြင်းသို့ ရောက်ကြ၏။"',
    sections: [
      {
        sectionName: 'Verse 1',
        lines: [
          {
            chordLine: 'G                 Em',
            lyricLine: 'ငါ၏ အသက်ရှင်ခြင်း ဘဝ တလျှောက်လုံး',
          },
          {
            chordLine: 'C                 D',
            lyricLine: 'ကိုယ်တော်ရှင် ပေးသနားသော မေတ္တာတော်ကြောင့်',
          },
          {
            chordLine: 'G                 Em',
            lyricLine: 'ဝေဒနာ ခက်ခဲခြင်း တောင်တန်းများ ကြားထဲ',
          },
          {
            chordLine: 'Am        C         D',
            lyricLine: 'ကိုယ်တော့် လက်တော်က မစခဲ့ပြီ။',
          },
        ],
      },
      {
        sectionName: 'Chorus',
        lines: [
          {
            chordLine: 'G                 Em',
            lyricLine: 'ကျေးဇူးတော်ကြောင့်ပဲ... ကျေးဇူးတော်ကြောင့်ပဲ...',
          },
          {
            chordLine: 'C                 D',
            lyricLine: 'ငါ့အသက်ရှင်ရခြင်း ကိုယ်တော့် ကျေးဇူးတော်ကြောင့်ပဲ',
          },
          {
            chordLine: 'G                 Em',
            lyricLine: 'မတိုင်မီ ကတည်းက ကိုယ်တော် ရွေးချယ်ခဲ့',
          },
          {
            chordLine: 'Am        D         G',
            lyricLine: 'အစဉ်အမြဲ ချီးမွမ်း ကိုယ်တော့် ကျေးဇူးတော်။',
          },
        ],
      },
      {
        sectionName: 'Bridge',
        lines: [
          {
            chordLine: 'C         D         Bm        Em',
            lyricLine: 'အရာရာထက်မက မြင့်မြတ်သော ကိုယ်တော့်နာမ',
          },
          {
            chordLine: 'Am        C         D',
            lyricLine: 'ငါ့စိတ်နှလုံးက ကိုယ်တော့်ကို ကိုးကွယ်၏။',
          },
        ],
      },
    ],
  },
  {
    id: 'song-2',
    title: 'ထာဝရဘုရားသည် ငါ၏သိုးထိန်းဖြစ်တော်မူ၏ (The Lord Is My Shepherd)',
    titleMyanmar: 'ထာဝရဘုရားသည် ငါ၏သိုးထိန်းဖြစ်တော်မူ၏',
    artist: 'Gospel Hymn',
    originalKey: 'C',
    category: 'Hymn',
    tempo: '68 BPM',
    timeSignature: '3/4',
    chordsUsed: ['C', 'F', 'G', 'Am', 'Dm'],
    devotionalNote: 'ဆာလံ ၂၃:၁ "ထာဝရဘုရားသည် ငါ၏သိုးထိန်းဖြစ်တော်မူ၏။ ငါသည် လိုလေသေးမရှိ။"',
    sections: [
      {
        sectionName: 'Verse 1',
        lines: [
          {
            chordLine: 'C        F        C',
            lyricLine: 'ထာဝရဘုရားသည် ငါ၏သိုးထိန်းဖြစ်တော်မူ၏',
          },
          {
            chordLine: 'Am       F        G',
            lyricLine: 'ငါသည် လိုလေသေးမရှိ လိုလေသေးမရှိ',
          },
          {
            chordLine: 'C        F        C',
            lyricLine: 'စိမ်းလန်းသော ကျက်စားရာ ကွက်တို့၌ ငါ့ကို အိပ်စက်စေ၏',
          },
          {
            chordLine: 'Dm       G        C',
            lyricLine: 'သာယာသော ရေနားသို့ ခေါ်ဆောင်တော်မူ၏။',
          },
        ],
      },
      {
        sectionName: 'Chorus',
        lines: [
          {
            chordLine: 'F        G        C        Am',
            lyricLine: 'ကိုယ်တော်သည် ငါ၏ စိတ်ဝိညာဉ်ကို လန်းဆန်းစေ၏',
          },
          {
            chordLine: 'Dm       G        C',
            lyricLine: 'မိမိနာမတော်ကြောင့် ဖြောင့်မတ်ခြင်း လမ်းထဲသို့ ပို့ဆောင်၏။',
          },
        ],
      },
    ],
  },
  {
    id: 'song-3',
    title: 'အံ့ဩဖွယ်ကျေးဇူးတော် (Amazing Grace - Myanmar Version)',
    titleMyanmar: 'အံ့ဩဖွယ်ကျေးဇူးတော်',
    artist: 'John Newton / Translation',
    originalKey: 'G',
    category: 'Hymn',
    tempo: '76 BPM',
    timeSignature: '3/4',
    chordsUsed: ['G', 'C', 'D', 'Em'],
    devotionalNote: 'ဆာလံ ၁၀၃:၈ "ထာဝရဘုရားသည် သနားစုံမက်ခြင်း၊ ကျေးဇူးပြုခြင်း မေတ္တာတော်နှင့် ပြည့်စုံတော်မူ၏။"',
    sections: [
      {
        sectionName: 'Verse 1',
        lines: [
          {
            chordLine: 'G                 C         G',
            lyricLine: 'အံ့ဩဖွယ်ရာ ကျေးဇူးတော် ချိုမြိန်သော အသံ',
          },
          {
            chordLine: 'G                           D',
            lyricLine: 'ငါကဲ့သို့ ပျောက်သောသူ ကယ်တင်ခဲ့ပြီ',
          },
          {
            chordLine: 'G                 C         G',
            lyricLine: 'ငါသည် ပျောက်သောသူ ဖြစ်သော်လည်း ခုတွေ့ပြီ',
          },
          {
            chordLine: 'G         Em        D         G',
            lyricLine: 'မျက်စိ ကန်းသော်လည်း ယခု မြင်နိုင်ပြီ။',
          },
        ],
      },
      {
        sectionName: 'Verse 2',
        lines: [
          {
            chordLine: 'G                 C         G',
            lyricLine: 'ကြောက်ရွံ့ခြင်းကင်း ကယ်တင်သော အံ့ဩဖွယ်မေတ္တာ',
          },
          {
            chordLine: 'G                           D',
            lyricLine: 'ယုံကြည်သောအခါ ငြိမ်းချမ်းခြင်း ပေးခဲ့ပြီ',
          },
          {
            chordLine: 'G                 C         G',
            lyricLine: 'ဘေးဥပဒ် ဒုက္ခ ကျရောက်သောအခါ၌',
          },
          {
            chordLine: 'G         Em        D         G',
            lyricLine: 'ကျေးဇူးတော် ပို့ဆောင် ကာကွယ်ပေးခဲ့ပြီ။',
          },
        ],
      },
    ],
  },
  {
    id: 'song-4',
    title: 'ကိုယ်တော်သာလျှင် (You Alone Are Worthy)',
    titleMyanmar: 'ကိုယ်တော်သာလျှင်',
    artist: 'Praise & Worship',
    originalKey: 'D',
    category: 'Praise',
    tempo: '110 BPM',
    timeSignature: '4/4',
    chordsUsed: ['D', 'A', 'Bm', 'G'],
    devotionalNote: 'ဗျာဒိတ် ၄:၁၁ "အကျွန်ုပ်တို့၏ ဘုရားသခင် ထာဝရဘုရား၊ ကိုယ်တော်သည် ဘုန်းအသရေနှင့် တန်ခိုးတော်ကို ခံထိုက်တော်မူ၏။"',
    sections: [
      {
        sectionName: 'Verse 1',
        lines: [
          {
            chordLine: 'D                 A',
            lyricLine: 'ကောင်းကင်နှင့် မြေကြီးကို ဖန်ဆင်းတော်မူသော',
          },
          {
            chordLine: 'Bm                G',
            lyricLine: 'အနန္တတန်ခိုးရှင် တို့ဘုရားသခင်',
          },
          {
            chordLine: 'D                 A',
            lyricLine: 'သန့်ရှင်းသော နာမတော်ကို ချီးမွမ်းကြပါစို့',
          },
          {
            chordLine: 'G        A        D',
            lyricLine: 'ကိုယ်တော်သာလျှင် ဘုန်းကြီးပါစေ။',
          },
        ],
      },
      {
        sectionName: 'Chorus',
        lines: [
          {
            chordLine: 'D        A        Bm       G',
            lyricLine: 'ကိုယ်တော်သာလျှင်... ကိုယ်တော်သာလျှင်...',
          },
          {
            chordLine: 'D        A        G        A',
            lyricLine: 'ချီးမွမ်းခြင်း အပေါင်း ခံထိုက်တော်မူသောရှင်',
          },
          {
            chordLine: 'D        A        Bm       G',
            lyricLine: 'ငါတို့ စိတ်နှလုံးနှင့် ကိုးကွယ် အစဉ်အမြဲ',
          },
          {
            chordLine: 'G        A        D',
            lyricLine: 'ဟာလေလုယာ အာမင်။',
          },
        ],
      },
    ],
  },
  {
    id: 'song-5',
    title: '10,000 Reasons (Bless The Lord)',
    titleMyanmar: 'ဆာလံ ၁၀၃ - 10,000 Reasons',
    artist: 'Matt Redman',
    originalKey: 'C',
    category: 'Worship',
    tempo: '73 BPM',
    timeSignature: '4/4',
    chordsUsed: ['F', 'C', 'G', 'Am'],
    devotionalNote: 'Psalm 103:1 "Bless the Lord, O my soul, and all that is within me, bless his holy name!"',
    sections: [
      {
        sectionName: 'Chorus',
        lines: [
          {
            chordLine: 'F          C          G          Am',
            lyricLine: 'Bless the Lord O my soul, O my soul',
          },
          {
            chordLine: 'F          C          G',
            lyricLine: 'Worship His Holy name',
          },
          {
            chordLine: 'F          Am         F    G    Am',
            lyricLine: 'Sing like never before, O my soul',
          },
          {
            chordLine: 'F          G          C',
            lyricLine: "I'll worship Your Holy name",
          },
        ],
      },
      {
        sectionName: 'Verse 1',
        lines: [
          {
            chordLine: 'F         C         G         Am',
            lyricLine: 'The sun comes up, it\'s a new day dawning',
          },
          {
            chordLine: 'F         C         G         Am',
            lyricLine: "It's time to sing Your song again",
          },
          {
            chordLine: 'F         C         G         Am',
            lyricLine: 'Whatever may pass and whatever lies before me',
          },
          {
            chordLine: 'F         C         G         C',
            lyricLine: 'Let me be singing when the evening comes',
          },
        ],
      },
    ],
  },
];

export const CHORD_DIAGRAMS: Record<string, ChordDiagram> = {
  C: { name: 'C Major', frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
  Cm: { name: 'C Minor', frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], baseFret: 3 },
  D: { name: 'D Major', frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
  Dm: { name: 'D Minor', frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
  E: { name: 'E Major', frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
  Em: { name: 'E Minor', frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
  F: { name: 'F Major', frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1] },
  G: { name: 'G Major', frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
  Am: { name: 'A Minor', frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
  A: { name: 'A Major', frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
  Bm: { name: 'B Minor', frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], baseFret: 2 },
};
