import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Share2, MoreVertical, PlusSquare, CheckCircle, Sparkles, BookOpen, HardDriveDownload, X, BookmarkCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'offline'>('android');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('ဖုန်း ဘရောင်ဇာ Menu (⋮ သို့မဟုတ် 📤) မှတစ်ဆင့် "Add to Home Screen" ကို နှိပ်၍ ထည့်သွင်းနိုင်ပါသည်။');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl text-slate-900 p-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <Smartphone className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-wide">
                ဖုန်းထဲသို့ App ထည့်သွင်းနည်း (Install App)
              </h2>
              <p className="text-xs text-blue-600">
                How to Download Grace Gospel to your Mobile Phone
              </p>
            </div>
          </div>

          {/* Banner Notice */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-sm leading-relaxed text-slate-800">
                <span className="font-bold text-blue-700">အထူးသတင်းကောင်း - </span>
                Play Store / App Store မလိုဘဲ သင့်ဖုန်း၏ Home Screen ပေါ်တွင် အစစ်အမှန် App အဖြစ် တိုက်ရိုက် ထည့်သွင်းအသုံးပြုနိုင်ပါသည်။
              </div>
            </div>

            {deferredPrompt && !isInstalled && (
              <button
                onClick={handleNativeInstall}
                className="mt-3 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                ယခုပဲ ဖုန်းထဲသို့ တိုက်ရိုက် ထည့်သွင်းမည် (One-Tap Install)
              </button>
            )}

            {isInstalled && (
              <div className="mt-2 flex items-center gap-2 text-emerald-600 text-xs font-semibold">
                <CheckCircle className="w-4 h-4" />
                ဖုန်း၏ Home Screen ထဲသို့ အောင်မြင်စွာ ထည့်သွင်းပြီးပါပြီ။
              </div>
            )}
          </div>

          {/* OS Selector Tabs */}
          <div className="flex border-b border-slate-200 mb-6">
            <button
              onClick={() => setActiveTab('android')}
              className={`flex-1 py-2.5 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'android'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Android (Chrome)
            </button>
            <button
              onClick={() => setActiveTab('ios')}
              className={`flex-1 py-2.5 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'ios'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              iPhone / iPad (Safari)
            </button>
            <button
              onClick={() => setActiveTab('offline')}
              className={`flex-1 py-2.5 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'offline'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <HardDriveDownload className="w-4 h-4" />
              Offline Save
            </button>
          </div>

          {/* Tab 1: Android Instructions */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  1
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                    Chrome Browser အပေါ်ညာဘက်မှ Menu (<MoreVertical className="w-4 h-4 inline text-amber-600" />) ကိုနှိပ်ပါ
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Tap the 3 dots menu icon at the top right of your Chrome browser screen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  2
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                    <PlusSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    "Add to Home screen" သို့မဟုတ် "Install app" ကိုရွေးပါ
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Select "Add to Home screen" or "Install App" from the menu list.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  3
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    "Add / Install" ကို အတည်ပြုနှိပ်ပါ
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Confirm Install. A Grace Gospel Icon will instantly appear on your mobile home screen!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: iOS Instructions */}
          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  1
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                    Safari Browser အောက်ခြေမှ Share (<Share2 className="w-4 h-4 inline text-blue-600" />) ခလုတ်ကိုနှိပ်ပါ
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Tap the Share button at the bottom of Safari browser on iOS.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  2
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                    အောက်သို့ဆွဲ၍ "Add to Home Screen" ကိုနှိပ်ပါ
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Scroll down in the action menu and select "Add to Home Screen".
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  3
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    ညာဘက်အပေါ်ထောင့်မှ "Add" ကိုနှိပ်ပါ
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Tap "Add" in top right. You now have the Grace Gospel app icon on your iPhone home screen.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Offline Save & Song Downloads */}
          {activeTab === 'offline' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <BookmarkCheck className="w-4 h-4 text-amber-500" />
                  သီချင်းနှင့် Chord များကို Offline သိမ်းဆည်းနည်း
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  သီချင်းတစ်ပုဒ်စီ၏ ကြယ်ပွင့် (<span className="text-amber-600 font-bold">⭐ Favorite</span>) ကို နှိပ်ထားပါက အင်တာနက် / Wi-Fi မရှိသော ဘုရားကျောင်း ဝတ်ပြုကိုးကွယ်ခြင်း အချိန်များတွင်လည်း ဖုန်းထဲ၌ အလွယ်တကူ ဖွင့်ကြည့်နိုင်ပါသည်။
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Download className="w-4 h-4 text-blue-600" />
                  သီချင်းစာရွက် စာအုပ်အဖြစ် ဖုန်းထဲသို့ ဒေါင်းလုဒ်ဆွဲရန်
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  သီချင်းကြည့်ရှုသည့် စာမျက်နှာရှိ "<span className="text-blue-600 font-bold">Download Lyrics & Chords (.TXT / PDF)</span>" ခလုတ်ကို နှိပ်၍ သီချင်းစာသားနှင့် Chord များကို သင့်ဖုန်း၏ Download ဖိုဒါထဲသို့ ဒေါင်းလုဒ်ဆွဲ သိမ်းဆည်းနိုင်ပါသည်။
                </p>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
            <button
              onClick={onClose}
              className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-full transition-colors shadow-sm"
            >
              နားလည်ပါပြီ (Got It)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
