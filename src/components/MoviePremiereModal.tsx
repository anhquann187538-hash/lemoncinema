import React, { useState } from 'react';
import { X, Heart, Sparkles, Film } from 'lucide-react';
import { Character } from '../types/character';
import { playLikeChime } from '../lib/soundEffects';

interface MoviePremiereModalProps {
  character: Character | null;
  onClose: () => void;
  onLike: (character: Character) => void;
}

export const MoviePremiereModal: React.FC<MoviePremiereModalProps> = ({
  character,
  onClose,
  onLike
}) => {
  if (!character) return null;

  const [isLiking, setIsLiking] = useState(false);

  const handleLike = () => {
    if (isLiking) return;
    setIsLiking(true);
    playLikeChime();
    onLike(character);
    setTimeout(() => setIsLiking(false), 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Ambient Projector Beam */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 pointer-events-none opacity-30 animate-projector-flicker"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(254, 240, 138, 0.45), transparent 75%)'
        }}
      />

      {/* Main Projector Screen Modal */}
      <div className="relative w-full max-w-4xl bg-[#200306] border-2 border-[#d4af37]/80 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(155,27,48,0.5)] overflow-hidden my-auto text-neutral-100 flex flex-col max-h-[92vh]">
        {/* Top Cinema Marquee Titlebar */}
        <div className="px-5 sm:px-8 py-4 bg-[#140204] border-b border-[#4a0711] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#720e1e] border border-[#d4af37] flex items-center justify-center shadow">
              <Film className="w-4 h-4 text-[#facc15]" />
            </div>
            <div>
              <span className="font-cinzel text-xs text-[#fde047] tracking-widest uppercase font-semibold">
                LEMON CINEMA · PREMIERE SCREENING
              </span>
              <div className="text-[11px] font-mono-numbers text-[#fca5a5]">
                HALL NO. 1 · TICKET #{String(character.order || 1).padStart(3, '0')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                isLiking
                  ? 'bg-[#720e1e] border-[#facc15] text-[#fef08a] scale-105'
                  : 'bg-[#2b0408] border-[#520914] hover:border-[#facc15]/60 text-[#fef08a]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${character.saveCount > 0 ? 'fill-[#facc15] text-[#facc15] drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-[#facc15]/50'}`} />
              <span className="font-mono-numbers text-[#fef08a]">{character.saveCount}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#38050b] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content: Focused on Info & Story */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 no-scrollbar">
          {/* Character Header Info */}
          <div className="text-center space-y-4">
            {/* Genre Tags & Premium Label */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {character.isNew && (
                <div className="flex items-center gap-1 bg-[#991b1b] text-[#fef08a] px-2.5 py-1 rounded text-[10px] sm:text-xs font-cinzel font-bold tracking-wider shadow border border-[#facc15]/40">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#facc15]" />
                  Vé PREMIUM
                </div>
              )}
              {character.tags && character.tags.length > 0 ? (
                character.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-[#2e050a] border border-[#520914] text-[#fef08a] font-medium text-[11px] sm:text-xs tracking-wide"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 rounded-md bg-[#2e050a] border border-[#520914] text-[#fca5a5] text-[11px] sm:text-xs">
                  Điện ảnh kinh điển
                </span>
              )}
            </div>

            {/* Big Hollywood Title */}
            <h1 className="font-cinzel text-[19px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fde047] to-[#eab308] tracking-wider leading-tight">
              {character.name}
            </h1>
          </div>

          {/* Section: Full Story / Lore / Background */}
          {character.story && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#150204] border border-[#4a0711] shadow-2xl relative overflow-hidden group">
              {/* Subtle film strip decoration */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-repeat-x opacity-20" 
                   style={{ backgroundImage: 'radial-gradient(circle, #4a0711 2px, transparent 2px)', backgroundSize: '12px 100%' }} />
              
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#4a0711]" />
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <Film className="w-5 h-5" />
                  <span className="font-cinzel text-[10px] font-bold tracking-[0.2em] uppercase">
                    (LORE & BACKGROUND)
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#4a0711]" />
              </div>

              <div className="text-[12px] text-[#fecaca]/90 leading-relaxed whitespace-pre-wrap select-text font-light text-center max-w-2xl mx-auto">
                {character.story}
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-repeat-x opacity-20" 
                   style={{ backgroundImage: 'radial-gradient(circle, #4a0711 2px, transparent 2px)', backgroundSize: '12px 100%' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
