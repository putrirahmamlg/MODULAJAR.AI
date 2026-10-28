import React from 'react';
import { 
  BookOpen, 
  Key, 
  Download, 
  Layers, 
  HelpCircle, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  Smartphone
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export const GuideTab: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-blue-100 backdrop-blur-xs mb-3 border border-white/20">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            Panduan Resmi Guru Merdeka
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Panduan Lengkap Penyusunan Modul Ajar & Penggunaan ModulAjar.AI
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-blue-100 leading-relaxed">
            Pelajari standar BSKAP Kemendikbudristek, sintaks model pembelajaran, panduan integrasi Gemini API gratis, serta cara memasang aplikasi PWA ini di HP dan laptop Anda.
          </p>
        </div>
      </div>

      {/* Guide 1: Sistematika Modul Ajar Kurikulum Merdeka */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-5">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">1. Struktur Baku Modul Ajar Kurikulum Merdeka</h3>
            <p className="text-xs text-slate-500">Sesuai Panduan Pembelajaran dan Asesmen (PPA) Kemendikbudristek</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1.5 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">I</span>
              Informasi Umum
            </h4>
            <ul className="space-y-1 text-slate-600 list-disc list-inside">
              <li>Identitas Modul (Nama Guru, Satuan Pendidikan, Fase/Kelas, JP)</li>
              <li>Kompetensi Awal (Prasyarat materi)</li>
              <li>Profil Pelajar Pancasila (6 Dimensi Utama)</li>
              <li>Sarana dan Prasarana pendukung</li>
              <li>Target Peserta Didik (Reguler/Hambatan/Cerdas Istimewa)</li>
              <li>Model & Metode Pembelajaran aktif</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1.5 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">II</span>
              Komponen Inti
            </h4>
            <ul className="space-y-1 text-slate-600 list-disc list-inside">
              <li>Tujuan Pembelajaran (TP) & Kriteria KKTP</li>
              <li>Pemahaman Bermakna bagi kehidupan nyata</li>
              <li>Pertanyaan Pemantik pemantik nalar kritis</li>
              <li>Kegiatan Pembelajaran (Pendahuluan, Inti Diferensiasi, Penutup)</li>
              <li>Refleksi Guru dan Peserta Didik</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1.5 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">III</span>
              Asesmen Pembelajaran
            </h4>
            <ul className="space-y-1 text-slate-600 list-disc list-inside">
              <li>Asesmen Diagnostik (Pemetaan awal kognitif/non-kognitif)</li>
              <li>Asesmen Formatif (Observasi sikap & unjuk kerja proses)</li>
              <li>Asesmen Sumatif (Soal evaluasi akhir, rubrik, dan kunci)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1.5 text-sm flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">IV</span>
              Pengayaan, Remedial & Lampiran
            </h4>
            <ul className="space-y-1 text-slate-600 list-disc list-inside">
              <li>Rencana Program Pengayaan & Remedial</li>
              <li>Lembar Kerja Peserta Didik (LKPD) siap cetak</li>
              <li>Bahan Bacaan Pendidik dan Peserta Didik</li>
              <li>Glosarium dan Daftar Pustaka Kemendikbudristek</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Guide 2: Cara Mendapatkan Google Gemini API Key Gratis */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-5">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">2. Cara Mendapatkan Gemini API Key Gratis</h3>
            <p className="text-xs text-slate-500">Kunci API gratis resmi dari Google untuk menghasilkan modul tanpa batas</p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs text-slate-600">
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <div>
              Buka situs <strong>Google AI Studio</strong> di alamat:{' '}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold underline inline-flex items-center gap-1"
              >
                aistudio.google.com/apikey <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <div>
              Masuk menggunakan <strong>Akun Google</strong> Anda (akun Gmail pribadi atau akun belajar.id).
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <div>
              Klik tombol biru <strong>"Create API key"</strong> atau <strong>"Get API key"</strong>.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
            <div>
              Salin kode kunci yang diawali dengan <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-blue-700">AIzaSy...</code>, lalu tempelkan di tab <strong>Pengaturan</strong> atau di panel formulir ModulAjar.AI.
            </div>
          </div>
        </div>

        <div className="mt-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Paket gratis Google AI Studio mencakup hingga puluhan generasi dokumen per hari secara cuma-cuma tanpa kartu kredit.</span>
        </div>
      </div>

      {/* Guide 3: PWA Installation Guide */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">3. Cara Memasang Aplikasi di HP & Laptop (PWA)</h3>
              <p className="text-xs text-slate-500">Buka ModulAjar.AI langsung dari layar utama tanpa membuka browser</p>
            </div>
          </div>
          <PWAInstallButton variant="nav" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">Android & Google Chrome (PC/Mac)</h4>
            <p className="leading-relaxed">
              Tekan tombol <strong>"Install PWA"</strong> di bagian atas navigasi, atau buka menu tiga titik di Chrome lalu pilih <strong>"Instal ModulAjar.AI"</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">iPhone & iPad (Safari)</h4>
            <p className="leading-relaxed">
              Buka aplikasi di Safari &rarr; Ketuk tombol <strong>Bagikan (Share)</strong> di bagian bawah &rarr; Gulir lalu pilih <strong>Tambah ke Layar Utama (Add to Home Screen)</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
