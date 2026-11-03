import React from 'react';
import { Search, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { CinemaGenre, SortOption } from '../types/character';
import { FilmReelSvg } from './CinemaSvgArt';

interface MarqueeFilterBoardProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedGenre: CinemaGenre;
  onGenreSelect: (genre: CinemaGenre) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  showOnlyNew: boolean;
  onToggleNewOnly: () => void;
  genres?: string[];
}

const DEFAULT_GENRES: string[] = [
  'Tất cả',
  'Trinh thám & Noir',
  'Cyberpunk',
  'Khoa học viễn tưởng',
  'Kinh dị & Gothic',
  'Huyền huyễn',
  'Cổ trang',
  'Hành động',
  'Lãng mạn',
  'Kịch tính',
  'Giả tưởng'
];

export const MarqueeFilterBoard: React.FC<MarqueeFilterBoardProps> = ({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreSelect,
  sortBy,
  onSortChange,
  showOnlyNew,
  onToggleNewOnly,
  genres = DEFAULT_GENRES
}) => {
  return (
    <div className="w-full mb-8">
      {/* Hollywood Cinema Marquee Board Header with Red Cinema Velvet Background */}
      <div className="relative rounded-2xl bg-[#200306] border-2 border-[#d4af37]/70 p-4 sm:p-6 shadow-[0_0_40px_rgba(155,27,48,0.35)]">
        {/* Decorative Marquee Light Bulbs along Top Edge */}
        <div className="absolute top-1 left-4 right-4 flex justify-between pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i % 2 === 0
                  ? 'bg-[#fef08a] animate-marquee-bulb-odd'
                  : 'bg-[#ca8a04] animate-marquee-bulb-even'
              }`}
            />
          ))}
        </div>

        {/* Board Search & Controls Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mt-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm kiếm nhân vật theo tên, kịch bản, thể loại..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#140204] border border-[#520914] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-neutral-100 placeholder-[#fca5a5]/50 text-sm transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters & Sorting Controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Premium Ticket Toggle */}
            <button
              onClick={onToggleNewOnly}
              className={`px-3 py-2 rounded-xl text-xs font-cinzel font-semibold tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap ${
                showOnlyNew
                  ? 'bg-[#991b1b] text-[#fef08a] border border-[#d4af37] shadow-[0_0_15px_rgba(220,38,38,0.6)]'
                  : 'bg-[#140204] text-[#fca5a5] border border-[#520914] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
              <span>Chỉ Vé PREMIUM</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-1 bg-[#140204] border border-[#520914] rounded-xl px-2.5 py-1.5 text-xs text-[#fca5a5]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37] mr-1 shrink-0" />
              <span className="text-[#fca5a5]/70 hidden sm:inline">Xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                aria-label="Sắp xếp danh sách nhân vật"
                className="bg-transparent text-neutral-100 text-xs outline-none cursor-pointer pr-1"
              >
                <option value="order" className="bg-[#200306]">Thứ Tự Chiếu</option>
                <option value="likes" className="bg-[#200306]">Bảng Xếp Hạng (Bình Chọn Cao)</option>
                <option value="newest" className="bg-[#200306]">Mới Nhất</option>
                <option value="name" className="bg-[#200306]">Tên Phim A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Film Reel Genre Filter Strip */}
        <div className="mt-4 pt-3 border-t border-[#4a0711] flex flex-wrap sm:flex-nowrap items-center gap-2 sm:overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1.5 shrink-0 text-[#fca5a5] text-xs mr-1 w-full sm:w-auto mb-1 sm:mb-0">
            <FilmReelSvg className="w-4 h-4 text-[#d4af37]" />
            <span className="font-cinzel text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold">Thể loại:</span>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            {genres.map((genre) => {
              const isSelected = selectedGenre === genre;
              return (
                <button
                  key={genre}
                  onClick={() => onGenreSelect(genre)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium tracking-wide whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#8f121d] text-[#fef08a] border border-[#d4af37] shadow'
                      : 'bg-[#140204] text-[#fca5a5] border border-[#520914] hover:text-white hover:border-[#720e1e]'
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
