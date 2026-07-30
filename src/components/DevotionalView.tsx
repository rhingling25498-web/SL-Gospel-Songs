import React, { useState } from 'react';
import { Devotional } from '../types';
import { BookOpen, RefreshCw, Heart, Sparkles, Music, Quote, Share2, Copy, Check } from 'lucide-react';

export const DevotionalView: React.FC = () => {
  const [devotional, setDevotional] = useState<Devotional>({
    id: 'dev-1',
    date: new Date().toLocaleDateString('my-MM', { year: 'numeric', month: 'long', day: 'numeric' }),
    title: 'ယုံကြည်ခြင်းနှင့် ကျေးဇူးတော်',
    titleEnglish: 'Faith & Unending Grace',
    scriptureVerse: 'ဧဖက် ၂:၈-၉ (Ephesians 2:8-9)',
    scriptureTextMyanmar: 'အကြောင်းမူကား၊ သင်တို့သည် ယုံကြည်သောအားဖြင့် ကျေးဇူးတော်ကြောင့် ကယ်တင်ခြင်းသို့ ရောက်ကြ၏။ ကိုယ်အလိုအလျောက် ရောက်ကြသည်မဟုတ်။ ဘုရားသခင်၏ သနားတော်မူခြင်း ကျေးဇူးတော်ဖြစ်၏။',
    scriptureTextEnglish: 'For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast.',
    reflectionMyanmar: 'နေ့စဉ်ခရီးစဉ်တွင် ကြုံတွေ့ရသော စိန်ခေါ်မှုများအလယ်၌ ဘုရားသခင်၏ ကျေးဇူးတော်သည် အမြဲတမ်း လုံလောက်လျက်ရှိပါသည်။ ငါတို့၏ ကြိုးစားအားထုတ်မှုထက် ဘုရားသခင်၏ မေတ္တာတော်ကို ပိုမိုကိုးစားသောအခါ စိတ်နှလုံး၌ စစ်မှန်သော ငြိမ်းချမ်းခြင်းကို ခံစားရမည် ဖြစ်ပါသည်။',
    reflectionEnglish: 'In the midst of daily challenges, God\'s grace is always sufficient for us. When we rely more on His infinite love than our own strength, our hearts will experience true peace and divine guidance.',
    prayerMyanmar: 'ချစ်လှစွာသော ကောင်းကင်ဘုံပါအဖ၊ ယနေ့နေ့ရက်တွင် ကိုယ်တော်၏ ကျေးဇူးတော်နှင့် မေတ္တာတော်ကို ဆင်ခြင်အောက်မေ့စေသည့်အတွက် ကျေးဇူးတင်ပါ၏။ အခက်အခဲများကြားထဲ၌ ကိုယ်တော်၏ ငြိမ်းချမ်းခြင်းနှင့် ပြည့်စုံစေတော်မူပါ။ အာမင်။',
    recommendedSongs: ['ကျေးဇူးတော်ကြောင့်ပဲ', 'အံ့ဩဖွယ်ကျေးဇူးတော်', '10,000 Reasons'],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('Grace & Peace');
  const [copied, setCopied] = useState<boolean>(false);

  const handleRefreshDevotional = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gemini/devotional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme }),
      });
      if (res.ok) {
        const data = await res.json();
        setDevotional({
          id: `dev-${Date.now()}`,
          date: new Date().toLocaleDateString('my-MM', { year: 'numeric', month: 'long', day: 'numeric' }),
          title: data.title || devotional.title,
          titleEnglish: data.titleEnglish || devotional.titleEnglish,
          scriptureVerse: data.scriptureVerse || devotional.scriptureVerse,
          scriptureTextMyanmar: data.scriptureTextMyanmar || devotional.scriptureTextMyanmar,
          scriptureTextEnglish: data.scriptureTextEnglish || devotional.scriptureTextEnglish,
          reflectionMyanmar: data.reflectionMyanmar || devotional.reflectionMyanmar,
          reflectionEnglish: data.reflectionEnglish || devotional.reflectionEnglish,
          prayerMyanmar: data.prayerMyanmar || devotional.prayerMyanmar,
          recommendedSongs: data.recommendedSongs || devotional.recommendedSongs,
        });
      }
    } catch (err) {
      console.error('Failed to generate devotional:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const text = `${devotional.title}\n${devotional.scriptureVerse}\n\n"${devotional.scriptureTextMyanmar}"\n\nဆင်ခြင်ရန်:\n${devotional.reflectionMyanmar}\n\nဆုတောင်းချက်:\n${devotional.prayerMyanmar}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Devotional Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        
        {/* Top Date & Refresh Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                Daily Gospel Devotional • {devotional.date}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                {devotional.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="py-2 px-3.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-full border border-slate-200 shadow-sm flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleRefreshDevotional}
              disabled={loading}
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Generating...' : 'အသစ်ရယူမည်'}</span>
            </button>
          </div>
        </div>

        {/* Scripture Verse Quote Block */}
        <div className="my-6 p-5 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl relative">
          <Quote className="w-8 h-8 text-blue-200 absolute top-2 right-2 pointer-events-none" />
          <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
            {devotional.scriptureVerse}
          </div>
          <p className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed italic">
            "{devotional.scriptureTextMyanmar}"
          </p>
          <p className="text-xs text-slate-500 mt-2 font-serif">
            "{devotional.scriptureTextEnglish}"
          </p>
        </div>

        {/* Reflection */}
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed mb-6">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            ဝိညာဉ်ရေးရာ ဆင်ခြင်တွေးတောဖွယ် (Reflection)
          </h3>
          <p className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700">
            {devotional.reflectionMyanmar}
          </p>
        </div>

        {/* Prayer Section */}
        <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-5 mb-6">
          <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            ယနေ့ ဆုတောင်းချက် (Daily Prayer)
          </h4>
          <p className="text-sm text-emerald-950 italic">
            "{devotional.prayerMyanmar}"
          </p>
        </div>

        {/* Recommended Worship Songs */}
        {devotional.recommendedSongs && (
          <div className="pt-4 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
              <Music className="w-4 h-4 text-blue-600" />
              ယနေ့ ဆက်စပ် သီချင်းများ (Recommended Songs):
            </div>
            <div className="flex flex-wrap gap-2">
              {devotional.recommendedSongs.map((s, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold rounded-full"
                >
                  ♫ {s}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
