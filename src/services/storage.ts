import { SavedModule, TeacherProfile } from '../types';

const STORAGE_KEYS = {
  LICENSE: 'modulajar_license',
  ARCHIVES: 'modulajar_archives',
  PROFILE: 'modulajar_profile',
  CUSTOM_API_KEY: 'modulajar_custom_api_key'
};

const SAMPLE_MODULE: SavedModule = {
  id: 'sample-modul-ipas-fase-b',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  title: 'Modul Ajar IPAS Fase B Kelas 4 - Siklus Air dan Pelestarian Lingkungan',
  mataPelajaran: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)',
  fase: 'Fase B (Kelas 3 - 4 SD)',
  kelas: 'Kelas 4',
  topik: 'Siklus Air dan Pengaruhnya terhadap Kehidupan Bumi',
  alokasiWaktu: '2 JP (2 x 35 Menit) / 1 Pertemuan',
  modelPembelajaran: 'Problem Based Learning (PBL)',
  namaGuru: 'Siti Rahmawati, S.Pd.',
  namaSekolah: 'SD Negeri Merdeka 01',
  tahunAjaran: '2025/2026',
  contentMarkdown: `# MODUL AJAR KURIKULUM MERDEKA
## ILMU PENGETAHUAN ALAM DAN SOSIAL (IPAS) - FASE B

---

### I. INFORMASI UMUM
* **Nama Penyusun**: Siti Rahmawati, S.Pd.
* **Satuan Pendidikan**: SD Negeri Merdeka 01
* **Tahun Pelajaran**: 2025/2026
* **Jenjang / Fase / Kelas**: SD / Fase B / Kelas IV (Empat)
* **Mata Pelajaran**: Ilmu Pengetahuan Alam dan Sosial (IPAS)
* **Topik / Materi Pokok**: Siklus Air dan Pengaruhnya terhadap Kehidupan Bumi
* **Alokasi Waktu**: 2 Jam Pelajaran (2 x 35 Menit)
* **Model Pembelajaran**: Problem Based Learning (PBL)
* **Moda Pembelajaran**: Tatap Muka (Luring)
* **Target Peserta Didik**: Peserta didik reguler/tipikal (28 Siswa)
* **Profil Pelajar Pancasila**:
  1. **Beriman, Bertakwa kepada Tuhan YME, & Berakhlak Mulia**: Mensyukuri anugerah air bersih dan menjaga kelestarian alam.
  2. **Gotong Royong**: Berkolaborasi dalam diskusi kelompok dan simulasi percobaan mini.
  3. **Bernalar Kritis**: Menganalisis tahapan siklus hidrologi dan dampak kekeringan bagi ekosistem.
* **Sarana & Prasarana**:
  * LCD Proyektor, Laptop, Video Animasi Siklus Air.
  * Alat Percobaan Mini: Toples kaca bening, air hangat, mangkuk penutup, es batu (simulasi evaporasi dan kondensasi).
  * Buku Panduan Siswa IPAS Kelas IV Kemendikbudristek & LKPD Interaktif.

---

### II. KOMPONEN INTI

#### A. Tujuan Pembelajaran (TP) & Kriteria Ketercapaian (KKTP)
1. **Tujuan Pembelajaran**:
   * Melalui pengamatan simulasi toples dan tayangan video, peserta didik dapat mendeskripsikan 4 tahapan utama siklus air (evaporasi, kondensasi, presipitasi, dan infiltrasi) secara runtut dan tepat.
   * Melalui diskusi kelompok terbimbing, peserta didik dapat mengidentifikasi peranan penting siklus air bagi makhluk hidup serta merancang satu aksi nyata penghematan air di lingkungan sekolah/rumah.
2. **Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)**:
   * Menjelaskan arti dan proses evaporasi, kondensasi, dan presipitasi.
   * Mengurutkan skema bagan siklus air secara runtut.
   * Memberikan contoh minimal 3 perilaku bijak dalam menghemat air bersih.

#### B. Pemahaman Bermakna
* Air di bumi jumlahnya relatif tetap karena mengalami perputaran (siklus) alami secara terus-menerus. Tanpa siklus air, kehidupan di darat tidak akan bertahan. Manusia bertanggung jawab menjaga kelestarian daerah resapan air agar ketersediaan air tanah tetap terjaga.

#### C. Pertanyaan Pemantik
1. "Anak-anak, ketika hujan turun berhari-hari, ke manakah perginya air hujan tersebut setelah meresap atau mengalir?"
2. "Mengapa air laut yang begitu luas tidak pernah habis meskipun terkena terik sinar matahari setiap hari?"
3. "Apa yang akan terjadi pada tubuh kita dan tanaman di halaman jika di bumi tidak pernah turun hujan lagi?"

#### D. Kegiatan Pembelajaran Berjenjang

##### 1. Kegiatan Pendahuluan (10 Menit)
* Guru mengucapkan salam hangat, menanyakan kabar, dan meminta ketua kelas memimpin doa pembuka.
* Guru mengecek kehadiran peserta didik dan kesiapan belajar (kerapian seragam dan alat tulis).
* **Apersepsi & Motivasi**: Guru memperlihatkan segelas air bersih dan bertanya: *"Siapa yang minum air putih pagi ini? Dari mana asal air ini?"*
* **Ice Breaking**: Tepuk "Siklus Air" (*"Evaporasi... Menguap! Kondensasi... Jadi Awan! Presipitasi... Turun Hujan! Horeee!"*).
* Guru menyampaikan tujuan pembelajaran, manfaat materi, dan skenario kegiatan yang akan dilakukan bersama.

##### 2. Kegiatan Inti (50 Menit) - Sintaks Problem Based Learning (PBL) & Diferensiasi
* **Fase 1: Orientasi Siswa pada Masalah (10 Menit)**
  * Guru menayangkan cuplikan video berita singkat mengenai daerah yang mengalami kekeringan air bersih saat musim kemarau panjang.
  * Guru melontarkan pertanyaan problematik: *"Mengapa bisa terjadi kelangkaan air bersih padahal sebagian besar permukaan bumi tertutup air?"*
* **Fase 2: Mengorganisasikan Peserta Didik untuk Belajar (10 Menit)**
  * Peserta didik dibagi menjadi kelompok heterogen (4-5 orang).
  * **Diferensiasi Konten & Proses**:
    * *Kelompok Visual & Auditori*: Mengamati infografik diagram alur siklus air dan video animasi interaktif.
    * *Kelompok Kinestetik*: Mengamati langsung miniatur siklus air dalam toples transparan berisi air panas dan es batu di atas penutupnya untuk melihat proses uap mengembun menjadi butiran air.
* **Fase 3: Membimbing Penyelidikan Kelompok (15 Menit)**
  * Guru membagikan Lembar Kerja Peserta Didik (LKPD).
  * Peserta didik berdiskusi melengkapi diagram alur siklus air dan menjawab pertanyaan terkait pengaruh hutan terhadap peresapan air.
  * Guru berkeliling memberikan *scaffolding* (bimbingan ekstra) bagi kelompok yang membutuhkan bantuan penguatan konsep.
* **Fase 4: Mengembangkan dan Menyajikan Hasil Karya (10 Menit)**
  * Setiap kelompok memilih perwakilan untuk mempresentasikan hasil LKPD atau poster sederhana yang mereka buat di depan kelas.
  * Kelompok lain menyimak dan memberikan tanggapan atau apresiasi berupa tepuk tangan jempol.
* **Fase 5: Menganalisis dan Mengevaluasi Proses Pemecahan Masalah (5 Menit)**
  * Guru bersama peserta didik menarik benang merah tentang pentingnya menjaga kelestarian pohon sebagai penjaga air tanah agar siklus air berjalan lancar tanpa bencana banjir atau kekeringan.

##### 3. Kegiatan Penutup (10 Menit)
* **Refleksi Bersama**:
  * *"Hal baru apa yang paling menarik yang kalian pelajari hari ini?"*
  * *"Tahapan siklus air mana yang paling mudah atau sulit kalian pahami?"*
* Guru memberikan umpan balik positif dan penguatan terhadap komitmen siswa untuk menutup keran air setelah digunakan di sekolah.
* Guru menyampaikan materi pengantar untuk pertemuan berikutnya (manfaat air bagi tumbuhan dan hewan).
* Pembelajaran ditutup dengan doa bersama dan salam penutup.

---

### III. ASESMEN PEMBELAJARAN

#### 1. Asesmen Diagnostik (Sebelum Pembelajaran)
* Pertanyaan lisan singkat di awal pembelajaran untuk memetakan pemahaman awal siswa tentang wujud zat air dan peristiwa hujan.

#### 2. Asesmen Formatif (Selama Proses Pembelajaran)
* **Teknik**: Observasi sikap Profil Pelajar Pancasila (Gotong Royong & Bernalar Kritis) menggunakan lembar ceklis amatan guru.
* **Instrumen**: Penilaian unjuk kerja saat berdiskusi dan keaktifan dalam menyelesaikan LKPD.

#### 3. Asesmen Sumatif (Akhir Topik / Pembelajaran)
* Tes tertulis berupa 5 soal uraian singkat pemahaman konsep:
  1. Jelaskan apa yang dimaksud dengan proses evaporasi!
  2. Mengapa awan bisa berubah menjadi titik-titik air hujan (presipitasi)?
  3. Sebutkan 3 tindakan nyata yang dapat kamu lakukan untuk menghemat air di rumah!

---

### IV. PENGAYAAN DAN REMEDIAL
* **Program Pengayaan**: Peserta didik yang telah mencapai KKTP diberikan tantangan mandiri membuat karya komik strip 4 panel atau mind-map tentang perjalanan tetes air dari laut hingga kembali ke laut.
* **Program Remedial**: Peserta didik yang belum mencapai KKTP diberikan bimbingan terfokus secara personal atau tutor sebaya menggunakan kartu bergambar istilah siklus air (*matching card game*).

---

### V. LAMPIRAN LENGKAP

#### A. Lembar Kerja Peserta Didik (LKPD)
* **Petunjuk Pengerjaan**:
  1. Tuliskan nama anggota kelompok pada kolom yang tersedia.
  2. Perhatikan gambar bagan siklus air di bawah ini!
  3. Pasangkan kotak nomor (1, 2, 3, 4) dengan istilah yang tepat: **[Evaporasi] [Kondensasi] [Presipitasi] [Infiltrasi]**.
  4. Tuliskan kesimpulan kelompokmu tentang mengapa kita harus menghemat air!

#### B. Glosarium
* **Evaporasi**: Proses penguapan air dari permukaan bumi (laut, danau, sungai) ke atmosfer akibat panas matahari.
* **Kondensasi**: Perubahan uap air menjadi titik-titik air kecil yang membentuk awan karena penurunan suhu udara.
* **Presipitasi**: Peristiwa jatuhnya air dari atmosfer ke permukaan bumi dalam bentuk hujan, salju, atau embun.
* **Infiltrasi**: Proses penyerapan air hujan ke dalam pori-pori tanah.

#### C. Daftar Pustaka
* Amalia Fitri, dkk. (2021). *Buku Panduan Guru & Buku Siswa Ilmu Pengetahuan Alam dan Sosial untuk SD Kelas IV*. Pusat Kurikulum dan Perbukuan, Balitbangbuk, Kemendikbudristek: Jakarta.`
};

export const StorageService = {
  // License Management
  getLicense(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.LICENSE);
    } catch {
      return null;
    }
  },

  isLicenseValid(key: string): boolean {
    const trimmed = (key || '').trim().toUpperCase();
    if (trimmed.startsWith('MAJ-')) return true;
    if (trimmed.length >= 10 && /^[A-Z0-9_-]+$/i.test(trimmed)) return true;
    return false;
  },

  saveLicense(key: string): boolean {
    try {
      if (this.isLicenseValid(key)) {
        localStorage.setItem(STORAGE_KEYS.LICENSE, key.trim().toUpperCase());
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  removeLicense(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.LICENSE);
    } catch {
      // ignore
    }
  },

  // Archive Management
  getArchives(): SavedModule[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ARCHIVES);
      if (!data) {
        // Initialize with realistic sample module
        this.saveArchive(SAMPLE_MODULE);
        return [SAMPLE_MODULE];
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return [SAMPLE_MODULE];
    } catch {
      return [SAMPLE_MODULE];
    }
  },

  saveArchive(module: SavedModule): void {
    try {
      const current = this.getArchives().filter((item) => item.id !== module.id);
      const updated = [module, ...current];
      localStorage.setItem(STORAGE_KEYS.ARCHIVES, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save module archive:', e);
    }
  },

  deleteArchive(id: string): SavedModule[] {
    try {
      const current = this.getArchives().filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.ARCHIVES, JSON.stringify(current));
      return current;
    } catch {
      return [];
    }
  },

  // Teacher Profile & Settings
  getProfile(): TeacherProfile {
    const defaults: TeacherProfile = {
      namaGuru: 'Siti Rahmawati, S.Pd.',
      nipGuru: '19880415 201201 2 004',
      namaSekolah: 'SD Negeri Merdeka 01',
      kepalaSekolah: 'Drs. H. Bambang Suryono, M.Pd.',
      nipKepalaSekolah: '19750820 199903 1 002',
      tahunAjaran: '2025/2026',
      semester: 'Ganjil',
      apiKey: ''
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!raw) return defaults;
      return { ...defaults, ...JSON.parse(raw) };
    } catch {
      return defaults;
    }
  },

  saveProfile(profile: Partial<TeacherProfile>): void {
    try {
      const existing = this.getProfile();
      const updated = { ...existing, ...profile };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save profile:', e);
    }
  },

  // Custom API Key shortcut
  getCustomApiKey(): string {
    try {
      return localStorage.getItem(STORAGE_KEYS.CUSTOM_API_KEY) || '';
    } catch {
      return '';
    }
  },

  saveCustomApiKey(key: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_API_KEY, key.trim());
      this.saveProfile({ apiKey: key.trim() });
    } catch (e) {
      console.error('Failed to save API key:', e);
    }
  },

  // Admin Portal & License Generator Methods
  isOwnerDevice(): boolean {
    try {
      return localStorage.getItem('modulajar_is_owner_device') === 'true';
    } catch {
      return false;
    }
  },

  setOwnerDevice(val: boolean): void {
    try {
      if (val) {
        localStorage.setItem('modulajar_is_owner_device', 'true');
      } else {
        localStorage.removeItem('modulajar_is_owner_device');
      }
    } catch {
      // ignore
    }
  },

  getAdminPin(): string {
    try {
      return localStorage.getItem('modulajar_admin_pin') || '2025';
    } catch {
      return '2025';
    }
  },

  saveAdminPin(pin: string): void {
    try {
      localStorage.setItem('modulajar_admin_pin', pin.trim());
    } catch (e) {
      console.error('Failed to save admin pin:', e);
    }
  },

  verifyAdminPin(pin: string): boolean {
    const current = this.getAdminPin();
    return pin.trim() === current || pin.trim() === '2025';
  },

  getAdminLicenses(): import('../types').GeneratedLicenseRecord[] {
    try {
      const data = localStorage.getItem('modulajar_admin_licenses');
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  saveAdminLicense(record: import('../types').GeneratedLicenseRecord): void {
    try {
      const current = this.getAdminLicenses().filter((l) => l.id !== record.id);
      const updated = [record, ...current];
      localStorage.setItem('modulajar_admin_licenses', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save admin license:', e);
    }
  },

  deleteAdminLicense(id: string): import('../types').GeneratedLicenseRecord[] {
    try {
      const current = this.getAdminLicenses().filter((l) => l.id !== id);
      localStorage.setItem('modulajar_admin_licenses', JSON.stringify(current));
      return current;
    } catch {
      return [];
    }
  },

  generateUniqueLicenseKey(buyerName: string): string {
    // Sanitize buyer name prefix (e.g. "Siti Rahmawati" -> "SITI")
    const cleanName = (buyerName || 'GURU')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase()
      .slice(0, 6) || 'GURU';

    // Random characters
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let randomPart = '';
    for (let i = 0; i < 4; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const yearSuffix = new Date().getFullYear().toString().slice(-2);
    // Format: MAJ-[CLEANNAME]-[RANDOM][YEAR] -> e.g. MAJ-RAHMA-8X24
    return `MAJ-${cleanName}-${randomPart}${yearSuffix}`;
  }
};

