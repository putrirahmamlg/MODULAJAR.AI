import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  History,
  Layers,
  Award,
  Download,
  Lock
} from 'lucide-react';
import { Header } from './components/Header';
import { LicenseModal } from './components/LicenseModal';
import { GeneratorForm } from './components/GeneratorForm';
import { ModulePreview } from './components/ModulePreview';
import { ArchiveList } from './components/ArchiveList';
import { GuideTab } from './components/GuideTab';
import { SettingsTab } from './components/SettingsTab';
import { LoadingOverlay } from './components/LoadingOverlay';
import { AdminPortal } from './components/AdminPortal';
import { ModuleInputData, SavedModule, TeacherProfile } from './types';
import { StorageService } from './services/storage';
import { generateModulAjarAI } from './services/gemini';
import { useOnlineStatus } from './hooks/useOnlineStatus';

export default function App() {
  const isOnline = useOnlineStatus();

  // License state
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showAdminPortal, setShowAdminPortal] = useState(false);

  // App navigation
  const [activeTab, setActiveTab] = useState<'generator' | 'archive' | 'guide' | 'settings'>('generator');

  // Teacher profile & data
  const [profile, setProfile] = useState<TeacherProfile>(StorageService.getProfile());
  const [archives, setArchives] = useState<SavedModule[]>([]);

  // Generation state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Current active module in preview
  const [activeModule, setActiveModule] = useState<{
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
  } | null>(null);

  // Check license on initial mount
  useEffect(() => {
    // Check if opened with ?admin=true or #admin
    if (window.location.search.includes('admin=true') || window.location.hash.includes('admin')) {
      setShowAdminPortal(true);
    }

    const storedLicense = StorageService.getLicense();
    if (storedLicense && StorageService.isLicenseValid(storedLicense)) {
      setLicenseKey(storedLicense);
      setShowLicenseModal(false);
    } else {
      setShowLicenseModal(true);
    }

    // Load initial archives and default sample module
    const initialArchives = StorageService.getArchives();
    setArchives(initialArchives);
    if (initialArchives.length > 0) {
      const sample = initialArchives[0];
      setActiveModule({
        title: sample.title,
        mataPelajaran: sample.mataPelajaran,
        fase: sample.fase,
        kelas: sample.kelas,
        topik: sample.topik,
        alokasiWaktu: sample.alokasiWaktu,
        modelPembelajaran: sample.modelPembelajaran,
        namaGuru: sample.namaGuru,
        namaSekolah: sample.namaSekolah,
        tahunAjaran: sample.tahunAjaran,
        contentMarkdown: sample.contentMarkdown
      });
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLicenseSuccess = (key: string) => {
    setLicenseKey(key);
    setShowLicenseModal(false);
    showToast('Lisensi ModulAjar.AI berhasil diverifikasi!');
  };

  const handleResetLicense = () => {
    StorageService.removeLicense();
    setLicenseKey(null);
    setShowLicenseModal(true);
  };

  const handleClearArchives = () => {
    localStorage.removeItem('modulajar_archives');
    setArchives([]);
    setActiveModule(null);
    showToast('Seluruh arsip modul berhasil dibersihkan.');
  };

  const handleRefreshArchives = () => {
    setArchives(StorageService.getArchives());
  };

  const handleSelectModuleFromArchive = (module: SavedModule) => {
    setActiveModule({
      title: module.title,
      mataPelajaran: module.mataPelajaran,
      fase: module.fase,
      kelas: module.kelas,
      topik: module.topik,
      alokasiWaktu: module.alokasiWaktu,
      modelPembelajaran: module.modelPembelajaran,
      namaGuru: module.namaGuru,
      namaSekolah: module.namaSekolah,
      tahunAjaran: module.tahunAjaran,
      contentMarkdown: module.contentMarkdown
    });
    setActiveTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerate = async (inputData: ModuleInputData) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const resultMarkdown = await generateModulAjarAI(inputData, profile.apiKey);

      const title = `Modul Ajar ${inputData.mataPelajaran} - ${inputData.kelas} (${inputData.topik})`;
      const generated = {
        title,
        mataPelajaran: inputData.mataPelajaran,
        fase: inputData.fase,
        kelas: inputData.kelas,
        topik: inputData.topik,
        alokasiWaktu: inputData.alokasiWaktu,
        modelPembelajaran: inputData.modelPembelajaran,
        namaGuru: inputData.namaGuru || profile.namaGuru,
        namaSekolah: inputData.namaSekolah || profile.namaSekolah,
        tahunAjaran: inputData.tahunAjaran || profile.tahunAjaran,
        contentMarkdown: resultMarkdown
      };

      // Set to live preview
      setActiveModule(generated);

      // Automatically auto-save to local archive
      const newArchive: SavedModule = {
        id: 'modul-' + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...generated
      };
      StorageService.saveArchive(newArchive);
      setArchives(StorageService.getArchives());

      showToast('Modul Ajar berhasil digenerate & disimpan ke Arsip!');

      // Scroll to preview smoothly on smaller screens
      const previewElement = document.getElementById('preview-section');
      if (previewElement) {
        previewElement.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : String(err);
      setErrorMessage(errorStr);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* License Gate Modal */}
      <LicenseModal
        isOpen={showLicenseModal}
        onSuccess={handleLicenseSuccess}
      />

      {/* Loading Overlay with Rotating Educational Wisdom */}
      {isLoading && <LoadingOverlay />}

      {/* Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        archiveCount={archives.length}
        licenseKey={licenseKey}
        onOpenLicenseModal={() => setShowLicenseModal(true)}
      />

      {/* Offline Toast Banner */}
      {!isOnline && (
        <div className="bg-amber-500 text-white px-4 py-2 text-center text-xs font-semibold shadow-xs flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>Anda sedang dalam mode offline. Modul ajar yang tersimpan di arsip lokal tetap dapat diakses & diunduh.</span>
        </div>
      )}

      {/* Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block text-sm">Gagal Menghasilkan Modul:</span>
              <p className="mt-0.5">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-500 hover:text-rose-700 font-bold px-2 py-1"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Tab 1: Generator & Studio */}
        {activeTab === 'generator' && (
          <div className="space-y-8">
            {/* Hero / Quick Context */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                    Sesuai Standar BSKAP
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white backdrop-blur-xs">
                    Kurikulum Merdeka 2024/2025
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                  Generator Modul Ajar Cerdas untuk Guru Indonesia
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-blue-100 leading-relaxed max-w-2xl">
                  Rancang perangkat pembelajaran berdiferensiasi lengkap: Informasi Umum, Komponen Inti, Asesmen Diagnostik/Formatif/Sumatif, hingga Lembar Kerja Peserta Didik (LKPD) siap cetak dan ekspor ke Microsoft Word (.doc).
                </p>
              </div>

              {/* Background badge decoration */}
              <div className="absolute right-6 -bottom-8 opacity-10 pointer-events-none hidden md:block">
                <BookOpen className="w-64 h-64 text-white" />
              </div>
            </div>

            {/* Split Grid: Form (Left) & Live Preview (Right) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form */}
              <div className="xl:col-span-5 space-y-6">
                <GeneratorForm
                  onGenerate={handleGenerate}
                  isLoading={isLoading}
                  teacherProfile={profile}
                />
              </div>

              {/* Right Column: Preview & Document Output */}
              <div id="preview-section" className="xl:col-span-7 space-y-4">
                {activeModule ? (
                  <ModulePreview
                    moduleData={activeModule}
                    onUpdateContent={(newContent) => {
                      setActiveModule({ ...activeModule, contentMarkdown: newContent });
                    }}
                    onSavedToArchive={() => {
                      setArchives(StorageService.getArchives());
                      showToast('Modul berhasil diperbarui di arsip!');
                    }}
                    teacherProfile={profile}
                  />
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">Pratinjau Modul Ajar</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Silakan isi formulir di sebelah kiri dan klik tombol "Generate" untuk melihat dokumen perangkat ajar lengkap di sini.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Local Archives */}
        {activeTab === 'archive' && (
          <ArchiveList
            archives={archives}
            onSelectModule={handleSelectModuleFromArchive}
            onRefreshArchives={handleRefreshArchives}
          />
        )}

        {/* Tab 3: Kurikulum Merdeka & Help Guide */}
        {activeTab === 'guide' && <GuideTab />}

        {/* Tab 4: Settings & Teacher Profile */}
        {activeTab === 'settings' && (
          <SettingsTab
            profile={profile}
            licenseKey={licenseKey}
            onUpdateProfile={(updated) => {
              setProfile(updated);
              showToast('Profil guru berhasil diperbarui');
            }}
            onOpenLicenseModal={() => setShowLicenseModal(true)}
            onResetLicense={handleResetLicense}
            onClearArchives={handleClearArchives}
            onOpenAdminPortal={() => setShowAdminPortal(true)}
          />
        )}
      </main>

      {/* Admin License Generator Portal (PIN Protected) */}
      <AdminPortal
        isOpen={showAdminPortal}
        onClose={() => setShowAdminPortal(false)}
        onShowToast={showToast}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">ModulAjar.AI</span>
            <span>•</span>
            <span>Kurikulum Merdeka Indonesia</span>
            <span>•</span>
            <span className="text-blue-600 font-medium">PWA Ready & Offline Friendly</span>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-[11px] text-slate-400">
              Didedikasikan untuk kemajuan Guru & Pendidikan Indonesia.
            </p>
            <button
              onClick={() => setShowAdminPortal(true)}
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 transition cursor-pointer"
              title="Akses Portal Pemilik / Admin"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
