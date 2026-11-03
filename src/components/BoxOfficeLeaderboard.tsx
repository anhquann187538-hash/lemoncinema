import React, { useState } from 'react';
import { Character } from '../types/character';
import { Trophy, Medal, Film, Heart, Sparkles, BookOpen, ExternalLink, Flame } from 'lucide-react';
import { PresetAvatarGraphic } from './CinemaSvgArt';

interface BoxOfficeLeaderboardProps {
  characters: Character[];
  onOpenDetail: (character: Character) => void;
  onLike: (character: Character) => void;
  genres?: string[];
}

export const BoxOfficeLeaderboard: React.FC<BoxOfficeLeaderboardProps> = ({
  characters,
  onOpenDetail,
  onLike,
  genres = []
}) => {
  // Sort characters strictly by saveCount descending, then order
  const rankedCharacters = [...characters].sort((a, b) => {
    if (b.saveCount !== a.saveCount) {
      return b.saveCount - a.saveCount;
    }
    return (a.order || 999) - (b.order || 999);
  });

  const [filterGenre, setFilterGenre] = useState<string>('Tất cả');

  // Compute active list of genres from props or characters
  const activeGenres = React.useMemo(() => {
    if (genres && genres.length > 0) {
      return genres.includes('Tất cả') ? genres : ['Tất cả', ...genres];
    }
    const fromChars = Array.from(new Set(characters.flatMap(c => c.tags || [])));
    return ['Tất cả', ...fromChars];
  }, [genres, characters]);

  const filteredRanked = filterGenre === 'Tất cả'
    ? rankedCharacters
    : rankedCharacters.filter(c => c.tags?.some(t => t.toLowerCase() === filterGenre.toLowerCase()));

  const top1 = filteredRanked[0];
  const top2 = filteredRanked[1];
  const top3 = filteredRanked[2];
  const restRanked = filteredRanked.slice(3, 10);

  return (
    <div className="space-y-8 pb-12">
      {/* Leaderboard Marquee Header */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#38050b] to-[#1e0205] border border-[#d4af37]/60 p-5 sm:p-7 shadow-[0_4px_30px_rgba(212,175,55,0.25)] overflow-hidden text-center">
        {/* Ambient Projector Beam */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none opacity-25"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, #fde047 0%, transparent 70%)'
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#520914] border border-[#facc15]/50 text-[#fef08a] text-xs font-playfair font-semibold mb-2 shadow">
            <Trophy className="w-4 h-4 text-[#facc15]" />
            <span>ĐẲNG CẤP ĐIỆN ẢNH VÀNG</span>
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fde047] to-[#eab308] tracking-wider mb-2">
            BẢNG VÀNG PHÒNG VÉ
          </h2>

          <p className="text-xs sm:text-sm text-[#fecaca]/90 max-w-xl mx-auto font-light leading-relaxed">
            Bảng xếp hạng tôn vinh những kịch bản và nhân vật AI có doanh thu phòng vé &amp; lượt bình chọn yêu thích cao nhất tại rạp chiếu.
          </p>

          {/* Quick Genre Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4">
            {activeGenres.map((g) => (
              <button
                key={g}
                onClick={() => setFilterGenre(g)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  filterGenre === g
                    ? 'bg-[#991b1b] text-[#fef08a] border border-[#facc15] shadow-[0_0_10px_rgba(250,204,21,0.3)]'
                    : 'bg-[#200306] text-[#fca5a5] border border-[#520914] hover:border-[#d4af37]/60'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Podium Top 3 (Bục Vinh Quang Phòng Vé) */}
      {filteredRanked.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-end pt-4">
          {/* Top 2 - Á Quân (Silver) */}
          {top2 && (
            <div className="order-2 md:order-1 relative rounded-2xl bg-[#220306] border border-slate-300/40 p-4 flex flex-col items-center text-center shadow-lg hover:border-slate-300 transition-all">
              <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-slate-400 to-slate-200 text-slate-900 text-[11px] font-bold font-playfair flex items-center gap-1 shadow">
                <Medal className="w-3.5 h-3.5 text-slate-800" />
                <span>HẠNG 2 · Á QUÂN</span>
              </div>

              {/* Avatar Poster */}
              <div
                onClick={() => onOpenDetail(top2)}
                className="w-24 h-32 rounded-xl overflow-hidden border-2 border-slate-300/60 shadow-md my-3 cursor-pointer group relative shrink-0"
              >
                {top2.avatarUrl?.startsWith('preset:') ? (
                  <PresetAvatarGraphic type={top2.avatarUrl} />
                ) : top2.avatarUrl ? (
                  <img
                    src={top2.avatarUrl}
                    alt={top2.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                ) : (
                  <PresetAvatarGraphic type="preset:noir-detective" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>

              <h3 className="font-playfair text-base font-bold text-[#fde047] truncate w-full mb-1">
                {top2.name}
              </h3>

              <div className="flex items-center gap-1 text-xs text-[#fde047] mb-2 font-mono-numbers">
                <Heart className="w-3.5 h-3.5 fill-[#facc15] text-[#facc15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                <span>{top2.saveCount} lượt bình chọn</span>
              </div>

              <p className="text-[11px] text-[#fecaca]/80 line-clamp-2 mb-3 px-1 font-light">
                {top2.description || top2.greeting}
              </p>

              <div className="flex items-center gap-2 w-full pt-2 border-t border-[#4a0711]">
                {top2.link && (
                  <a
                    href={top2.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1 rounded-lg text-xs bg-slate-700 hover:bg-slate-600 text-white font-medium flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Vào rạp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Top 1 - Quán Quân (Gold) - Center Elevated */}
          {top1 && (
            <div className="order-1 md:order-2 relative rounded-2xl bg-gradient-to-b from-[#3a060d] to-[#250307] border-2 border-[#facc15] p-5 flex flex-col items-center text-center shadow-[0_0_35px_rgba(250,204,21,0.3)] md:-translate-y-3 transition-all">
              <div className="absolute -top-4 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#ca8a04] via-[#facc15] to-[#eab308] text-black text-xs font-black font-playfair flex items-center gap-1.5 shadow-[0_0_15px_rgba(250,204,21,0.6)]">
                <Trophy className="w-4 h-4 text-black" />
                <span>HẠNG 1 · QUÁN QUÂN PHÒNG VÉ</span>
              </div>

              {/* Avatar Poster with Crown Halo */}
              <div
                onClick={() => onOpenDetail(top1)}
                className="w-28 h-36 rounded-xl overflow-hidden border-2 border-[#facc15] shadow-[0_0_20px_rgba(250,204,21,0.4)] my-3.5 cursor-pointer group relative shrink-0"
              >
                {top1.avatarUrl?.startsWith('preset:') ? (
                  <PresetAvatarGraphic type={top1.avatarUrl} />
                ) : top1.avatarUrl ? (
                  <img
                    src={top1.avatarUrl}
                    alt={top1.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                ) : (
                  <PresetAvatarGraphic type="preset:noir-detective" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-amber-400 text-black shadow">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              <h3 className="font-playfair text-lg sm:text-xl font-black text-[#fde047] truncate w-full mb-1">
                {top1.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-[#fde047] mb-2 font-mono-numbers font-bold">
                <Heart className="w-4 h-4 fill-[#facc15] text-[#facc15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                <span>{top1.saveCount} VÉ BÌNH CHỌN VÀNG</span>
              </div>

              <p className="text-xs text-[#fecaca]/90 line-clamp-2 mb-3 px-1 font-light">
                {top1.description || top1.greeting}
              </p>

              <div className="flex items-center gap-2 w-full pt-2.5 border-t border-[#facc15]/40">
                {top1.link && (
                  <a
                    href={top1.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 rounded-lg text-xs bg-gradient-to-r from-[#991b1b] to-[#720e1e] hover:from-[#b91c1c] hover:to-[#991b1b] text-[#fffbeb] font-bold border border-[#facc15]/80 shadow flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Film className="w-3.5 h-3.5 text-[#facc15]" />
                    <span>Vào rạp</span>
                    <ExternalLink className="w-3 h-3 text-[#facc15]" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Top 3 - Quý Quân (Bronze) */}
          {top3 && (
            <div className="order-3 relative rounded-2xl bg-[#220306] border border-amber-600/40 p-4 flex flex-col items-center text-center shadow-lg hover:border-amber-600 transition-all">
              <div className="absolute -top-3.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-700 to-amber-600 text-amber-100 text-[11px] font-bold font-playfair flex items-center gap-1 shadow">
                <Medal className="w-3.5 h-3.5 text-amber-200" />
                <span>HẠNG 3 · QUÝ QUÂN</span>
              </div>

              {/* Avatar Poster */}
              <div
                onClick={() => onOpenDetail(top3)}
                className="w-24 h-32 rounded-xl overflow-hidden border-2 border-amber-600/60 shadow-md my-3 cursor-pointer group relative shrink-0"
              >
                {top3.avatarUrl?.startsWith('preset:') ? (
                  <PresetAvatarGraphic type={top3.avatarUrl} />
                ) : top3.avatarUrl ? (
                  <img
                    src={top3.avatarUrl}
                    alt={top3.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                ) : (
                  <PresetAvatarGraphic type="preset:noir-detective" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>

              <h3 className="font-playfair text-base font-bold text-[#fde047] truncate w-full mb-1">
                {top3.name}
              </h3>

              <div className="flex items-center gap-1 text-xs text-[#fde047] mb-2 font-mono-numbers">
                <Heart className="w-3.5 h-3.5 fill-[#facc15] text-[#facc15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                <span>{top3.saveCount} lượt bình chọn</span>
              </div>

              <p className="text-[11px] text-[#fecaca]/80 line-clamp-2 mb-3 px-1 font-light">
                {top3.description || top3.greeting}
              </p>

              <div className="flex items-center gap-2 w-full pt-2 border-t border-[#4a0711]">
                {top3.link && (
                  <a
                    href={top3.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1 rounded-lg text-xs bg-amber-800 hover:bg-amber-700 text-white font-medium flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Vào rạp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Top 4-10 Leaderboard Table List */}
      {restRanked.length > 0 && (
        <div className="rounded-2xl bg-[#1c0205] border border-[#520914] p-3 sm:p-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#4a0711] mb-3">
            <h4 className="font-playfair text-sm sm:text-base font-bold text-[#fef08a] flex items-center gap-2">
              <Film className="w-4 h-4 text-[#d4af37]" />
              <span>BẢNG XẾP HẠNG TOP 4 - TOP 10</span>
            </h4>
            <span className="text-xs text-[#fca5a5]/70">Cập nhật trực tiếp</span>
          </div>

          <div className="space-y-2">
            {restRanked.map((char, index) => {
              const rankNumber = index + 4;
              return (
                <div
                  key={char.id}
                  onClick={() => onOpenDetail(char)}
                  className="flex items-center justify-between gap-3 p-2 sm:p-3 rounded-xl bg-[#240306] hover:bg-[#32050b] border border-[#4a0711] hover:border-[#d4af37]/60 transition-all cursor-pointer group"
                >
                  {/* Left: Rank & Thumbnail */}
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <span className="w-6 sm:w-7 text-center font-mono-numbers font-bold text-xs sm:text-sm text-[#fca5a5]">
                      #{String(rankNumber).padStart(2, '0')}
                    </span>

                    <div className="w-10 h-12 rounded-lg overflow-hidden border border-[#520914] bg-black shrink-0 relative">
                      {char.avatarUrl?.startsWith('preset:') ? (
                        <PresetAvatarGraphic type={char.avatarUrl} />
                      ) : char.avatarUrl ? (
                        <img
                          src={char.avatarUrl}
                          alt={char.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      ) : (
                        <PresetAvatarGraphic type="preset:noir-detective" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="font-playfair font-bold text-xs sm:text-sm text-[#fde047] group-hover:text-[#fef08a] transition-colors truncate">
                        {char.name}
                      </div>
                      <div className="text-[10px] sm:text-xs text-[#fca5a5]/70 truncate">
                        {char.tags?.join(' · ') || 'Điện ảnh kinh điển'}
                      </div>
                    </div>
                  </div>

                  {/* Right: Box Office Votes & Quick Action */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-[#fde047] font-mono-numbers">
                      <Heart className="w-3.5 h-3.5 fill-[#facc15] text-[#facc15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                      <span>{char.saveCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
