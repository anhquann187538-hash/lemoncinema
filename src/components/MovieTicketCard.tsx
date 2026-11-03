import React, { useState } from 'react';
import { ExternalLink, Heart, Film, Sparkles, BookOpen, Edit2, Trash2, Trophy, Medal, Ticket } from 'lucide-react';
import { Character } from '../types/character';
import { BarcodeSvg, PresetAvatarGraphic } from './CinemaSvgArt';
import { playLikeChime } from '../lib/soundEffects';
import { TicketPassSelectorModal } from './TicketPassSelectorModal';

interface MovieTicketCardProps {
  character: Character;
  onOpenDetail: (character: Character) => void;
  onLike: (character: Character) => void;
  isAdmin?: boolean;
  onEdit?: (character: Character) => void;
  onDelete?: (charId: string, charName: string) => void;
  rank?: number;
}

export const MovieTicketCard: React.FC<MovieTicketCardProps> = ({
  character,
  onOpenDetail,
  onLike,
  isAdmin = false,
  onEdit,
  onDelete,
  rank
}) => {
  const [isLiking, setIsLiking] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiking) return;
    setIsLiking(true);
    playLikeChime();
    onLike(character);
    setTimeout(() => setIsLiking(false), 600);
  };

  const formatTicketNumber = (num: number) => {
    return `TKT #${String(num).padStart(3, '0')}`;
  };

  const formatSeatNumber = (num: number) => {
    const row = String.fromCharCode(65 + ((num - 1) % 8)); // A - H
    const seat = ((num * 3) % 24) + 1;
    return `SEAT ${row}-${seat}`;
  };

  const isPresetAvatar = character.avatarUrl?.startsWith('preset:');

  const stubRef = React.useRef<HTMLDivElement>(null);
  const [stubWidth, setStubWidth] = React.useState<number>(144);

  React.useLayoutEffect(() => {
    const updateWidth = () => {
      if (stubRef.current) {
        setStubWidth(stubRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const stubW = stubWidth || 144;

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: `radial-gradient(circle 12px at ${stubW}px 0px, transparent 11.5px, #000 12px), radial-gradient(circle 12px at ${stubW}px 100%, transparent 11.5px, #000 12px)`,
    WebkitMaskComposite: 'destination-in',
    maskImage: `radial-gradient(circle 12px at ${stubW}px 0px, transparent 11.5px, #000 12px), radial-gradient(circle 12px at ${stubW}px 100%, transparent 11.5px, #000 12px)`,
    maskComposite: 'intersect',
  };

  return (
    <>
      <div
        onClick={() => onOpenDetail(character)}
        style={maskStyle}
        className="group relative flex flex-row bg-[#240306] hover:bg-[#32050b] border border-[#520914] hover:border-[#d4af37]/80 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-[0_8px_30px_rgba(212,175,55,0.22)] transition-all duration-300 cursor-pointer text-neutral-100 min-h-[142px] max-h-[178px] sm:min-h-[155px] sm:max-h-[185px] select-none"
      >
        {/* ================= LEFT: COMPACT TICKET STUB ================= */}
        <div
          ref={stubRef}
          className="relative w-24 xs:w-28 sm:w-36 md:w-40 shrink-0 bg-[#190205] p-2 sm:p-2.5 flex flex-col justify-between items-center rounded-l-xl sm:rounded-l-2xl"
        >
          {/* Full-bleed Avatar filling the entire ticket stub */}
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-l-xl sm:rounded-l-2xl pointer-events-none">
            {isPresetAvatar ? (
              <PresetAvatarGraphic type={character.avatarUrl || 'preset:noir-detective'} />
            ) : character.avatarUrl ? (
              <img
                src={character.avatarUrl}
                alt={character.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <PresetAvatarGraphic type="preset:noir-detective" />
            )}

            {/* Film Grain & Dark Gradient Overlay for ticket readability */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/95 via-black/40 to-black/30" />
          </div>

          {/* Top Badges Row (Overlaid on avatar) */}
          <div className="relative z-10 w-full flex items-center justify-between pointer-events-none">
            {/* PREMIUM Badge (if isNew) */}
            {character.isNew ? (
              <div className="flex items-center gap-0.5 bg-[#991b1b] text-[#fef08a] px-1 py-0.2 rounded text-[7px] sm:text-[8px] font-playfair font-bold tracking-wider shadow border border-[#facc15]/40">
                <Sparkles className="w-2 h-2 text-[#facc15]" />
                <span>PREMIUM</span>
              </div>
            ) : <div />}

            {/* Box Office Rank Badge (Top 1, 2, 3 or Top 10) */}
            {rank && rank <= 10 && (
              <div>
                {rank === 1 && (
                  <div className="px-1 py-0.2 rounded bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[7px] sm:text-[8px] font-black font-playfair flex items-center gap-0.5 shadow">
                    <Trophy className="w-2 h-2 text-black" />
                    <span>TOP 1</span>
                  </div>
                )}
                {rank === 2 && (
                  <div className="px-1 py-0.2 rounded bg-gradient-to-r from-slate-300 to-slate-100 text-slate-900 text-[7px] sm:text-[8px] font-bold font-playfair flex items-center gap-0.5 shadow">
                    <Medal className="w-2 h-2 text-slate-800" />
                    <span>TOP 2</span>
                  </div>
                )}
                {rank === 3 && (
                  <div className="px-1 py-0.2 rounded bg-gradient-to-r from-amber-700 to-amber-600 text-amber-100 text-[7px] sm:text-[8px] font-bold font-playfair flex items-center gap-0.5 shadow">
                    <Medal className="w-2 h-2 text-amber-200" />
                    <span>TOP 3</span>
                  </div>
                )}
                {rank > 3 && (
                  <div className="px-1 py-0.2 rounded bg-[#38050b]/90 text-[#fde047] border border-[#d4af37]/40 text-[7px] sm:text-[8px] font-mono-numbers font-semibold">
                    #{rank}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Seat Number & Barcode Area at bottom of stub */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center mt-auto pt-1">
            <div className="w-full flex items-center justify-between text-[7px] sm:text-[8px] font-mono-numbers text-[#fde047] font-semibold px-0.5 mb-0.5">
              <span className="bg-black/70 px-1 py-0.2 rounded backdrop-blur-xs">
                {formatSeatNumber(character.order || 1)}
              </span>
              <span className="text-[#fca5a5] font-semibold tracking-wider">
                {formatTicketNumber(character.order || 1)}
              </span>
            </div>
            <div className="w-full bg-black/60 backdrop-blur-[2px] rounded p-0.5 flex items-center justify-center border border-black/40">
              <BarcodeSvg
                code={`${formatTicketNumber(character.order || 1)}`}
                className="w-full max-w-[84px] sm:max-w-[110px] h-3.5 sm:h-4 text-[#fca5a5]"
              />
            </div>
          </div>

          {/* ================= VERTICAL PERFORATED DASHED LINE ================= */}
          <div
            className="absolute top-[12px] bottom-[12px] border-r border-dashed border-[#5a0914] group-hover:border-[#d4af37]/60 pointer-events-none"
            style={{ left: `${stubWidth}px` }}
          />

          {/* TOP NOTCH */}
          <svg
            width="24"
            height="14"
            viewBox="0 0 24 14"
            className="absolute -top-[1px] z-20 pointer-events-none"
            style={{ left: `${stubWidth - 12}px` }}
          >
            <path
              d="M 0,0.5 A 12,12 0 0,0 24,0.5"
              fill="none"
              stroke="#520914"
              strokeWidth="1.5"
              className="group-hover:stroke-[#d4af37]/80 transition-colors"
            />
          </svg>

          {/* BOTTOM NOTCH */}
          <svg
            width="24"
            height="14"
            viewBox="0 0 24 14"
            className="absolute -bottom-[1px] z-20 pointer-events-none"
            style={{ left: `${stubWidth - 12}px` }}
          >
            <path
              d="M 0,13.5 A 12,12 0 0,1 24,13.5"
              fill="none"
              stroke="#520914"
              strokeWidth="1.5"
              className="group-hover:stroke-[#d4af37]/80 transition-colors"
            />
          </svg>
        </div>

        {/* ================= RIGHT: TICKET BODY ================= */}
        <div className="flex-1 min-w-0 p-2.5 sm:p-3.5 flex flex-col justify-between overflow-hidden rounded-r-xl sm:rounded-r-2xl font-sans-vietnam">
          <div>
            {/* Header Row: Category Tags and Box Office Likes */}
            <div className="flex items-center justify-between gap-1.5 mb-1">
              {/* Genre tags */}
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-[#fca5a5]/80 overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
                {character.tags && character.tags.length > 0 ? (
                  character.tags.slice(0, 2).map((tag, idx) => (
                    <React.Fragment key={tag}>
                      {idx > 0 && <span className="text-[#7f1d1d]" aria-hidden="true">·</span>}
                      <span className="text-[#fde047] font-medium tracking-wide truncate">{tag}</span>
                    </React.Fragment>
                  ))
                ) : (
                  <span className="text-[#fde047] font-medium">Điện ảnh kinh điển</span>
                )}
              </div>

              {/* Box Office Likes Button */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded border transition-all shrink-0 cursor-pointer ${
                  isLiking
                    ? 'scale-105 bg-[#720e1e] border-[#facc15] text-[#fef08a]'
                    : 'bg-[#180205] border-[#520914] hover:border-[#facc15]/60 text-[#fef08a]'
                }`}
                title="Thả tim vàng / Bình chọn phòng vé"
              >
                <Heart
                  className={`w-3 h-3 ${
                    character.saveCount > 0 ? 'fill-[#facc15] text-[#facc15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-[#facc15]/50'
                  }`}
                />
                <span className="font-mono-numbers font-semibold text-[#fef08a]">
                  {character.saveCount}
                </span>
              </button>
            </div>

            {/* Hollywood Character Title in Luxurious Gold */}
            <h2 className="font-sans-vietnam text-sm sm:text-base font-bold tracking-normal text-[#fde047] group-hover:text-[#fef08a] transition-colors truncate mb-0.5 sm:mb-1">
              {character.name}
            </h2>

            {/* Story Summary */}
            <div className="mt-1 sm:mt-1.5">
              <p className="text-[10px] sm:text-xs text-[#fecaca]/90 line-clamp-2 leading-relaxed font-light">
                {character.description || 'Chưa có tóm tắt nội dung kịch bản cho bộ phim này.'}
              </p>
            </div>
          </div>

          {/* Action Controls Row */}
          <div className="pt-1.5 sm:pt-2 border-t border-[#4a0711]/80 flex items-center justify-end gap-1.5">
            {/* Right Action: Pass Selection / Enter Cinema Screen */}
            <div className="flex items-center gap-1.5 shrink-0">
              {isAdmin && (
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onEdit) onEdit(character);
                    }}
                    className="p-1 rounded text-[#fca5a5] hover:text-[#facc15] hover:bg-[#38050b] transition-colors cursor-pointer"
                    title="Chỉnh sửa nhân vật"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onDelete) onDelete(character.id, character.name);
                    }}
                    className="p-1 rounded text-[#fca5a5] hover:text-red-300 hover:bg-[#38050b] transition-colors cursor-pointer"
                    title="Xóa vé nhân vật"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Pass Selector Trigger Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPassModalOpen(true);
                }}
                className="px-2.5 py-1 rounded text-[10px] sm:text-xs font-playfair font-bold tracking-wider bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-[#720e1e] hover:from-[#b91c1c] hover:to-[#991b1b] text-[#fffbeb] border border-[#facc15]/60 shadow-[0_0_12px_rgba(250,204,21,0.35)] flex items-center gap-1 transition-all shrink-0 cursor-pointer hover:scale-105"
                title="Bấm để chọn loại vé chiếu phim (CLASSIC, GOLDEN, ALTERNATIVE...)"
              >
                <Ticket className="w-3 h-3 text-[#facc15]" />
                <span>CHỌN VÉ</span>
                <ExternalLink className="w-2.5 h-2.5 text-[#facc15]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Pass Selector Modal */}
      <TicketPassSelectorModal
        character={character}
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
      />
    </>
  );
};
