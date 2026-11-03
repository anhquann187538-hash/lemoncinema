import React, { useState } from 'react';
import { X, BookOpen, Copy, Check } from 'lucide-react';
import { Character } from '../types/character';

interface MovieScriptModalProps {
  character: Character | null;
  onClose: () => void;
}

export const MovieScriptModal: React.FC<MovieScriptModalProps> = ({ character, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!character) return null;

  const scriptContent = character.story?.trim() || character.description?.trim() || character.greeting?.trim() || 'Chưa có nội dung kịch bản cho nhân vật này.';

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(scriptContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Script Screen Modal Window */}
      <div className="relative w-full max-w-3xl bg-[#1e0205] border-2 border-[#d4af37]/80 rounded-2xl sm:rounded-3xl shadow-[0_0_70px_rgba(212,175,55,0.35)] overflow-hidden my-auto text-neutral-100 flex flex-col max-h-[90vh]">
        
        {/* Top Header Bar */}
        <div className="px-5 sm:px-7 py-4 bg-[#140204] border-b border-[#4a0711] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#720e1e] border border-[#d4af37] flex items-center justify-center shadow shrink-0">
              <BookOpen className="w-4 h-4 text-[#facc15]" />
            </div>
            <div className="min-w-0">
              <h2 className="font-playfair text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fde047] to-[#eab308] truncate">
                {character.name}
              </h2>
              <div className="text-[11px] font-mono-numbers text-[#fca5a5]/80 uppercase tracking-wider">
                KỊCH BẢN ĐIỆN ẢNH · LEMON CINEMA
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyScript}
              className="px-2.5 py-1.5 rounded-lg bg-[#2e050a] hover:bg-[#3d070e] text-xs text-[#fef08a] border border-[#520914] hover:border-[#d4af37] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sao chép toàn bộ kịch bản"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-medium hidden xs:inline">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#facc15]" />
                  <span className="hidden xs:inline">Sao chép</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#38050b] transition-colors cursor-pointer"
              title="Đóng kịch bản"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Script Body: ONLY displays the screenplay / script content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-4">
          <div className="p-5 sm:p-7 rounded-2xl bg-[#140204] border border-[#d4af37]/40 shadow-inner">
            <div className="text-xs font-mono-numbers text-[#facc15] tracking-widest uppercase mb-3 pb-2 border-b border-[#38040a] flex items-center justify-between">
              <span>SCENE &amp; LORE ARCHIVE</span>
            </div>

            <div className="text-xs sm:text-sm md:text-[15px] text-[#fffbeb] leading-relaxed whitespace-pre-wrap font-light select-text font-sans-vietnam">
              {scriptContent}
            </div>
          </div>
        </div>

        {/* Subtle Footer Bar */}
        <div className="px-5 sm:px-7 py-3 bg-[#140204] border-t border-[#4a0711] flex items-center justify-between text-[11px] font-mono-numbers text-[#fca5a5]/70 shrink-0">
          <span>LEMON CINEMA ARCHIVE · SCRIPT ONLY</span>
          <span>TICKET #{String(character.order || 1).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  );
};
