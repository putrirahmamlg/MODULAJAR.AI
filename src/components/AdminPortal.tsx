import React, { useState, useEffect } from 'react';
import { 
  KeyRound, 
  ShieldCheck, 
  UserPlus, 
  Copy, 
  Check, 
  Trash2, 
  Send, 
  Lock, 
  Sparkles, 
  Users, 
  DollarSign, 
  Download, 
  Search, 
  Calendar, 
  X,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { GeneratedLicenseRecord } from '../types';
import { StorageService } from '../services/storage';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Form states for new license
  const [buyerName, setBuyerName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [packageType, setPackageType] = useState('Paket Guru Mandiri (Akses Selamanya)');
  const [price, setPrice] = useState('49000');

  // Generated result state
  const [latestRecord, setLatestRecord] = useState<GeneratedLicenseRecord | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedWA, setCopiedWA] = useState(false);

  // History list state
  const [licenses, setLicenses] = useState<GeneratedLicenseRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Settings: Change PIN
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLicenses(StorageService.getAdminLicenses());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (StorageService.verifyAdminPin(pinInput)) {
      setIsAuthenticated(true);
      setPinError(null);
    } else {
      setPinError('PIN salah! Coba gunakan PIN default: 2025');
    }
  };

  const handleGenerateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim()) return;

    const generatedKey = StorageService.generateUniqueLicenseKey(buyerName);
    const newRecord: GeneratedLicenseRecord = {
      id: 'lic-' + Date.now(),
      createdAt: new Date().toISOString(),
      buyerName: buyerName.trim(),
      schoolName: schoolName.trim() || undefined,
      phoneNumber: phoneNumber.trim() || undefined,
      packageType,
      price: parseInt(price, 10) || 49000,
      licenseKey: generatedKey
    };

    StorageService.saveAdminLicense(newRecord);
    setLicenses(StorageService.getAdminLicenses());
    setLatestRecord(newRecord);
    onShowToast(`Kunci lisensi untuk ${buyerName} berhasil dibuat!`);

    // Reset inputs
    setBuyerName('');
    setSchoolName('');
    setPhoneNumber('');
  };

  const getWhatsAppMessage = (record: GeneratedLicenseRecord) => {
    const appUrl = window.location.origin;
    return `Halo *${record.buyerName}*! 👋

Terima kasih banyak telah melakukan pemesanan perangkat lunak *ModulAjar.AI (Kurikulum Merdeka)* 🎓✨

Berikut adalah detail tautan aplikasi dan Kunci Lisensi Resmi Anda:

🔗 *Link Aplikasi:* ${appUrl}
🔑 *Kunci Lisensi Anda:* \`${record.licenseKey}\`
📦 *Paket:* ${record.packageType}

*Langkah Aktivasi Sangat Mudah:*
1. Buka tautan di atas melalui browser (Chrome / Edge / Safari).
2. Masukkan Kunci Lisensi \`${record.licenseKey}\` saat pertama kali membuka aplikasi.
3. Aplikasi akan otomatis aktif selamanya dan dapat Anda pasang (Install PWA) ke layar utama HP atau Laptop!

Jika membutuhkan bantuan, jangan ragu untuk menghubungi kami kembali. Selamat menyusun Modul Ajar Kurikulum Merdeka dengan mudah dan instan! 🚀`;
  };

  const handleCopyWA = (record: GeneratedLicenseRecord) => {
    const text = getWhatsAppMessage(record);
    navigator.clipboard.writeText(text);
    setCopiedWA(true);
    onShowToast('Draf pesan WhatsApp berhasil disalin!');
    setTimeout(() => setCopiedWA(false), 2500);
  };

  const handleCopyKeyOnly = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    onShowToast('Kunci lisensi berhasil disalin!');
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleDirectWhatsApp = (record: GeneratedLicenseRecord) => {
    let cleanPhone = (record.phoneNumber || '').replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.slice(1);
    }
    const text = encodeURIComponent(getWhatsAppMessage(record));
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleDeleteLicense = (id: string) => {
    if (window.confirm('Hapus riwayat lisensi ini?')) {
      const updated = StorageService.deleteAdminLicense(id);
      setLicenses(updated);
      if (latestRecord && latestRecord.id === id) {
        setLatestRecord(null);
      }
      onShowToast('Riwayat lisensi berhasil dihapus.');
    }
  };

  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      StorageService.saveAdminPin(newPin.trim());
      setPinSuccess(true);
      setTimeout(() => {
        setPinSuccess(false);
        setIsChangingPin(false);
        setNewPin('');
      }, 2000);
      onShowToast('PIN Admin berhasil diperbarui!');
    }
  };

  const handleExportCSV = () => {
    if (licenses.length === 0) {
      alert('Belum ada data lisensi yang dapat diekspor.');
      return;
    }
    let csv = 'ID,Tanggal,Nama Pembeli,Sekolah,No WhatsApp,Paket,Harga,Kunci Lisensi\n';
    licenses.forEach((item) => {
      const d = new Date(item.createdAt).toLocaleDateString('id-ID');
      csv += `"${item.id}","${d}","${item.buyerName}","${item.schoolName || '-'}","${item.phoneNumber || '-'}","${item.packageType}",${item.price},"${item.licenseKey}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Data_Penjualan_Lisensi_ModulAjar_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filtered history
  const filteredLicenses = licenses.filter(
    (l) =>
      l.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.licenseKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.schoolName && l.schoolName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalRevenue = licenses.reduce((acc, curr) => acc + (curr.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight">Portal Admin Penjual & Generator Lisensi</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950">
                  Khusus Pemilik
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Kelola lisensi unik pembeli dan draf pesan WhatsApp otomatis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* PIN Lock Screen if not authenticated */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-10 text-center">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Verifikasi Akses Admin</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Masukkan PIN master untuk mengelola lisensi dan data transaksi penjualan Anda.
              </p>

              <form onSubmit={handlePinSubmit} className="mt-5 space-y-3">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError(null);
                  }}
                  placeholder="Masukkan PIN (Default: 2025)"
                  className="w-full text-center text-lg font-mono tracking-widest py-3 px-4 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  autoFocus
                />

                {pinError && (
                  <p className="text-xs text-rose-600 font-semibold">{pinError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition cursor-pointer"
                >
                  Buka Panel Admin
                </button>
              </form>
              <p className="mt-3 text-[11px] text-slate-400">
                PIN Bawaan Pertama Kali: <span className="font-mono font-bold text-slate-600">2025</span> (bisa diganti di dalam panel)
              </p>
            </div>
          ) : (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-700">Total Lisensi Terbit</span>
                    <p className="text-2xl font-black text-slate-900 mt-0.5">{licenses.length}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-2xs">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-emerald-700">Estimasi Omzet</span>
                    <p className="text-2xl font-black text-slate-900 mt-0.5">
                      Rp {totalRevenue.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-2xs">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-indigo-700">Format Kunci Resmi</span>
                    <p className="text-xs font-mono font-bold text-slate-800 mt-1">MAJ-[NAMA]-[KODE]</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-2xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Form Generator Kunci Lisensi Baru */}
              <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 sm:p-6">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200/80 mb-4">
                  <UserPlus className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Buat Lisensi Baru untuk Pembeli</h3>
                </div>

                <form onSubmit={handleGenerateLicense} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nama Pembeli / Guru <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="Contoh: Ibu Rahmawati, S.Pd."
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        No. WhatsApp (Opsional)
                      </label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="08123456789"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Harga Penjualan (Rp)
                      </label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="49000"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nama Sekolah / Satuan Pendidikan (Opsional)
                      </label>
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="SD Negeri Merdeka 01"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tipe Paket Pembelian
                      </label>
                      <select
                        value={packageType}
                        onChange={(e) => setPackageType(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="Paket Guru Mandiri (Akses Selamanya)">Paket Guru Mandiri (Akses Selamanya)</option>
                        <option value="Paket KKG / Komunitas Guru">Paket KKG / Komunitas Guru</option>
                        <option value="Paket Sekolah Lengkap">Paket Sekolah Lengkap</option>
                        <option value="Paket Promo Terbatas">Paket Promo Terbatas</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Terbitkan Kunci Lisensi & Siapkan Teks WhatsApp</span>
                  </button>
                </form>
              </div>

              {/* Box Hasil Terbitan Lisensi Terakhir & Draf WhatsApp */}
              {latestRecord && (
                <div className="bg-emerald-50/90 rounded-2xl border border-emerald-200 p-5 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-200/80">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                        Kunci Lisensi Berhasil Diterbitkan:
                      </span>
                      <p className="font-mono text-lg font-black text-emerald-950 mt-0.5">
                        {latestRecord.licenseKey}
                      </p>
                      <p className="text-xs text-emerald-700">
                        Atas nama: <strong>{latestRecord.buyerName}</strong> ({latestRecord.packageType})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyKeyOnly(latestRecord.licenseKey)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-emerald-800 border border-emerald-300 shadow-2xs hover:bg-emerald-100 transition cursor-pointer flex items-center gap-1.5"
                      >
                        {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey ? 'Tersalin' : 'Salin Kunci'}</span>
                      </button>

                      <button
                        onClick={() => handleCopyWA(latestRecord)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-xs hover:bg-emerald-700 transition cursor-pointer flex items-center gap-1.5"
                      >
                        {copiedWA ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                        <span>{copiedWA ? 'Pesan Tersalin!' : 'Salin Pesan WA'}</span>
                      </button>

                      {latestRecord.phoneNumber && (
                        <button
                          onClick={() => handleDirectWhatsApp(latestRecord)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white shadow-xs hover:bg-slate-800 transition cursor-pointer"
                        >
                          Buka WA Web
                        </button>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp text preview */}
                  <div className="mt-3">
                    <span className="text-[11px] font-semibold text-emerald-900 block mb-1">
                      Pratinjau Pesan yang akan dikirim ke Pembeli:
                    </span>
                    <pre className="p-3 bg-white/80 rounded-xl border border-emerald-200 text-[11px] font-sans text-slate-700 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                      {getWhatsAppMessage(latestRecord)}
                    </pre>
                  </div>
                </div>
              )}

              {/* Tabel Riwayat Lisensi Terbit */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">Daftar Pembeli Terdaftar ({licenses.length})</h3>
                    <button
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Ekspor Excel/CSV</span>
                    </button>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama atau kunci..."
                      className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 w-full sm:w-52"
                    />
                  </div>
                </div>

                {filteredLicenses.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6 bg-slate-50 rounded-xl">
                    Belum ada riwayat lisensi yang terdaftar.
                  </p>
                ) : (
                  <div className="border border-slate-200 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px] sticky top-0">
                        <tr>
                          <th className="p-2.5">Pembeli</th>
                          <th className="p-2.5">Kunci Lisensi</th>
                          <th className="p-2.5 hidden sm:table-cell">Paket / Harga</th>
                          <th className="p-2.5 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredLicenses.map((lic) => (
                          <tr key={lic.id} className="hover:bg-slate-50">
                            <td className="p-2.5">
                              <span className="font-bold text-slate-900 block">{lic.buyerName}</span>
                              <span className="text-[10px] text-slate-400">
                                {lic.schoolName ? `${lic.schoolName} • ` : ''}
                                {new Date(lic.createdAt).toLocaleDateString('id-ID')}
                              </span>
                            </td>
                            <td className="p-2.5 font-mono font-bold text-blue-700">
                              {lic.licenseKey}
                            </td>
                            <td className="p-2.5 hidden sm:table-cell">
                              <span>{lic.packageType}</span>
                              <span className="block text-[10px] text-emerald-600 font-semibold">
                                Rp {lic.price.toLocaleString('id-ID')}
                              </span>
                            </td>
                            <td className="p-2.5 text-right space-x-1">
                              <button
                                onClick={() => handleCopyWA(lic)}
                                className="p-1 rounded bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600"
                                title="Salin Ulang Teks WhatsApp"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteLicense(lic.id)}
                                className="p-1 rounded bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                                title="Hapus Riwayat"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Card Pengaturan PIN Admin */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                {!isChangingPin ? (
                  <button
                    onClick={() => setIsChangingPin(true)}
                    className="text-blue-600 hover:underline font-semibold cursor-pointer"
                  >
                    Ganti PIN Master Admin
                  </button>
                ) : (
                  <form onSubmit={handleSaveNewPin} className="flex items-center gap-2">
                    <input
                      type="password"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="PIN baru (4+ digit)"
                      className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono"
                      required
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                      Simpan PIN
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsChangingPin(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      Batal
                    </button>
                    {pinSuccess && <span className="text-emerald-600 text-xs">PIN Diperbarui!</span>}
                  </form>
                )}

                <span className="text-[11px] text-slate-400">
                  Data admin tersimpan 100% aman di peramban lokal Anda.
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
