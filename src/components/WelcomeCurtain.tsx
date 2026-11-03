import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Film, Ticket } from 'lucide-react';
import { playCurtainGong, playProjectorClick } from '../lib/soundEffects';

interface WelcomeCurtainProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const WelcomeCurtain: React.FC<WelcomeCurtainProps> = ({ isOpen, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenCurtain = () => {
    playCurtainGong();
    playProjectorClick();
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="curtain-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.7 } }}
          className="fixed inset-0 z-50 overflow-hidden select-none bg-[#0a0a0c] cursor-pointer"
          onClick={handleOpenCurtain}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Ambient Projector Light Beam radiating from the top behind the curtain crack */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse 60% 80% at 50% 10%, rgba(253, 224, 71, 0.45), rgba(180, 83, 9, 0.15) 60%, transparent 80%)'
            }}
          />

          {/* Left Velvet Curtain */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{
              x: '-102%',
              transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] }
            }}
            className="absolute top-0 bottom-0 left-0 w-1/2 z-20 shadow-[15px_0_35px_rgba(0,0,0,0.85)] origin-left"
            style={{
              background: `repeating-linear-gradient(
                90deg,
                #3b050b 0px,
                #640913 22px,
                #8f121d 44px,
                #50070e 66px,
                #290306 88px
              )`
            }}
          >
            {/* Satin Sheen Overlay for 3D Pleat Depth */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-soft-light"
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.0) 0px,
                  rgba(255, 255, 255, 0.28) 22px,
                  rgba(255, 255, 255, 0.0) 44px,
                  rgba(0, 0, 0, 0.6) 66px,
                  rgba(0, 0, 0, 0.9) 88px
                )`
              }}
            />

            {/* Left Golden Tieback Rope & Tassel */}
            <div className="absolute top-1/2 left-6 -translate-y-1/2 pointer-events-none hidden md:block">
              <svg width="48" height="120" viewBox="0 0 48 120" fill="none">
                <path d="M4 10 C 24 35, 34 65, 12 110" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
                <path d="M4 10 C 24 35, 34 65, 12 110" stroke="#92400e" strokeWidth="1.5" strokeDasharray="4 4" />
                {/* Tassel head */}
                <ellipse cx="12" cy="75" rx="8" ry="10" fill="#ca8a04" stroke="#fef08a" strokeWidth="1.5" />
                {/* Tassel skirts */}
                <path d="M5 80 L3 115 L21 115 L19 80 Z" fill="#eab308" />
                <line x1="8" y1="82" x2="6" y2="114" stroke="#78350f" strokeWidth="1" />
                <line x1="12" y1="82" x2="12" y2="114" stroke="#fef08a" strokeWidth="1" />
                <line x1="16" y1="82" x2="18" y2="114" stroke="#78350f" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>

          {/* Right Velvet Curtain */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{
              x: '102%',
              transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] }
            }}
            className="absolute top-0 bottom-0 right-0 w-1/2 z-20 shadow-[-15px_0_35px_rgba(0,0,0,0.85)] origin-right"
            style={{
              background: `repeating-linear-gradient(
                90deg,
                #290306 0px,
                #50070e 22px,
                #8f121d 44px,
                #640913 66px,
                #3b050b 88px
              )`
            }}
          >
            {/* Satin Sheen Overlay for 3D Pleat Depth */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-soft-light"
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 0.9) 0px,
                  rgba(0, 0, 0, 0.6) 22px,
                  rgba(255, 255, 255, 0.0) 44px,
                  rgba(255, 255, 255, 0.28) 66px,
                  rgba(255, 255, 255, 0.0) 88px
                )`
              }}
            />

            {/* Right Golden Tieback Rope & Tassel */}
            <div className="absolute top-1/2 right-6 -translate-y-1/2 pointer-events-none hidden md:block">
              <svg width="48" height="120" viewBox="0 0 48 120" fill="none">
                <path d="M44 10 C 24 35, 14 65, 36 110" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
                <path d="M44 10 C 24 35, 14 65, 36 110" stroke="#92400e" strokeWidth="1.5" strokeDasharray="4 4" />
                {/* Tassel head */}
                <ellipse cx="36" cy="75" rx="8" ry="10" fill="#ca8a04" stroke="#fef08a" strokeWidth="1.5" />
                {/* Tassel skirts */}
                <path d="M29 80 L27 115 L45 115 L43 80 Z" fill="#eab308" />
                <line x1="32" y1="82" x2="30" y2="114" stroke="#78350f" strokeWidth="1" />
                <line x1="36" y1="82" x2="36" y2="114" stroke="#fef08a" strokeWidth="1" />
                <line x1="40" y1="82" x2="42" y2="114" stroke="#78350f" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>

          {/* Top Cinema Valance (Drapery Pelmet with Golden Scallops) */}
          <motion.div
            exit={{ y: '-100%', transition: { duration: 0.9, delay: 0.3 } }}
            className="absolute top-0 left-0 right-0 h-16 md:h-20 z-30 pointer-events-none shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
            style={{
              background: `linear-gradient(180deg, #2b0407 0%, #720e1e 65%, #4a0711 100%)`
            }}
          >
            {/* Golden Fringe Border along bottom */}
            <div className="absolute -bottom-2 left-0 right-0 h-3 flex overflow-hidden">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-3 border-b-2 border-r border-[#d4af37] bg-gradient-to-b from-[#ca8a04] to-[#facc15]"
                />
              ))}
            </div>
          </motion.div>

          {/* Center Glowing Neon Marquee Cinema Board / VIP Entry Ticket */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 1.15,
              opacity: 0,
              filter: 'blur(8px)',
              transition: { duration: 0.6 }
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-11/12 max-w-lg"
          >
            <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#181a20] via-[#121418] to-[#0c0d10] border-2 border-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.35),0_20px_40px_rgba(0,0,0,0.9)] text-center transition-all duration-300 group">
              {/* Marquee Glowing Bulbs around the border */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                <div className="absolute top-1 left-2 right-2 flex justify-between">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${
                        i % 2 === 0
                          ? 'bg-[#fef08a] animate-marquee-bulb-odd'
                          : 'bg-[#ca8a04] animate-marquee-bulb-even'
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute bottom-1 left-2 right-2 flex justify-between">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${
                        i % 2 === 0
                          ? 'bg-[#ca8a04] animate-marquee-bulb-even'
                          : 'bg-[#fef08a] animate-marquee-bulb-odd'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Cinema Badge & Tagline */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <Film className="w-4 h-4 text-[#facc15]" />
                <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] text-[#d4af37] uppercase font-semibold">
                  LEMON CINEMA · PREMIERE
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
              </div>

              {/* Hollywood Title */}
              <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fde047] to-[#eab308] tracking-wider mb-2 sm:mb-3 leading-snug drop-shadow-[0_2px_10px_rgba(250,204,21,0.4)]">
                LEMON CINEMA
              </h1>

              {/* Sub-label */}
              <p className="text-[11px] sm:text-xs md:text-sm text-neutral-300 font-light mb-4 sm:mb-6 tracking-wide px-1 sm:px-4 leading-relaxed">
                Không chỉ là xem phim, bạn có thể bắt đầu một cuộc đời mới theo cách mà mình muốn.
              </p>

              {/* Neon Button Action */}
              <div className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-[#991b1b] via-[#7f1d1d] to-[#450a0a] border border-[#fef08a]/60 shadow-[0_0_25px_rgba(220,38,38,0.5)] group-hover:shadow-[0_0_35px_rgba(250,204,21,0.6)] group-hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                <Ticket className="w-4 h-4 text-[#fde047] animate-pulse shrink-0" />
                <span className="font-cinzel text-[11px] sm:text-xs md:text-sm font-bold tracking-wider sm:tracking-widest text-[#fffbeb] uppercase whitespace-nowrap">
                  BẤM ĐỂ VÀO RẠP (TAP TO ENTER)
                </span>
              </div>

              {/* Small Ticket Serial */}
              <div className="mt-4 sm:mt-5 text-[9px] sm:text-[10px] font-mono-numbers text-neutral-400 tracking-wider sm:tracking-widest uppercase">
                FLOP & CHILL · PREMIERE SCREENING · LEMON CINEMA HALL
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
