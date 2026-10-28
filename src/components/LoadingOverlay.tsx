import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Brain, CheckCircle } from 'lucide-react';
import { GEMINI_TIPS } from '../services/gemini';

export const LoadingOverlay: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % GEMINI_TIPS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl border border-slate-100">
        {/* Animated icon pulse */}
        <div className="relative inline-flex items-center justify-center mb-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/25 animate-pulse">
            <Sparkles className="w-9 h-9 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-600 items-center justify-center text-[10px] text-white font-bold">
              AI
            </span>
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Menyusun Modul Ajar Kurikulum Merdeka
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Kecerdasan Buatan Gemini sedang merancang skenario pembelajaran komprehensif...
        </p>

        {/* Progress bar animation */}
        <div className="w-full bg-slate-100 rounded-full h-2 my-5 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 h-full rounded-full animate-pulse w-3/4"></div>
        </div>

        {/* Rotating Educational Tips */}
        <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100/80 text-left min-h-[76px] flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 block">
              Fokus Pedagogis:
            </span>
            <p className="text-xs text-slate-700 leading-snug font-medium transition-all duration-300">
              {GEMINI_TIPS[tipIndex]}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-4">
          Estimasi proses 10 - 25 detik untuk menyusun modul lengkap beserta instrumen asesmen dan LKPD.
        </p>
      </div>
    </div>
  );
};
