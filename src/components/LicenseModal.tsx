import React, { useState } from 'react';
import { KeyRound, ShieldCheck, Sparkles, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import { StorageService } from '../services/storage';

interface LicenseModalProps {
  isOpen: boolean;
  onSuccess: (licenseKey: string) => void;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({ isOpen, onSuccess }) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isActivating, setIsActivating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const trimmed = licenseKey.trim().toUpperCase();
    if (!trimmed) {
      setError('Silakan masukkan kunci lisensi aktivasi Anda.');
      return;
    }

    if (!StorageService.isLicenseValid(trimmed)) {
      setError('Kunci lisensi tidak valid. Format harus diawali dengan "MAJ-" atau minimal 10 karakter alfanumerik.');
      return;
    }

    setIsActivating(true);
    setTimeout(() => {
      const saved = StorageService.saveLicense(trimmed);
      setIsActivating(false);
      if (saved) {
        onSuccess(trimmed);
      } else {
        setError('Gagal menyimpan lisensi ke browser.');
      }
    }, 400);
  };

  const handleUseDemoKey = () => {
    const demoKey = 'MAJ-GURU-MERDEKA-2025';
    setLicenseKey(demoKey);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header decoration */}
        <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-7 text-white text-center">
          <div className="absolute top-3 right-3 opacity-15">
            <BookOpen className="w-24 h-24 text-white" />
          </div>
          
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-3 shadow-inner">
            <KeyRound className="w-7 h-7 text-amber-300" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Aktivasi ModulAjar.AI</h2>
          <p className="mt-1 text-xs text-blue-100 max-w-xs mx-auto">
            Platform Cerdas Pembuatan Modul Ajar Kurikulum Merdeka Terverifikasi untuk Pendidik Indonesia
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="license-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Masukkan Kunci Lisensi / Token
              </label>
              <div className="relative">
                <input
                  id="license-input"
                  type="text"
                  value={licenseKey}
                  onChange={(e) => {
                    setLicenseKey(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Contoh: MAJ-XXXX-XXXX-XXXX"
                  className="w-full pl-3.5 pr-10 py-3 text-sm font-mono uppercase bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  autoFocus
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                Format: diawali awalan <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700 font-semibold font-mono">MAJ-</code> atau 10+ karakter.
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isActivating}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-50"
            >
              {isActivating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Memverifikasi Lisensi...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Aktivasi & Masuk ke Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Helper */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 mb-2">
              Belum memiliki lisensi? Coba lisensi aktivasi demo berikut:
            </p>
            <button
              type="button"
              onClick={handleUseDemoKey}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Gunakan Kunci Demo: MAJ-GURU-MERDEKA-2025</span>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tersimpan aman di peramban lokal (100% Client-Side Privacy)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
