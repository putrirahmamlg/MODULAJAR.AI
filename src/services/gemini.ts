import { GoogleGenAI } from '@google/genai';
import { ModuleInputData } from '../types';

export const GEMINI_TIPS = [
  'Menyelaraskan Capaian Pembelajaran (CP) dengan Alur Tujuan Pembelajaran (ATP)...',
  'Merancang diferensiasi konten, proses, dan produk sesuai keragaman peserta didik...',
  'Menyusun pertanyaan pemantik yang merangsang nalar kritis dan rasa ingin tahu...',
  'Menyiapkan lembar observasi asesmen formatif otentik berbasis Profil Pelajar Pancasila...',
  'Menyusun Lembar Kerja Peserta Didik (LKPD) aplikatif dan siap cetak...',
  'Mengintegrasikan model pembelajaran aktif berpusat pada siswa (student-centered)...'
];

export function hasBuiltInApiKey(): boolean {
  const envKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (import.meta as unknown as { env: Record<string, string> }).env?.VITE_GEMINI_API_KEY || '';
  return Boolean(envKey && envKey.trim().length > 0);
}

export async function generateModulAjarAI(
  input: ModuleInputData,
  apiKeyOverride?: string
): Promise<string> {
  // Determine API key
  const effectiveKey = (
    apiKeyOverride ||
    input.customApiKey ||
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (import.meta as unknown as { env: Record<string, string> }).env?.VITE_GEMINI_API_KEY ||
    ''
  ).trim();

  if (!effectiveKey) {
    throw new Error(
      'API Key Gemini belum disetel. Silakan masukkan Gemini API Key Anda di panel formulir atau tab Pengaturan.'
    );
  }

  const ai = new GoogleGenAI({ apiKey: effectiveKey });

  const systemInstruction = `Anda adalah Pakar Pengembang Kurikulum Pendidikan Nasional Indonesia, Konsultan Ahli Kurikulum Merdeka dari Kemendikbudristek, dan Guru Penggerak Utama.
Tugas Anda adalah membuat Dokumen MODUL AJAR KURIKULUM MERDEKA yang sangat lengkap, mendalam, aplikatif, profesional, dan siap digunakan langsung di kelas maupun diunggah ke Platform Merdeka Mengajar (PMM).

Gunakan Bahasa Indonesia baku, pedagogis, hangat, dan menginspirasi sesuai standar regulasi BSKAP Kemendikbudristek terbaru.

Format Modul Ajar HARUS terstruktur rapi menggunakan Markdown dengan hierarki judul (Heading 1, 2, 3), daftar butir, dan tabel yang jelas mencakup 5 Komponen Utama:

# MODUL AJAR KURIKULUM MERDEKA: [NAMA MAPEL] - [FASE / KELAS]

### I. INFORMASI UMUM
- Identitas Modul (Nama Penyusun, Institusi/Sekolah, Tahun Pelajaran, Jenjang/Fase/Kelas, Alokasi Waktu, Moda Pembelajaran)
- Kompetensi Awal (Prasyarat pengetahuan/keterampilan dasar siswa)
- Profil Pelajar Pancasila (Jelaskan keterkaitannya secara konkret dengan kegiatan belajar)
- Sarana dan Prasarana (Media digital, alat peraga, bahan ajar, lingkungan belajar)
- Target Peserta Didik (Peserta didik reguler/tipikal, dengan kesulitan belajar, atau pencapaian tinggi)
- Model Pembelajaran & Metode (Sintaks model pembelajaran yang dipilih)

### II. KOMPONEN INTI
- Tujuan Pembelajaran (TP) & Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)
- Pemahaman Bermakna (Makna materi bagi kehidupan nyata peserta didik)
- Pertanyaan Pemantik (Minimal 3 pertanyaan kritis pemantik diskusi)
- Persiapan Pembelajaran (Langkah teknis guru sebelum kelas dimulai)
- Kegiatan Pembelajaran Rinci Berjenjang:
  1. Kegiatan Pendahuluan (Apersepsi, motivasi kontekstual, ice breaking edukatif, penyampaian tujuan)
  2. Kegiatan Inti dengan Sintaks Model Terpilih & Pembelajaran Berdiferensiasi (Diferensiasi Konten, Proses, dan Produk)
  3. Kegiatan Penutup (Refleksi siswa & guru, kesimpulan bersama, tindak lanjut, doa)
- Lembar Refleksi Guru dan Peserta Didik

### III. ASESMEN PEMBELAJARAN
- Asesmen Awal / Diagnostik (Pertanyaan pemetaan awal)
- Asesmen Formatif (Rubrik observasi sikap dan keaktifan saat berproses)
- Asesmen Sumatif (5 soal evaluasi lengkap beserta kunci jawaban & pedoman penskoran)

### IV. PENGAYAAN DAN REMEDIAL
- Program Pengayaan (Aktivitas menantang untuk siswa tuntas cepat)
- Program Remedial (Strategi bimbingan khusus untuk siswa yang butuh penguatan)

### V. LAMPIRAN LENGKAP
- Lembar Kerja Peserta Didik (LKPD) lengkap dengan petunjuk langkah kerja, tabel isian, dan instruksi jelas
- Ringkasan Bahan Bacaan Guru dan Siswa (Penjelasan materi esensial)
- Glosarium (Daftar istilah penting dan definisinya)
- Daftar Pustaka (Referensi buku resmi Kemendikbudristek dan sumber terpercaya)

JANGAN membuat modul yang singkat atau hanya garis besar. Buatlah modul yang substansial, rinci, dan kaya ide pembelajaran aktif.`;

  const userPrompt = `Buatkan Dokumen Modul Ajar Kurikulum Merdeka lengkap dan siap pakai dengan rincian data sebagai berikut:

- **Mata Pelajaran**: ${input.mataPelajaran}
- **Fase**: ${input.fase}
- **Kelas**: ${input.kelas}
- **Topik / Materi Pokok**: ${input.topik}
- **Alokasi Waktu**: ${input.alokasiWaktu}
- **Model Pembelajaran**: ${input.modelPembelajaran}
- **Dimensi Profil Pelajar Pancasila**: ${input.profilPancasila.length > 0 ? input.profilPancasila.join(', ') : 'Mandiri, Bernalar Kritis, Gotong Royong'}
- **Target Peserta Didik**: ${input.targetSiswa || 'Peserta didik reguler/tipikal'}
- **Sarana & Prasarana**: ${input.saranaPrasarana || 'Buku teks Kemendikbudristek, proyektor/papan tulis, alat peraga visual/lingkungan sekitar'}
- **Identitas Guru**: ${input.namaGuru || 'Guru Pengampu'} ${input.nipGuru ? `(NIP: ${input.nipGuru})` : ''}
- **Satuan Pendidikan**: ${input.namaSekolah || 'Sekolah Penggerak'}
- **Tahun Ajaran / Semester**: ${input.tahunAjaran || '2025/2026'} / ${input.semester}
${input.catatanKhusus ? `- **Permintaan Khusus Tambahan**: ${input.catatanKhusus}` : ''}

Pastikan sintaks model pembelajaran ${input.modelPembelajaran} dijabarkan langkah demi langkah dalam Kegiatan Inti dengan strategi berdiferensiasi (konten, proses, produk). Sajikan lengkap dari Bagian I sampai Bagian V termasuk naskah LKPD siap pakai!`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const text = response.text?.trim();
    if (!text) {
      throw new Error('Tidak ada respon teks yang diterima dari Gemini AI. Silakan coba kembali.');
    }

    return text;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('API_KEY_INVALID') || message.includes('API key not valid')) {
      throw new Error('API Key Gemini tidak valid. Harap periksa kembali kunci API Anda di menu Pengaturan.');
    }
    if (message.includes('QUOTA_EXCEEDED') || message.includes('Resource has been exhausted')) {
      throw new Error('Batas kuota Gemini API tercapai. Silakan coba lagi beberapa saat atau gunakan API Key cadangan.');
    }
    throw new Error(`Gagal menghasilkan Modul Ajar: ${message}`);
  }
}
