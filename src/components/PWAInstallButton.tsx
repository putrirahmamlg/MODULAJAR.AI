import React, { useState } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ variant?: 'nav' | 'hero' }> = ({ variant = 'nav' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed, hide
  if (isInstalled) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        PWA Terpasang
      </span>
    );
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (variant === 'hero') {
      return (
        <button
          onClick={install}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition cursor-pointer text-sm"
        >
          <Download className="w-4 h-4" />
          Install Aplikasi ke Perangkat (PWA)
        </button>
      );
    }

    return (
      <button
        onClick={install}
        className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition cursor-pointer"
        title="Pasang aplikasi di komputer atau HP Anda"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install PWA</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-blue-600" />
          <span>Install di iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <Download className="w-4 h-4" />
                  </span>
                  Pasang di iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50">
                  <div className="p-1 bg-white rounded shadow-xs text-blue-600 shrink-0 mt-0.5">
                    <Share className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Langkah 1:</span> Tekan tombol <strong>Bagikan (Share)</strong> di bilah navigasi bawah Safari.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50">
                  <div className="p-1 bg-white rounded shadow-xs text-blue-600 shrink-0 mt-0.5">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Langkah 2:</span> Gulir ke bawah lalu pilih opsi <strong>Tambah ke Layar Utama (Add to Home Screen)</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-blue-50 text-blue-800">
                  <span className="text-xs">
                    Setelah terpasang, ModulAjar.AI dapat dibuka langsung seperti aplikasi asli tanpa bilah alamat browser.
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
