import React from 'react';
import { X, ExternalLink, Ticket, Sparkles, Award, Star, MessageSquare, Heart } from 'lucide-react';
import { Character } from '../types/character';

interface TicketPassSelectorModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TicketPassSelectorModal: React.FC<TicketPassSelectorModalProps> = ({
  character,
  isOpen,
  onClose
}) => {
  if (!isOpen || !character) return null;

  const passes = [
    {
      id: 'classic',
      name: 'CLASSIC PASS',
      subtitle: 'Vé Tiêu Chuẩn',
      description: 'Cổng vào phòng chiếu chính, trải nghiệm kịch bản điện ảnh nguyên bản.',
      link: character.link,
      badge: 'TIÊU CHUẨN',
      icon: Ticket,
      gradient: 'from-[#991b1b] via-[#720e1e] to-[#450a0a]',
      borderColor: 'border-[#facc15]',
      textColor: 'text-[#fde047]'
    },
    {
      id: 'golden',
      name: 'GOLDEN PASS',
      subtitle: 'Vé Cao Cấp (Có Bình Luận)',
      description: 'Cổng vào phòng chiếu VIP có kèm diễn đàn thảo luận và bình luận tương tác.',
      link: character.linkComment,
      badge: 'VIP GOLDEN',
      icon: Award,
      gradient: 'from-[#b45309] via-[#854d0e] to-[#451a03]',
      borderColor: 'border-[#fef08a]',
      textColor: 'text-[#fef08a]'
    },
    {
      id: 'alternative',
      name: 'ALTERNATIVE PASS',
      subtitle: 'Phiên bản BL',
      description: 'Cổng vào phòng chiếu phiên bản boylove',
      link: character.linkBL,
      badge: 'TIÊU CHUẨN',
      icon: Star,
      gradient: 'from-[#581c87] via-[#3b0764] to-[#1e1b4b]',
      borderColor: 'border-[#c084fc]',
      textColor: 'text-[#e9d5ff]'
    },
    {
      id: 'romance',
      name: 'ROMANCE PASS',
      subtitle: 'Phiên Bản Lãng Mạn (BG)',
      description: 'Cổng vào phòng chiếu chuyên biệt tuyến tình cảm lãng mạn sâu sắc.',
      link: character.linkBG,
      badge: 'ROMANCE',
      icon: Heart,
      gradient: 'from-[#831843] via-[#701a75] to-[#4a044e]',
      borderColor: 'border-[#f472b6]',
      textColor: 'text-[#fbcfe8]'
    }
  ].filter((p) => Boolean(p.link));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#1c0205] border-2 border-[#d4af37] p-5 sm:p-7 shadow-[0_0_60px_rgba(250,204,21,0.35)] space-y-5 text-neutral-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#fde047]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#4a0711] pb-3">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#991b1b]/80 border border-[#facc15]/50 text-[#fde047] text-[10px] font-mono font-bold uppercase">
              <Sparkles className="w-3 h-3 text-[#facc15]" />
              <span>LEMON CINEMA TICKET SYSTEM</span>
            </div>
            <h3 className="font-playfair text-lg sm:text-xl font-black text-[#fde047]">
              CHỌN HẠNG VÉ XEM PHIM
            </h3>
            <p className="text-xs text-[#fca5a5]">
              Nhân vật: <strong className="text-white">{character.name}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#280408] border border-[#520914] text-[#fca5a5] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pass Options List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
          {passes.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#fca5a5]/80">
              Nhân vật này chưa cập nhật liên kết phòng chiếu.
            </div>
          ) : (
            passes.map((pass) => {
              const IconComp = pass.icon;
              return (
                <a
                  key={pass.id}
                  href={pass.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                  className={`group relative rounded-2xl bg-gradient-to-r ${pass.gradient} border ${pass.borderColor} p-4 flex items-center justify-between gap-3 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(250,204,21,0.3)] cursor-pointer`}
                >
                  <div className="space-y-1 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <IconComp className={`w-4 h-4 ${pass.textColor}`} />
                      <span className={`font-playfair text-sm sm:text-base font-black ${pass.textColor} tracking-wide`}>
                        {pass.name}
                      </span>
                      <span className="px-2 py-0.2 rounded-full bg-black/50 text-[9px] font-mono font-bold text-white border border-white/20 whitespace-nowrap">
                        {pass.badge}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-white/90">
                      {pass.subtitle}
                    </div>

                    <p className="text-[11px] text-white/70 font-light leading-snug">
                      {pass.description}
                    </p>
                  </div>

                  <div className="shrink-0 p-2.5 rounded-xl bg-black/40 border border-white/20 text-white group-hover:scale-110 transition-transform">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </a>
              );
            })
          )}
        </div>

        <div className="text-center text-[10px] font-mono text-[#fca5a5]/60 pt-1">
          LEMON CINEMA · HỆ THỐNG VÉ CHIẾU PHIM THƯỢNG HẠNG
        </div>
      </div>
    </div>
  );
};
