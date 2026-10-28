import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  FolderArchive, 
  HelpCircle, 
  Settings, 
  Menu, 
  X, 
  ShieldCheck, 
  Wifi, 
  WifiOff 
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface HeaderProps {
  activeTab: 'generator' | 'archive' | 'guide' | 'settings';
  setActiveTab: (tab: 'generator' | 'archive' | 'guide' | 'settings') => void;
  archiveCount: number;
  licenseKey: string | null;
  onOpenLicenseModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  archiveCount,
  licenseKey,
  onOpenLicenseModal,
}) => {
  const isOnline = useOnlineStatus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'generator' as const,
      label: 'Buat Modul Baru',
      icon: Sparkles,
      highlight: true
    },
    {
      id: 'archive' as const,
      label: 'Arsip Tersimpan',
      icon: FolderArchive,
      badge: archiveCount > 0 ? archiveCount : undefined
    },
    {
      id: 'guide' as const,
      label: 'Panduan Penggunaan',
      icon: HelpCircle
    },
    {
      id: 'settings' as const,
      label: 'Pengaturan & Profil',
      icon: Settings
    }
  ];

  const handleTabClick = (tabId: 'generator' | 'archive' | 'guide' | 'settings') => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTabClick('generator')}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight">ModulAjar<span className="text-blue-600">.AI</span></span>
                  <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-blue-100 text-blue-700 rounded-md">
                    Kurikulum Merdeka
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Generator Perangkat Ajar Guru Indonesia
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer relative ${
                    isActive
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right utility items: Online badge, PWA Install, License indicator */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Connectivity status */}
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border ${
                isOnline
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
              title={isOnline ? 'Terhubung ke internet' : 'Mode offline aktif'}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3 h-3 text-emerald-600" />
                  <span className="hidden lg:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-amber-600" />
                  <span className="hidden lg:inline">Offline</span>
                </>
              )}
            </div>

            {/* PWA Install Button */}
            <PWAInstallButton variant="nav" />

            {/* License Status Pill */}
            {licenseKey ? (
              <button
                onClick={onOpenLicenseModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer"
                title="Status Lisensi Aktif. Klik untuk melihat rincian."
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-mono text-[11px]">Aktif</span>
              </button>
            ) : (
              <button
                onClick={onOpenLicenseModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition cursor-pointer"
              >
                <span>Aktivasi</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <PWAInstallButton variant="nav" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className="text-xs text-slate-500">{isOnline ? 'Jaringan Online' : 'Mode Offline'}</span>
            </div>
            <button
              onClick={() => {
                onOpenLicenseModal();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-blue-600 font-semibold"
            >
              {licenseKey ? `Lisensi: ${licenseKey.slice(0, 10)}...` : 'Aktivasi Lisensi'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
