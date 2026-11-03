import React, { useState } from 'react';
import { Character } from '../types/character';
import { PresetAvatarGraphic, CinemaCurtainsFrame, FilmReelSvg } from './CinemaSvgArt';
import {
  Film,
  Sparkles,
  BookOpen,
  Heart,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Sun,
  Moon,
  Tv,
  Music,
  Disc,
  ExternalLink
} from 'lucide-react';

interface FilmReelViewProps {
  characters: Character[];
  onOpenDetail: (character: Character) => void;
  onOpenScript?: (character: Character) => void;
  onLike: (character: Character) => void;
  isPlayingMusic?: boolean;
  onTogglePlayMusic?: () => void;
  isMutedMusic?: boolean;
  onToggleMuteMusic?: () => void;
}

export const FilmReelView: React.FC<FilmReelViewProps> = ({
  characters,
  onOpenDetail,
  onOpenScript,
  onLike,
  isPlayingMusic = true,
  onTogglePlayMusic,
  isMutedMusic = false,
  onToggleMuteMusic
}) => {
  const [isTheaterLightsDimmed, setIsTheaterLightsDimmed] = useState(false);

  // YouTube Video ID for [XHTDRLX3] Phonecert (폰서트) - 10CM x Hoàng Dũng
  const youtubeId = 'XFVNxCs97ys';

  return (
    <div className="w-full space-y-8">
      {/* ========================================================= */}
      {/* 1. CINEMA MOVIE THEATER ROOM INTERFACE (GIAO DIỆN PHÒNG CHIẾU) */}
      {/* ========================================================= */}
      <div
        className={`relative rounded-3xl transition-all duration-700 border-2 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] ${
          isTheaterLightsDimmed
            ? 'bg-[#0a0102] border-[#2b0408] shadow-[0_0_100px_rgba(0,0,0,0.95)]'
            : 'bg-gradient-to-b from-[#200306] via-[#150204] to-[#0d0102] border-[#520914]'
        }`}
      >
        {/* Overhead Projector Light Beam */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-b from-[#fde047]/15 via-[#fde047]/5 to-transparent blur-2xl pointer-events-none transition-opacity duration-700 ${
            isTheaterLightsDimmed ? 'opacity-90' : 'opacity-40'
          }`}
        />

        {/* Top Velvet Curtain Header */}
        <div className="relative z-10 bg-gradient-to-b from-[#800a1a] via-[#590712] to-transparent pt-3 pb-2 px-4 border-b border-[#d4af37]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#facc15] animate-ping" />
            <span className="font-playfair text-xs sm:text-sm font-bold tracking-wider text-[#fde047] uppercase">
              RẠP CHIẾU LEMON CINEMA · PHÒNG SO CẤP #01
            </span>
          </div>

          {/* Theater Lighting Dimmer Toggle */}
          <button
            onClick={() => setIsTheaterLightsDimmed(!isTheaterLightsDimmed)}
            className={`px-3 py-1 rounded-full text-xs font-playfair font-semibold flex items-center gap-1.5 border transition-all cursor-pointer shadow-md ${
              isTheaterLightsDimmed
                ? 'bg-[#facc15] text-black border-[#facc15] hover:bg-[#fde047]'
                : 'bg-[#38050b] text-[#fde047] border-[#d4af37]/60 hover:bg-[#4d0912]'
            }`}
          >
            {isTheaterLightsDimmed ? (
              <>
                <Sun className="w-3.5 h-3.5 text-black" />
                <span>BẬT ĐÈN RẠP</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#facc15]" />
                <span>TẮT ĐÈN PHÒNG CHIẾU</span>
              </>
            )}
          </button>
        </div>

        {/* Cinema Stage Frame & Tied-Back Gold/Red Curtains */}
        <div className="relative p-3 sm:p-6 lg:p-8 flex flex-col items-center">
          {/* Movie Marquee Header inside Projection Room */}
          <div className="relative z-20 mb-3 text-center max-w-2xl mx-auto space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#991b1b]/80 border border-[#facc15]/60 text-[#fef08a] text-[10px] sm:text-xs font-mono font-semibold shadow-md">
              <Music className={`w-3 h-3 text-[#facc15] ${isPlayingMusic ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
              <span>SÂN KHẤU TÁI HIỆN NHẠC PHIM SỐ 01</span>
            </div>
            <h2 className="font-playfair text-base sm:text-xl lg:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fde047] to-[#eab308] tracking-wide">
              [XHTDRLX3] Phonecert (폰서트) - 10CM (십센치) x Hoàng Dũng
            </h2>
            <p className="text-[11px] sm:text-xs text-[#fca5a5]/80 font-light">
              Xuân Hạ Thu Đông, Rồi Lại Xuân (Mùa 3 - Street's Harmony) · Lời Việt: Hoàng Dũng
            </p>
          </div>

          {/* STAGE AREA WRAPPER WITH TIED-BACK RED CURTAINS & GOLD TASSELS */}
          <div className="relative w-full max-w-3xl p-3 sm:p-6 my-2 flex justify-center">
            {/* Grand Tied-Back Red Velvet Curtains SVG Overlay */}
            <CinemaCurtainsFrame />

            {/* GRAND CINEMA SOUND PROJECTION SCREEN (MÀN HÌNH PHÁT NHẠC RẠP CHIẾU) */}
            <div className="relative z-20 w-full aspect-[16/9] max-h-[380px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c0205] via-[#2a0408] to-[#120103] border-4 sm:border-8 border-[#2d050a] shadow-[0_0_60px_rgba(250,204,21,0.25)] flex flex-col justify-between p-4 sm:p-6 select-none">
              {/* Screen Ambient Light & Grid Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.15)_0%,transparent_70%)] pointer-events-none" />
              <div className="absolute inset-0 border border-[#d4af37]/40 pointer-events-none rounded-lg z-30 shadow-[inset_0_0_40px_rgba(0,0,0,0.85)]" />

              {/* Screen Top Status Banner */}
              <div className="relative z-20 flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#fca5a5]/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#facc15] animate-ping" />
                  <span className="text-[#fde047] font-semibold tracking-wider">
                    {isPlayingMusic ? '🔴 ĐANG PHÁT TRÊN MÀN HÌNH CHIẾU' : '⏹️ ĐÃ TẮT NHẠC RẠP'}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 bg-[#38050b] border border-[#d4af37]/40 px-2 py-0.5 rounded text-[10px] text-[#fef08a] font-mono">
                  <span>⏱️ Bắt đầu từ 01:33</span>
                </div>
              </div>

              {/* Center Spinning Film Reel / Disc & Song Title Display */}
              <div className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 my-auto text-center sm:text-left">
                {/* Glowing Spinning Film Reel Graphic */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#991b1b] via-[#38050b] to-[#120103] border-2 border-[#facc15] flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.4)] ${isPlayingMusic ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
                    <FilmReelSvg className="w-14 h-14 sm:w-16 sm:h-16 text-[#fde047]" />
                  </div>
                  {isPlayingMusic && (
                    <span className="absolute w-4 h-4 rounded-full bg-[#fde047] animate-ping opacity-75" />
                  )}
                </div>

                {/* Song Meta Information */}
                <div className="space-y-1 max-w-sm">
                  <div className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-[#fca5a5] flex items-center gap-1.5 justify-center sm:justify-start">
                    <span>NHẠC PHIM TRUYỀN CẢM HỨNG</span>
                    <span className="bg-[#720e1e] text-[#fde047] text-[9px] px-1.5 py-0.5 rounded border border-[#facc15]/40 font-semibold">01:33 Chorus</span>
                  </div>
                  <h3 className="font-playfair text-base sm:text-xl font-bold text-[#fde047]">
                    Phonecert (폰서트)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#fef08a]/90 font-medium">
                    10CM (십센치) x Hoàng Dũng
                  </p>
                  <div className="text-[11px] text-[#fca5a5]/80 font-light italic pt-0.5">
                    "Phát trực tiếp từ phút 01:33 dành riêng cho Lemon Cinema"
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Music Control Panel directly on Screen */}
              <div className="relative z-20 pt-2 border-t border-[#4a0711] flex items-center justify-between gap-2">
                {/* Animated Audio Equalizer Visualizer */}
                <div className="flex items-end gap-1 h-5 w-16 shrink-0">
                  {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.3].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 bg-gradient-to-t from-[#991b1b] to-[#facc15] rounded-t transition-all ${
                        isPlayingMusic ? 'animate-pulse' : 'opacity-40'
                      }`}
                      style={{
                        height: isPlayingMusic ? `${Math.max(25, h * 100)}%` : '20%',
                        animationDelay: `${i * 0.12}s`
                      }}
                    />
                  ))}
                </div>

                {/* MAIN STOP / PLAY BUTTON */}
                <button
                  onClick={onTogglePlayMusic}
                  className={`px-5 py-2 rounded-full font-playfair text-xs sm:text-sm font-bold flex items-center gap-2 border shadow-lg transition-all cursor-pointer ${
                    isPlayingMusic
                      ? 'bg-gradient-to-r from-[#991b1b] to-[#720e1e] text-[#fffbeb] border-[#facc15] shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:scale-105'
                      : 'bg-gradient-to-r from-[#facc15] to-[#eab308] text-black border-[#fde047] shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:scale-105'
                  }`}
                  title={isPlayingMusic ? 'Bấm để tắt nhạc' : 'Bấm để phát nhạc từ phút 01:33'}
                >
                  {isPlayingMusic ? (
                    <>
                      <Square className="w-4 h-4 text-[#fde047] fill-[#fde047]" />
                      <span>TẮT NHẠC</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-black fill-black" />
                      <span>PHÁT NHẠC (01:33)</span>
                    </>
                  )}
                </button>

                {/* Sound Mute Toggle */}
                <button
                  onClick={onToggleMuteMusic}
                  className="p-2 rounded-lg bg-[#280408] border border-[#520914] text-[#fca5a5] hover:text-[#facc15] transition-colors cursor-pointer"
                  title={isMutedMusic ? 'Bật âm lượng' : 'Tắt âm lượng'}
                >
                  {isMutedMusic ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#facc15]" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Screen External Link Bar */}
          <div className="relative z-20 w-full max-w-3xl mt-2 flex items-center justify-between text-xs text-[#fca5a5] px-2">
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-[#facc15]" />
              <span className="font-playfair text-[#fde047] font-semibold">
                LEMON CINEMA · MÀN HÌNH ÂM NHẠC TÁI HIỆN
              </span>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#38050b] hover:bg-[#4d0912] border border-[#d4af37]/40 text-[#fde047] font-medium transition-colors"
            >
              <ExternalLink className="w-3 h-3 text-[#facc15]" />
              <span>Xem MV Gốc trên YouTube</span>
            </a>
          </div>

          {/* CINEMA THEATER SEATING ROW (KHÁN PHÒNG RẠP CHIẾU PHIM) */}
          <div className="relative z-20 w-full max-w-3xl mt-6 pt-4 border-t border-[#4a0711] flex flex-col items-center">
            <div className="text-[10px] font-mono tracking-widest text-[#fca5a5]/70 uppercase mb-2">
              KHÁN PHÒNG RẠP CHIẾU LEMON CINEMA
            </div>
            {/* Red Velvet Cinema Seats Rows */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 overflow-x-auto max-w-full pb-1">
              {['A-01', 'A-02', 'A-03', 'VIP-04', 'VIP-05', 'A-06', 'A-07', 'A-08'].map((seat) => (
                <div
                  key={seat}
                  className={`flex flex-col items-center p-1 sm:p-1.5 rounded-t-lg border border-[#520914] text-[9px] sm:text-[10px] font-mono font-semibold transition-all shadow ${
                    seat.startsWith('VIP')
                      ? 'bg-gradient-to-t from-[#800a1a] to-[#991b1b] text-[#fde047] border-[#d4af37]/60'
                      : 'bg-[#200306] text-[#fca5a5]/80 hover:bg-[#38050b]'
                  }`}
                >
                  <div className="w-5 sm:w-7 h-4 sm:h-5 rounded-t bg-[#4a0711] border-t border-[#700818] mb-1 flex items-center justify-center">
                    <span className="text-[7px] sm:text-[8px] text-[#fde047]">💺</span>
                  </div>
                  <span>{seat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. 35MM CELLULOID CHARACTER FILM REEL STRIP */}
      {/* ========================================================= */}
      <div className="relative rounded-2xl bg-[#180205] border-2 border-[#520914] p-4 sm:p-6 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between mb-4 border-b border-[#4a0711] pb-3">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-[#facc15]" />
            <h3 className="font-playfair text-base sm:text-lg font-bold text-[#fde047]">
              CUỘN PHIM 35MM NHÂN VẬT AI
            </h3>
          </div>
          <span className="text-xs font-mono text-[#fca5a5]/80">
            {characters.length} KHUNG HÌNH (FRAMES)
          </span>
        </div>

        {/* Top Sprocket Holes Bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-2 border-b border-[#4a0711] mb-6">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-6 rounded-xs bg-[#2b0408] border border-[#5a0914] shrink-0"
            />
          ))}
        </div>

        {/* Horizontal Film Frames Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((char, index) => {
            const isPresetAvatar = char.avatarUrl?.startsWith('preset:');
            return (
              <div
                key={char.id}
                onClick={() => onOpenDetail(char)}
                className="group relative rounded-xl bg-[#280408] border border-[#520914] hover:border-[#d4af37] p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)] cursor-pointer"
              >
                {/* Frame Header with Roll/Take mark */}
                <div className="flex items-center justify-between text-[11px] font-mono-numbers text-[#fca5a5] mb-2">
                  <span className="text-[#facc15] font-semibold">
                    FRAME #{String(index + 1).padStart(2, '0')}
                  </span>
                  <span>ROLL 35MM · 24FPS</span>
                </div>

                {/* Aspect Poster */}
                <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-[#0e0204] border border-[#520914] mb-3">
                  {isPresetAvatar ? (
                    <PresetAvatarGraphic type={char.avatarUrl || 'preset:noir-detective'} />
                  ) : char.avatarUrl ? (
                    <img
                      src={char.avatarUrl}
                      alt={char.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <PresetAvatarGraphic type="preset:noir-detective" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {char.isNew && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#991b1b] text-[#fef08a] px-2 py-0.5 rounded text-[10px] font-playfair font-bold border border-[#facc15]/40 shadow">
                      <Sparkles className="w-3 h-3 text-[#facc15]" />
                      PREMIUM
                    </div>
                  )}

                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded text-xs text-[#fef08a] backdrop-blur-xs">
                    <Heart className="w-3 h-3 fill-[#facc15] text-[#facc15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                    <span className="font-mono-numbers">{char.saveCount}</span>
                  </div>
                </div>

                {/* Title and Excerpt */}
                <div>
                  <h3 className="font-playfair text-base font-bold text-[#fde047] group-hover:text-[#fef08a] transition-colors truncate mb-1">
                    {char.name}
                  </h3>
                  <p className="text-xs text-[#fecaca]/80 line-clamp-2 mb-3 font-light">
                    {char.description || char.greeting || 'Chưa có tóm tắt kịch bản.'}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-2 border-t border-[#4a0711] flex items-center justify-between text-xs">
                  <span className="text-[#fde047] text-[11px] font-medium truncate max-w-[140px]">
                    {char.tags?.[0] || 'Điện ảnh'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenScript) {
                          onOpenScript(char);
                        } else {
                          onOpenDetail(char);
                        }
                      }}
                      className="text-[#fecaca] hover:text-[#fde047] flex items-center gap-1 cursor-pointer"
                      title="Xem duy nhất phần kịch bản"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#facc15]" />
                      <span>Kịch bản</span>
                    </button>
                    {char.link && (
                      <a
                        href={char.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#facc15] hover:text-[#fef08a] flex items-center gap-1 font-semibold"
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>Xem</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Sprocket Holes Bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-2 border-t border-[#4a0711] mt-6">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-6 rounded-xs bg-[#2b0408] border border-[#5a0914] shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
