import React from 'react';
import { Film, Volume2, VolumeX, Lock, Unlock, PlayCircle, Trophy } from 'lucide-react';

interface CinemaNavbarProps {
  isAdmin: boolean;
  onToggleAdminModal: () => void;
  onLogoutAdmin: () => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
  onReopenCurtains: () => void;
  activeTab: 'lobby' | 'rankings';
  onSelectTab: (tab: 'lobby' | 'rankings') => void;
  totalCharacters: number;
}

export const CinemaNavbar: React.FC<CinemaNavbarProps> = ({
  isAdmin,
  onToggleAdminModal,
  onLogoutAdmin,
  isSoundMuted,
  onToggleSound,
  onReopenCurtains,
  activeTab,
  onSelectTab,
  totalCharacters,

}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 bg-[#1c0205]/95 border-[#4a0711] text-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
      {/* Primary Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div
          className="flex items-center gap-2 shrink-0 cursor-pointer select-none"
          onClick={() => onSelectTab('lobby')}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#991b1b] to-[#450a0a] border border-[#d4af37] flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.4)] shrink-0">
            <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#facc15]" />
          </div>
          <span className="font-playfair text-base sm:text-lg md:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fde047] to-[#eab308] whitespace-nowrap">
            LEMON CINEMA
          </span>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs lg:text-sm font-medium">
          <button
            onClick={() => onSelectTab('lobby')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 cursor-pointer ${
              activeTab === 'lobby'
                ? 'border-[#facc15] text-[#facc15] font-semibold'
                : 'border-transparent text-[#fca5a5]/80 hover:text-white'
            }`}
          >
            Mua vé ({totalCharacters})
          </button>

          <button
            onClick={() => onSelectTab('rankings')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rankings'
                ? 'border-[#facc15] text-[#facc15] font-semibold'
                : 'border-transparent text-[#fca5a5]/80 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-[#facc15]" />
            <span>Bảng Vàng Phòng Vé</span>
          </button>
        </nav>

        {/* Zone 3: Primary Utility Controls & Admin */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Explicit Music Play/Pause/Stop Button in Top Navbar */}


          {/* Re-open Velvet Curtain */}
          <button
            onClick={onReopenCurtains}
            title="Đóng rèm rạp chiếu"
            className="p-1.5 sm:p-2 rounded-lg text-[#fca5a5] hover:text-[#facc15] hover:bg-[#38050b] transition-colors cursor-pointer"
          >
            <PlayCircle className="w-4 h-4" />
          </button>

          {/* Sound Effect Mute Toggle */}
          <button
            onClick={onToggleSound}
            title={isSoundMuted ? 'Bật hiệu ứng âm thanh' : 'Tắt hiệu ứng âm thanh'}
            className="p-1.5 sm:p-2 rounded-lg text-[#fca5a5] hover:text-[#facc15] hover:bg-[#38050b] transition-colors cursor-pointer"
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#facc15]" />}
          </button>

          <div className="h-4 w-px bg-[#520914] mx-1" />

          {/* Admin Lock / Management */}
          {isAdmin ? (
            <div className="flex items-center gap-1">
              <button
                onClick={onToggleAdminModal}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#991b1b] hover:bg-[#b91c1c] text-[#fffbeb] text-xs font-semibold flex items-center gap-1.5 shadow border border-[#facc15]/50 transition-colors cursor-pointer"
              >
                <Unlock className="w-3.5 h-3.5 text-[#facc15]" />
                <span className="hidden sm:inline">Quản Trị Viên</span>
              </button>
              <button
                onClick={onLogoutAdmin}
                title="Đăng xuất quản trị"
                className="p-1.5 rounded-lg text-[#fca5a5] hover:text-red-400 hover:bg-[#38050b] text-xs transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onToggleAdminModal}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#280408] hover:bg-[#38050b] text-[#fca5a5] hover:text-[#fde047] text-xs font-medium border border-[#520914] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Quản Trị</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Tabs (Shown on screens < 768px for perfect mobile usability) */}
      <div className="flex md:hidden items-center justify-around border-t border-[#38040a] bg-[#140204] py-1.5 px-1 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onSelectTab('lobby')}
          className={`flex-1 text-center py-1 px-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'lobby'
              ? 'text-[#facc15] border-b-2 border-[#facc15]'
              : 'text-[#fca5a5]/70 hover:text-white'
          }`}
        >
          Mua vé ({totalCharacters})
        </button>

        <button
          onClick={() => onSelectTab('rankings')}
          className={`flex-1 text-center py-1 px-1.5 text-xs font-semibold transition-colors flex items-center justify-center gap-1 whitespace-nowrap ${
            activeTab === 'rankings'
              ? 'text-[#facc15] border-b-2 border-[#facc15]'
              : 'text-[#fca5a5]/70 hover:text-white'
          }`}
        >
          <Trophy className="w-3 h-3 text-[#facc15]" />
          <span>Bảng Vàng</span>
        </button>
      </div>
    </header>
  );
};
