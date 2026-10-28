import React, { useState } from 'react';
import { 
  Settings, 
  Key, 
  User, 
  School, 
  ShieldCheck, 
  Check, 
  Save, 
  Trash2, 
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { TeacherProfile } from '../types';
import { StorageService } from '../services/storage';

interface SettingsTabProps {
  profile: TeacherProfile;
  licenseKey: string | null;
  onUpdateProfile: (profile: TeacherProfile) => void;
  onOpenLicenseModal: () => void;
  onResetLicense: () => void;
  onClearArchives: () => void;
  onOpenAdminPortal?: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  profile,
  licenseKey,
  onUpdateProfile,
  onOpenLicenseModal,
  onResetLicense,
  onClearArchives,
  onOpenAdminPortal
}) => {
  const [formData, setFormData] = useState<TeacherProfile>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveProfile(formData);
    if (formData.apiKey) {
      StorageService.saveCustomApiKey(formData.apiKey);
    }
    onUpdateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Pengaturan & Profil Pendidik</h2>
            <p className="text-xs text-slate-500">
              Kelola data identitas sekolah, konfigurasi Gemini API Key, dan status lisensi
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card: Gemini API Key */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Google Gemini API Key</h3>
                <p className="text-xs text-slate-500">Kunci akses untuk memproses permintaan kecerdasan buatan</p>
              </div>
            </div>
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
            >
              <span>Dapatkan Key</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Gemini API Key Pribadi
            </label>
            <input
              type="password"
              value={formData.apiKey || ''}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              placeholder="AIzaSy..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              Jika dikosongkan, aplikasi akan menggunakan kuota bawaan sistem bila tersedia.
            </p>
          </div>
        </div>

        {/* Card: Profil Guru & Kepala Sekolah */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Data Baku Satuan Pendidikan</h3>
              <p className="text-xs text-slate-500">Data ini akan otomatis mengisi formulir dan tanda tangan dokumen</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Guru Lengkap</label>
              <input
                type="text"
                value={formData.namaGuru}
                onChange={(e) => setFormData({ ...formData, namaGuru: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NIP Guru</label>
              <input
                type="text"
                value={formData.nipGuru}
                onChange={(e) => setFormData({ ...formData, nipGuru: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Satuan Pendidikan (Sekolah)</label>
              <input
                type="text"
                value={formData.namaSekolah}
                onChange={(e) => setFormData({ ...formData, namaSekolah: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Kepala Sekolah</label>
              <input
                type="text"
                value={formData.kepalaSekolah}
                onChange={(e) => setFormData({ ...formData, kepalaSekolah: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NIP Kepala Sekolah</label>
              <input
                type="text"
                value={formData.nipKepalaSekolah}
                onChange={(e) => setFormData({ ...formData, nipKepalaSekolah: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun Ajaran Aktif</label>
              <input
                type="text"
                value={formData.tahunAjaran}
                onChange={(e) => setFormData({ ...formData, tahunAjaran: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value as 'Ganjil' | 'Genap' })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Ganjil">Semester Ganjil (1)</option>
                <option value="Genap">Semester Genap (2)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-4 h-4" /> Perubahan profil berhasil disimpan!
            </span>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Profil & Pengaturan</span>
          </button>
        </div>
      </form>

      {/* Card: Status Lisensi & Reset Data */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-5">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Lisensi & Manajemen Data Lokal</h3>
            <p className="text-xs text-slate-500">Status verifikasi dan opsi pemeliharaan memori browser</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-5">
          <div>
            <span className="text-xs text-slate-500 font-medium">Kunci Lisensi Terpasang:</span>
            <p className="font-mono font-bold text-sm text-slate-800 mt-0.5">
              {licenseKey || 'Belum diaktifkan'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLicenseModal}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs hover:bg-slate-50 transition cursor-pointer"
            >
              Ubah Lisensi
            </button>
            <button
              onClick={onResetLicense}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs hover:bg-rose-50 transition cursor-pointer"
            >
              Hapus Lisensi
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Bersihkan semua arsip modul yang tersimpan di browser:</span>
          <button
            onClick={() => {
              if (window.confirm('Apakah Anda yakin ingin mengosongkan semua arsip modul lokal?')) {
                onClearArchives();
              }
            }}
            className="text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
          >
            Kosongkan Arsip
          </button>
        </div>
      </div>

      {/* Card Khusus: Portal Admin Penjual (PIN Protected) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-600 text-white text-xs">
              <Key className="w-3.5 h-3.5" />
            </span>
            <h4 className="text-sm font-bold">Portal Admin & Generator Lisensi</h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 uppercase">
              Khusus Pemilik
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-md">
            Punya pembeli baru via WhatsApp? Buka portal ini untuk menerbitkan lisensi unik dan menyalin draf pesan WhatsApp resmi siap kirim.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenAdminPortal}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition cursor-pointer shrink-0"
        >
          Buka Portal Admin
        </button>
      </div>
    </div>
  );
};
