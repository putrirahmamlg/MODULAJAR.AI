/**
 * Types and Data Contracts for ModulAjar.AI (Kurikulum Merdeka)
 */

export type FaseKurikulum = 
  | 'Fase Fondasi (PAUD / TK)'
  | 'Fase A (Kelas 1 - 2 SD)'
  | 'Fase B (Kelas 3 - 4 SD)'
  | 'Fase C (Kelas 5 - 6 SD)'
  | 'Fase D (Kelas 7 - 9 SMP)'
  | 'Fase E (Kelas 10 SMA/SMK)'
  | 'Fase F (Kelas 11 - 12 SMA/SMK)';

export type ModelPembelajaran = 
  | 'Problem Based Learning (PBL)'
  | 'Project Based Learning (PjBL)'
  | 'Discovery Learning'
  | 'Inquiry Learning'
  | 'Teaching at The Right Level (TaRL)'
  | 'Culturally Responsive Teaching (CRT)'
  | 'Pembelajaran Berdiferensiasi';

export type ProfilPelajarPancasila = 
  | 'Beriman, Bertakwa kepada Tuhan YME, & Berakhlak Mulia'
  | 'Berkebinekaan Global'
  | 'Gotong Royong'
  | 'Mandiri'
  | 'Bernalar Kritis'
  | 'Kreatif';

export interface ModuleInputData {
  mataPelajaran: string;
  fase: FaseKurikulum;
  kelas: string;
  topik: string;
  alokasiWaktu: string;
  modelPembelajaran: ModelPembelajaran;
  profilPancasila: ProfilPelajarPancasila[];
  targetSiswa: string;
  saranaPrasarana: string;
  namaGuru: string;
  nipGuru: string;
  namaSekolah: string;
  tahunAjaran: string;
  semester: 'Ganjil' | 'Genap';
  catatanKhusus?: string;
  customApiKey?: string;
}

export interface SavedModule {
  id: string;
  createdAt: string;
  updatedAt: string;
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
}

export interface TeacherProfile {
  namaGuru: string;
  nipGuru: string;
  namaSekolah: string;
  kepalaSekolah: string;
  nipKepalaSekolah: string;
  tahunAjaran: string;
  semester: 'Ganjil' | 'Genap';
  apiKey: string;
}

export interface GeneratedLicenseRecord {
  id: string;
  createdAt: string;
  buyerName: string;
  schoolName?: string;
  phoneNumber?: string;
  packageType: string;
  price: number;
  licenseKey: string;
}

