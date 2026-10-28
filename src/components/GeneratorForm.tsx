import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Clock, 
  GraduationCap, 
  Key, 
  School, 
  Check, 
  ChevronRight, 
  Lightbulb,
  FileText,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { 
  ModuleInputData, 
  FaseKurikulum, 
  ModelPembelajaran, 
  ProfilPelajarPancasila, 
  TeacherProfile 
} from '../types';
import { StorageService } from '../services/storage';

interface GeneratorFormProps {
  onGenerate: (data: ModuleInputData) => void;
  isLoading: boolean;
  teacherProfile: TeacherProfile;
}

const MATA_PELAJARAN_LIST = [
  'Ilmu Pengetahuan Alam dan Sosial (IPAS)',
  'Matematika',
  'Bahasa Indonesia',
  'Bahasa Inggris',
  'Pendidikan Pancasila',
  'Pendidikan Agama Islam dan Budi Pekerti',
  'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)',
  'Informatika',
  'Seni Rupa',
  'Seni Musik',
  'Fisika',
  'Biologi',
  'Kimia',
  'Sejarah',
  'Geografi',
  'Ekonomi',
  'Sosiologi',
  'Lainnya (Tulis Sendiri)'
];

const FASE_OPTIONS: { fase: FaseKurikulum; classes: string[]; desc: string }[] = [
  { fase: 'Fase Fondasi (PAUD / TK)', classes: ['Kelompok A (Usia 4-5)', 'Kelompok B (Usia 5-6)'], desc: 'PAUD / TK' },
  { fase: 'Fase A (Kelas 1 - 2 SD)', classes: ['Kelas 1 SD', 'Kelas 2 SD'], desc: 'SD Kelas 1-2' },
  { fase: 'Fase B (Kelas 3 - 4 SD)', classes: ['Kelas 3 SD', 'Kelas 4 SD'], desc: 'SD Kelas 3-4' },
  { fase: 'Fase C (Kelas 5 - 6 SD)', classes: ['Kelas 5 SD', 'Kelas 6 SD'], desc: 'SD Kelas 5-6' },
  { fase: 'Fase D (Kelas 7 - 9 SMP)', classes: ['Kelas 7 SMP', 'Kelas 8 SMP', 'Kelas 9 SMP'], desc: 'SMP Kelas 7-9' },
  { fase: 'Fase E (Kelas 10 SMA/SMK)', classes: ['Kelas 10 SMA/SMK'], desc: 'SMA/SMK Kelas 10' },
  { fase: 'Fase F (Kelas 11 - 12 SMA/SMK)', classes: ['Kelas 11 SMA/SMK', 'Kelas 12 SMA/SMK'], desc: 'SMA/SMK Kelas 11-12' },
];

const MODEL_PEMBELAJARAN_LIST: { model: ModelPembelajaran; desc: string }[] = [
  { model: 'Problem Based Learning (PBL)', desc: 'Orientasi masalah nyata, penyelidikan kelompok, dan pemecahan masalah otentik' },
  { model: 'Project Based Learning (PjBL)', desc: 'Penyusunan proyek nyata, karya kontekstual, dan unjuk performa produk' },
  { model: 'Discovery Learning', desc: 'Stimulasi rasa ingin tahu, pengumpulan data, pembuktian, dan penarikan kesimpulan mandiri' },
  { model: 'Inquiry Learning', desc: 'Penyelidikan saintifik mendalam berbasis hipotesis dan eksperimen terarah' },
  { model: 'Teaching at The Right Level (TaRL)', desc: 'Pengelompokan instruksi berdasarkan tingkat capaian dan kompetensi aktual murid' },
  { model: 'Culturally Responsive Teaching (CRT)', desc: 'Mengintegrasikan kearifan lokal budaya Indonesia dalam studi materi ajar' },
  { model: 'Pembelajaran Berdiferensiasi', desc: 'Fokus adaptasi diferensiasi konten, proses, dan produk sesuai profil belajar siswa' },
];

const PROFIL_PANCASILA_LIST: { id: ProfilPelajarPancasila; label: string }[] = [
  { id: 'Beriman, Bertakwa kepada Tuhan YME, & Berakhlak Mulia', label: 'Beriman & Berakhlak Mulia' },
  { id: 'Berkebinekaan Global', label: 'Berkebinekaan Global' },
  { id: 'Gotong Royong', label: 'Gotong Royong' },
  { id: 'Mandiri', label: 'Mandiri' },
  { id: 'Bernalar Kritis', label: 'Bernalar Kritis' },
  { id: 'Kreatif', label: 'Kreatif' },
];

const TOPIC_SUGGESTIONS: Record<string, string[]> = {
  'Ilmu Pengetahuan Alam dan Sosial (IPAS)': [
    'Siklus Air dan Ekosistem Lingkungan Hidup',
    'Bagian Tubuh Tumbuhan dan Fungsinya',
    'Perubahan Bentuk Energi di Sekitar Kita',
    'Keragaman Budaya dan Kearifan Lokal Daerahku'
  ],
  'Matematika': [
    'Pecahan Senilai dan Operasi Penjumlahan Pecahan',
    'Pengukuran Luas dan Keliling Bangun Datar Sederhana',
    'Penyajian Data Menggunakan Diagram Batang',
    'Operasi Hitung Perkalian dan Pembagian Bilangan Cacah'
  ],
  'Bahasa Indonesia': [
    'Teks Eksplanasi tentang Fenomena Alam Sekitar',
    'Menulis Cerita Narasi Pendek dengan Kosakata Baku',
    'Menganalisis Ide Pokok dan Informasi Tersurat dalam Paragraf',
    'Teks Prosedur: Cara Membuat Makanan Khas Tradisional'
  ],
  'Pendidikan Pancasila': [
    'Penerapan Nilai-Nilai Sila Pancasila dalam Kehidupan Sehari-hari',
    'Menghargai Keberagaman Suku dan Budaya Bangsa',
    'Hak dan Kewajiban sebagai Warga Sekolah dan Rumah'
  ]
};

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  onGenerate,
  isLoading,
  teacherProfile
}) => {
  const [mataPelajaran, setMataPelajaran] = useState('Ilmu Pengetahuan Alam dan Sosial (IPAS)');
  const [customMapel, setCustomMapel] = useState('');
  const [fase, setFase] = useState<FaseKurikulum>('Fase B (Kelas 3 - 4 SD)');
  const [kelas, setKelas] = useState('Kelas 4 SD');
  const [topik, setTopik] = useState('Siklus Air dan Pengaruhnya terhadap Iklim Bumi');
  const [alokasiWaktu, setAlokasiWaktu] = useState('2 JP (2 x 35 Menit) / 1 Pertemuan');
  const [modelPembelajaran, setModelPembelajaran] = useState<ModelPembelajaran>('Problem Based Learning (PBL)');
  const [profilPancasila, setProfilPancasila] = useState<ProfilPelajarPancasila[]>([
    'Mandiri',
    'Bernalar Kritis',
    'Gotong Royong'
  ]);
  const [targetSiswa, setTargetSiswa] = useState('Peserta didik reguler/tipikal (disediakan akomodasi bimbingan diferensiasi)');
  const [saranaPrasarana, setSaranaPrasarana] = useState('LCD Proyektor/Media Gambar, Laptop, LKPD, Buku Guru & Siswa Kemendikbud');
  const [catatanKhusus, setCatatanKhusus] = useState('');
  
  // Teacher identity
  const [namaGuru, setNamaGuru] = useState(teacherProfile.namaGuru || '');
  const [nipGuru, setNipGuru] = useState(teacherProfile.nipGuru || '');
  const [namaSekolah, setNamaSekolah] = useState(teacherProfile.namaSekolah || '');
  const [tahunAjaran, setTahunAjaran] = useState(teacherProfile.tahunAjaran || '2025/2026');
  const [semester, setSemester] = useState<'Ganjil' | 'Genap'>(teacherProfile.semester || 'Ganjil');

  // API Key Toggle
  const [useCustomKey, setUseCustomKey] = useState(false);
  const [customKey, setCustomKey] = useState(StorageService.getCustomApiKey());
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Sync profile when updated
  useEffect(() => {
    if (teacherProfile.namaGuru && !namaGuru) setNamaGuru(teacherProfile.namaGuru);
    if (teacherProfile.nipGuru && !nipGuru) setNipGuru(teacherProfile.nipGuru);
    if (teacherProfile.namaSekolah && !namaSekolah) setNamaSekolah(teacherProfile.namaSekolah);
  }, [teacherProfile]);

  // Update classes when Fase changes
  const currentFaseOption = FASE_OPTIONS.find((f) => f.fase === fase) || FASE_OPTIONS[1];
  useEffect(() => {
    if (!currentFaseOption.classes.includes(kelas)) {
      setKelas(currentFaseOption.classes[0]);
    }
  }, [fase]);

  const togglePancasila = (item: ProfilPelajarPancasila) => {
    if (profilPancasila.includes(item)) {
      setProfilPancasila(profilPancasila.filter((p) => p !== item));
    } else {
      setProfilPancasila([...profilPancasila, item]);
    }
  };

  const handleQuickTopic = (suggestion: string) => {
    setTopik(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMapel = mataPelajaran === 'Lainnya (Tulis Sendiri)' ? (customMapel.trim() || 'Mata Pelajaran Umum') : mataPelajaran;

    // Save custom key if enabled
    if (useCustomKey && customKey.trim()) {
      StorageService.saveCustomApiKey(customKey.trim());
    }

    onGenerate({
      mataPelajaran: finalMapel,
      fase,
      kelas,
      topik: topik.trim(),
      alokasiWaktu,
      modelPembelajaran,
      profilPancasila,
      targetSiswa,
      saranaPrasarana,
      namaGuru: namaGuru.trim(),
      nipGuru: nipGuru.trim(),
      namaSekolah: namaSekolah.trim(),
      tahunAjaran,
      semester,
      catatanKhusus: catatanKhusus.trim() || undefined,
      customApiKey: useCustomKey ? customKey.trim() : undefined
    });
  };

  const suggestions = TOPIC_SUGGESTIONS[mataPelajaran] || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card 1: Informasi Mata Pelajaran & Kurikulum */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Kurikulum & Sasaran Belajar</h3>
            <p className="text-xs text-slate-500">Pilih mata pelajaran, fase tingkatan, dan topik inti yang akan diajarkan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Mata Pelajaran */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mata Pelajaran <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={mataPelajaran}
                onChange={(e) => setMataPelajaran(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none pr-10 cursor-pointer"
              >
                {MATA_PELAJARAN_LIST.map((mapel) => (
                  <option key={mapel} value={mapel}>{mapel}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {mataPelajaran === 'Lainnya (Tulis Sendiri)' && (
              <div className="mt-2.5">
                <input
                  type="text"
                  value={customMapel}
                  onChange={(e) => setCustomMapel(e.target.value)}
                  placeholder="Ketik nama mata pelajaran atau muatan lokal..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            )}
          </div>

          {/* Fase */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Fase Kurikulum Merdeka <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={fase}
                onChange={(e) => setFase(e.target.value as FaseKurikulum)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none pr-10 cursor-pointer"
              >
                {FASE_OPTIONS.map((opt) => (
                  <option key={opt.fase} value={opt.fase}>
                    {opt.fase}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="mt-1 text-xs text-slate-500">Tingkatan: {currentFaseOption.desc}</p>
          </div>

          {/* Kelas */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Kelas / Rombel <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none pr-10 cursor-pointer"
              >
                {currentFaseOption.classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Topik / Materi Pokok */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Topik / Materi Pokok <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={topik}
              onChange={(e) => setTopik(e.target.value)}
              placeholder="Contoh: Siklus Air dan Pelestarian Lingkungan Hidup"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />

            {/* Quick Topic Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-amber-500" /> Contoh Topik:
                </span>
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickTopic(item)}
                    className="text-[11px] bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-2 py-0.5 rounded-md border border-slate-200 transition cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Alokasi Waktu */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Alokasi Waktu & Jumlah Pertemuan <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={alokasiWaktu}
                onChange={(e) => setAlokasiWaktu(e.target.value)}
                placeholder="Contoh: 2 JP (2 x 35 Menit) / 1 Pertemuan"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Model Pembelajaran */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Model Pembelajaran <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={modelPembelajaran}
                onChange={(e) => setModelPembelajaran(e.target.value as ModelPembelajaran)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none pr-10 cursor-pointer"
              >
                {MODEL_PEMBELAJARAN_LIST.map((m) => (
                  <option key={m.model} value={m.model}>
                    {m.model}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="mt-1 text-xs text-slate-500 truncate">
              {MODEL_PEMBELAJARAN_LIST.find((m) => m.model === modelPembelajaran)?.desc}
            </p>
          </div>
        </div>

        {/* Profil Pelajar Pancasila Selection */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Dimensi Profil Pelajar Pancasila (PPP)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PROFIL_PANCASILA_LIST.map((item) => {
              const selected = profilPancasila.includes(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => togglePancasila(item.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium text-left transition cursor-pointer ${
                    selected
                      ? 'bg-blue-50/80 border-blue-300 text-blue-900 shadow-2xs'
                      : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100/60'
                  }`}
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                    selected ? 'bg-blue-600 text-white' : 'border border-slate-300 bg-white'
                  }`}>
                    {selected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card 2: Identitas Pendidik & Sekolah */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Identitas Guru & Satuan Pendidikan</h3>
            <p className="text-xs text-slate-500">Otomatis dicantumkan pada kop surat dan lembar tanda tangan dokumen</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Guru Lengkap & Gelar</label>
            <input
              type="text"
              value={namaGuru}
              onChange={(e) => setNamaGuru(e.target.value)}
              placeholder="Contoh: Siti Rahmawati, S.Pd."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">NIP / NUPTK Guru</label>
            <input
              type="text"
              value={nipGuru}
              onChange={(e) => setNipGuru(e.target.value)}
              placeholder="Contoh: 19880415 201201 2 004"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Satuan Pendidikan (Sekolah)</label>
            <input
              type="text"
              value={namaSekolah}
              onChange={(e) => setNamaSekolah(e.target.value)}
              placeholder="Contoh: SD Negeri Merdeka 01"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun Ajaran</label>
            <input
              type="text"
              value={tahunAjaran}
              onChange={(e) => setTahunAjaran(e.target.value)}
              placeholder="2025/2026"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Semester</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value as 'Ganjil' | 'Genap')}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              <option value="Ganjil">Semester Ganjil (1)</option>
              <option value="Genap">Semester Genap (2)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Peserta Didik</label>
            <input
              type="text"
              value={targetSiswa}
              onChange={(e) => setTargetSiswa(e.target.value)}
              placeholder="Siswa reguler / tipikal"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Collapsible Advanced Preferences */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Sembunyikan Opsi Tambahan' : 'Tampilkan Opsi Tambahan (Sarana, Catatan Khusus)'}</span>
          </button>

          {showAdvanced && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sarana & Prasarana</label>
                <input
                  type="text"
                  value={saranaPrasarana}
                  onChange={(e) => setSaranaPrasarana(e.target.value)}
                  placeholder="LCD, Bahan Tayang, Buku Siswa..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan Khusus Instruksional</label>
                <input
                  type="text"
                  value={catatanKhusus}
                  onChange={(e) => setCatatanKhusus(e.target.value)}
                  placeholder="Contoh: Sertakan ice breaking kearifan lokal..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card 3: AI Configuration & Custom API Key Toggle */}
      <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-slate-50 rounded-2xl border border-blue-200/80 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">Mesin AI Gemini Kurikulum Merdeka</h4>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Siap Pakai
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Model: <span className="font-mono font-semibold text-blue-700">gemini-3.8-flash</span> • Guru tidak wajib isi API Key
              </p>
            </div>
          </div>

          <label className="inline-flex items-center gap-2 cursor-pointer self-start sm:self-auto bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <input
              type="checkbox"
              checked={useCustomKey}
              onChange={(e) => setUseCustomKey(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4.5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-blue-600 relative"></div>
            <span className="text-xs font-semibold text-slate-700">Gunakan API Key Sendiri (Opsional)</span>
          </label>
        </div>

        {useCustomKey && (
          <div className="mt-4 pt-4 border-t border-blue-100 animate-in fade-in duration-200">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Google Gemini API Key</span>
              <a 
                href="https://aistudio.google.com/apikey" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[11px] text-blue-600 hover:underline"
              >
                Dapatkan API Key Gratis di Google AI Studio &rarr;
              </a>
            </label>
            <div className="relative">
              <input
                type="password"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Kunci API disimpan hanya di memori browser lokal Anda dan tidak dikirimkan ke server lain.
            </p>
          </div>
        )}
      </div>

      {/* Submit Action Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading || !topik.trim()}
          className="w-full group relative flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Sedang Merancang Modul Ajar Lengkap...</span>
            </div>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>Generate Modul Ajar Kurikulum Merdeka Instan</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
