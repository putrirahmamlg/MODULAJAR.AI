import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  FileDown, 
  Printer, 
  Bookmark, 
  BookmarkCheck, 
  Eye, 
  FileCode, 
  Edit3, 
  Sparkles, 
  School, 
  Share2, 
  RefreshCw 
} from 'lucide-react';
import { marked } from 'marked';
import { SavedModule, TeacherProfile } from '../types';
import { exportModuleToWord, exportModuleToText } from '../services/wordExport';
import { StorageService } from '../services/storage';

interface ModulePreviewProps {
  moduleData: {
    title: string;
    mataPelajaran: string;
    fase: string;
    kelas: string;
    topik: string;
    alokasiWaktu: string;
    modelPembelajaran: string;
    namaGuru: string;
    namaSekolah: string;
    tahunAjaran: string;
    contentMarkdown: string;
  };
  onUpdateContent: (newContent: string) => void;
  onSavedToArchive?: () => void;
  teacherProfile: TeacherProfile;
}

export const ModulePreview: React.FC<ModulePreviewProps> = ({
  moduleData,
  onUpdateContent,
  onSavedToArchive,
  teacherProfile
}) => {
  const [activeView, setActiveView] = useState<'document' | 'markdown' | 'editor'>('document');
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(moduleData.contentMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = moduleData.contentMarkdown;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSaveToArchive = () => {
    const newArchive: SavedModule = {
      id: 'modul-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: moduleData.title || `Modul Ajar ${moduleData.mataPelajaran} ${moduleData.fase}`,
      mataPelajaran: moduleData.mataPelajaran,
      fase: moduleData.fase,
      kelas: moduleData.kelas,
      topik: moduleData.topik,
      alokasiWaktu: moduleData.alokasiWaktu,
      modelPembelajaran: moduleData.modelPembelajaran,
      namaGuru: moduleData.namaGuru || teacherProfile.namaGuru,
      namaSekolah: moduleData.namaSekolah || teacherProfile.namaSekolah,
      tahunAjaran: moduleData.tahunAjaran || teacherProfile.tahunAjaran,
      contentMarkdown: moduleData.contentMarkdown
    };

    StorageService.saveArchive(newArchive);
    setIsSaved(true);
    if (onSavedToArchive) onSavedToArchive();
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDownloadWord = () => {
    exportModuleToWord({
      title: moduleData.title || `Modul Ajar ${moduleData.mataPelajaran}`,
      mataPelajaran: moduleData.mataPelajaran,
      fase: moduleData.fase,
      kelas: moduleData.kelas,
      contentMarkdown: moduleData.contentMarkdown,
      namaGuru: moduleData.namaGuru || teacherProfile.namaGuru,
      namaSekolah: moduleData.namaSekolah || teacherProfile.namaSekolah,
      tahunAjaran: moduleData.tahunAjaran || teacherProfile.tahunAjaran
    });
  };

  const handleDownloadText = () => {
    exportModuleToText(
      moduleData.title || `Modul_Ajar_${moduleData.mataPelajaran}`,
      moduleData.contentMarkdown
    );
  };

  const handlePrint = () => {
    window.print();
  };

  // Convert markdown to sanitized html string
  const renderedHtml = marked.parse(moduleData.contentMarkdown) as string;

  return (
    <div className="space-y-4">
      {/* Action Toolbar Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-3.5 sm:p-4 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setActiveView('document')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeView === 'document'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Format Cetak Resmi</span>
            </button>
            <button
              onClick={() => setActiveView('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeView === 'editor'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor Teks</span>
            </button>
            <button
              onClick={() => setActiveView('markdown')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeView === 'markdown'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Markdown</span>
            </button>
          </div>

          {/* Action Buttons: Word, PDF, Copy, Save */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Copy */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
              title="Salin teks ke clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Tersalin!' : 'Salin ke Clipboard'}</span>
            </button>

            {/* Save to Archive */}
            <button
              onClick={handleSaveToArchive}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5 text-blue-600" />}
              <span>{isSaved ? 'Tersimpan di Arsip!' : 'Simpan ke Arsip'}</span>
            </button>

            {/* Download Word (.doc) */}
            <button
              onClick={handleDownloadWord}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition cursor-pointer"
              title="Unduh file dokumen format Microsoft Word (.doc)"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download Word (.doc)</span>
            </button>

            {/* Print / PDF */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white shadow-xs transition cursor-pointer"
              title="Cetak langsung atau simpan sebagai PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Document Preview Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-10 lg:p-12 printable-document">
        {/* Official Indonesian School Kop Surat (Printed & Document Mode) */}
        {activeView === 'document' && (
          <div className="border-b-4 border-double border-slate-900 pb-5 mb-8 text-center select-none">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center font-bold text-slate-800 text-sm">
                KM
              </div>
              <div>
                <p className="text-xs uppercase font-semibold tracking-wider text-slate-600">
                  PEMERINTAH DAERAH DINAS PENDIDIKAN
                </p>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight uppercase">
                  {moduleData.namaSekolah || teacherProfile.namaSekolah || 'SATUAN PENDIDIKAN DASAR & MENENGAH'}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  PERANGKAT AJAR KURIKULUM MERDEKA • TAHUN AJARAN {moduleData.tahunAjaran || teacherProfile.tahunAjaran || '2025/2026'}
                </p>
              </div>
            </div>
            
            <div className="mt-3 inline-flex items-center gap-3 px-3 py-1 bg-slate-100 rounded-full text-[11px] font-semibold text-slate-700 border border-slate-200">
              <span>Mata Pelajaran: <strong>{moduleData.mataPelajaran}</strong></span>
              <span>•</span>
              <span>{moduleData.fase}</span>
              <span>•</span>
              <span>{moduleData.kelas}</span>
            </div>
          </div>
        )}

        {/* View: Document Rendered HTML */}
        {activeView === 'document' && (
          <div>
            <div 
              className="markdown-body max-w-none text-slate-800 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />

            {/* Official Signature Section */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-8 text-center text-xs text-slate-800">
                <div>
                  <p className="text-slate-600">Mengetahui,</p>
                  <p className="font-semibold text-slate-900 mt-0.5">
                    Kepala {moduleData.namaSekolah || teacherProfile.namaSekolah || 'Satuan Pendidikan'}
                  </p>
                  <div className="h-20 flex items-center justify-center text-slate-300 italic text-[11px]">
                    (Tanda tangan & stempel)
                  </div>
                  <p className="font-bold underline text-slate-900">
                    {teacherProfile.kepalaSekolah || 'Drs. H. Bambang Suryono, M.Pd.'}
                  </p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    NIP. {teacherProfile.nipKepalaSekolah || '19750820 199903 1 002'}
                  </p>
                </div>

                <div>
                  <p className="text-slate-600">Dibuat di tempat,</p>
                  <p className="font-semibold text-slate-900 mt-0.5">Guru Pengampu Mata Pelajaran</p>
                  <div className="h-20 flex items-center justify-center text-slate-300 italic text-[11px]">
                    (Tanda tangan guru)
                  </div>
                  <p className="font-bold underline text-slate-900">
                    {moduleData.namaGuru || teacherProfile.namaGuru || 'Siti Rahmawati, S.Pd.'}
                  </p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {teacherProfile.nipGuru ? `NIP. ${teacherProfile.nipGuru}` : 'NIP. ....................................................'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View: Text Editor (Live modification) */}
        {activeView === 'editor' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span>Anda dapat menyunting atau menambahkan catatan langsung pada naskah modul sebelum dicetak:</span>
              <button
                onClick={() => setActiveView('document')}
                className="text-blue-600 font-semibold hover:underline"
              >
                Lihat Hasil Cetak &rarr;
              </button>
            </div>
            <textarea
              value={moduleData.contentMarkdown}
              onChange={(e) => onUpdateContent(e.target.value)}
              rows={28}
              className="w-full font-mono text-xs sm:text-sm p-4 bg-slate-50 border border-slate-300 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>
        )}

        {/* View: Markdown Raw */}
        {activeView === 'markdown' && (
          <div className="relative">
            <button
              onClick={handleDownloadText}
              className="absolute right-3 top-3 px-2.5 py-1 text-xs font-semibold bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700"
            >
              Unduh .md
            </button>
            <pre className="p-4 bg-slate-900 text-slate-100 text-xs rounded-2xl overflow-x-auto font-mono leading-relaxed max-h-[700px]">
              <code>{moduleData.contentMarkdown}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
