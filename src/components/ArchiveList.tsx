import React, { useState } from 'react';
import { 
  FolderArchive, 
  Search, 
  FileDown, 
  Eye, 
  Trash2, 
  Calendar, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { SavedModule } from '../types';
import { StorageService } from '../services/storage';
import { exportModuleToWord } from '../services/wordExport';

interface ArchiveListProps {
  archives: SavedModule[];
  onSelectModule: (module: SavedModule) => void;
  onRefreshArchives: () => void;
}

export const ArchiveList: React.FC<ArchiveListProps> = ({
  archives,
  onSelectModule,
  onRefreshArchives,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [moduleToDelete, setModuleToDelete] = useState<SavedModule | null>(null);

  const filteredArchives = archives.filter((m) => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.mataPelajaran.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.topik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.kelas && m.kelas.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPhase = selectedPhase === 'all' || m.fase.includes(selectedPhase);
    return matchesSearch && matchesPhase;
  });

  const handleDeleteConfirm = () => {
    if (!moduleToDelete) return;
    StorageService.deleteArchive(moduleToDelete.id);
    setModuleToDelete(null);
    onRefreshArchives();
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FolderArchive className="w-5 h-5 text-blue-600" />
              <span>Arsip Perangkat Ajar Lokal</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tersimpan aman di peramban lokal perangkat Anda ({archives.length} modul ajar)
            </p>
          </div>

          {/* Search Bar & Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari mapel, topik, kelas..."
                className="pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 w-full sm:w-60"
              />
            </div>

            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className="py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              <option value="all">Semua Fase</option>
              <option value="Fase Fondasi">Fase Fondasi (PAUD)</option>
              <option value="Fase A">Fase A (SD 1-2)</option>
              <option value="Fase B">Fase B (SD 3-4)</option>
              <option value="Fase C">Fase C (SD 5-6)</option>
              <option value="Fase D">Fase D (SMP)</option>
              <option value="Fase E">Fase E (SMA 10)</option>
              <option value="Fase F">Fase F (SMA 11-12)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Module Cards */}
      {filteredArchives.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Belum ada modul yang cocok</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? 'Tidak ditemukan modul dengan kata kunci tersebut. Coba ubah kata kunci atau filter fase.'
              : 'Belum ada modul yang tersimpan. Mulai buat modul pertama Anda di tab "Buat Modul Baru".'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArchives.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100 truncate">
                    {module.mataPelajaran}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    {formatDate(module.createdAt)}
                  </span>
                </div>

                {/* Title & Topic */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {module.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                  {module.topik}
                </p>

                {/* Info tags */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-[11px] text-slate-600">
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                    {module.fase.split('(')[0].trim()}
                  </span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                    {module.kelas}
                  </span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium truncate max-w-[150px]">
                    {module.modelPembelajaran.split('(')[0].trim()}
                  </span>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setModuleToDelete(module)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  title="Hapus dari arsip"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => exportModuleToWord(module)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition cursor-pointer"
                    title="Unduh format Word (.doc)"
                  >
                    <FileDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectModule(module)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Buka & Edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {moduleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 text-center">Hapus Modul Ajar?</h3>
            <p className="mt-1.5 text-xs text-slate-600 text-center">
              Modul "<strong>{moduleToDelete.title}</strong>" akan dihapus dari penyimpanan browser lokal. Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => setModuleToDelete(null)}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white shadow-xs transition cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
