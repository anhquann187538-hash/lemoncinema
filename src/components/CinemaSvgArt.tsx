import React from 'react';

/**
 * 100% Code-Drawn Vector Art (SVG) for the Cinema Character Vault.
 * Complies strictly with the requirement: Zero external stock or AI images.
 */

// Vintage Barcode Graphic
export const BarcodeSvg: React.FC<{ code?: string; className?: string }> = ({
  code = 'TKT-8849-0194',
  className = 'w-full h-10'
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 40"
        className="w-full h-8 fill-current opacity-85"
        preserveAspectRatio="none"
      >
        {/* Repeating bar patterns of varying thicknesses */}
        <rect x="0" y="0" width="3" height="40" />
        <rect x="5" y="0" width="1" height="40" />
        <rect x="8" y="0" width="4" height="40" />
        <rect x="14" y="0" width="2" height="40" />
        <rect x="18" y="0" width="1" height="40" />
        <rect x="22" y="0" width="3" height="40" />
        <rect x="27" y="0" width="5" height="40" />
        <rect x="34" y="0" width="2" height="40" />
        <rect x="38" y="0" width="1" height="40" />
        <rect x="42" y="0" width="4" height="40" />
        <rect x="48" y="0" width="2" height="40" />
        <rect x="53" y="0" width="3" height="40" />
        <rect x="58" y="0" width="1" height="40" />
        <rect x="62" y="0" width="4" height="40" />
        <rect x="68" y="0" width="2" height="40" />
        <rect x="73" y="0" width="5" height="40" />
        <rect x="80" y="0" width="1" height="40" />
        <rect x="83" y="0" width="3" height="40" />
        <rect x="88" y="0" width="2" height="40" />
        <rect x="92" y="0" width="4" height="40" />
        <rect x="98" y="0" width="1" height="40" />
        <rect x="102" y="0" width="5" height="40" />
        <rect x="109" y="0" width="2" height="40" />
        <rect x="113" y="0" width="1" height="40" />
        <rect x="116" y="0" width="3" height="40" />
        <rect x="121" y="0" width="4" height="40" />
        <rect x="127" y="0" width="2" height="40" />
        <rect x="131" y="0" width="1" height="40" />
        <rect x="134" y="0" width="5" height="40" />
        <rect x="141" y="0" width="3" height="40" />
        <rect x="146" y="0" width="1" height="40" />
        <rect x="149" y="0" width="4" height="40" />
        <rect x="155" y="0" width="2" height="40" />
        <rect x="160" y="0" width="3" height="40" />
        <rect x="165" y="0" width="1" height="40" />
        <rect x="168" y="0" width="5" height="40" />
        <rect x="175" y="0" width="2" height="40" />
        <rect x="179" y="0" width="4" height="40" />
        <rect x="185" y="0" width="1" height="40" />
        <rect x="188" y="0" width="3" height="40" />
        <rect x="193" y="0" width="2" height="40" />
        <rect x="197" y="0" width="3" height="40" />
      </svg>
    </div>
  );
};

// Vintage 35mm Film Reel Icon / Graphic
export const FilmReelSvg: React.FC<{ className?: string; spinning?: boolean }> = ({
  className = 'w-8 h-8',
  spinning = false
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} ${spinning ? 'animate-film-spin' : ''}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="46" stroke="#d4af37" strokeWidth="4" fill="#181a20" />
      <circle cx="50" cy="50" r="41" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 3" />
      {/* Outer Rim Notches */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <circle
          key={i}
          cx={50 + 31 * Math.cos((angle * Math.PI) / 180)}
          cy={50 + 31 * Math.sin((angle * Math.PI) / 180)}
          r="8"
          fill="#0c0d10"
          stroke="#d4af37"
          strokeWidth="2"
        />
      ))}
      {/* Center hub */}
      <circle cx="50" cy="50" r="16" fill="#720e1e" stroke="#d4af37" strokeWidth="3" />
      <circle cx="50" cy="50" r="6" fill="#d4af37" />
    </svg>
  );
};

// Clapperboard Movie Icon
export const ClapperboardSvg: React.FC<{ className?: string }> = ({
  className = 'w-6 h-6'
}) => {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top angled hinge */}
      <path
        d="M6 14L42 8L40 14L4 20L6 14Z"
        fill="#991b1b"
        stroke="#d4af37"
        strokeWidth="1.5"
      />
      {/* Stripes on top clap */}
      <path d="M12 13L16 12L14 18L10 19L12 13Z" fill="#fef08a" />
      <path d="M22 11.5L26 10.8L24 16.8L20 17.5L22 11.5Z" fill="#fef08a" />
      <path d="M32 9.8L36 9.1L34 15.1L30 15.8L32 9.8Z" fill="#fef08a" />
      {/* Board Body */}
      <rect x="4" y="18" width="40" height="24" rx="2" fill="#18181b" stroke="#d4af37" strokeWidth="2" />
      {/* Board labels */}
      <line x1="8" y1="28" x2="40" y2="28" stroke="#52525b" strokeWidth="1" />
      <line x1="22" y1="18" x2="22" y2="42" stroke="#52525b" strokeWidth="1" />
      <text x="7" y="25" fill="#d4af37" fontSize="5" fontFamily="sans-serif" fontWeight="bold">SCENE</text>
      <text x="25" y="25" fill="#d4af37" fontSize="5" fontFamily="sans-serif" fontWeight="bold">TAKE</text>
      <text x="7" y="36" fill="#a1a1aa" fontSize="4.5" fontFamily="sans-serif">PROD. VAULT</text>
    </svg>
  );
};

// Projector Beam & Machine Graphic
export const ProjectorMachineGraphic: React.FC<{ className?: string }> = ({
  className = 'w-full h-32'
}) => {
  return (
    <div className={`relative overflow-hidden flex flex-col items-center justify-center ${className}`}>
      {/* Ambient Projector Light Beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-72 md:w-96 h-48 pointer-events-none opacity-40 animate-projector-flicker"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, rgba(254, 240, 138, 0) 0deg, rgba(254, 240, 138, 0.45) 25deg, rgba(250, 204, 21, 0.6) 30deg, rgba(254, 240, 138, 0.45) 35deg, rgba(254, 240, 138, 0) 60deg)',
          filter: 'blur(8px)'
        }}
      />
      {/* Machine SVG */}
      <svg viewBox="0 0 240 80" className="w-56 h-20 relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
        {/* Left Reel */}
        <g transform="translate(45, 26)">
          <circle cx="0" cy="0" r="22" fill="#181a20" stroke="#d4af37" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="7" fill="#720e1e" stroke="#fef08a" strokeWidth="1.5" />
          {[0, 60, 120, 180, 240, 300].map((a, i) => (
            <circle
              key={i}
              cx={14 * Math.cos((a * Math.PI) / 180)}
              cy={14 * Math.sin((a * Math.PI) / 180)}
              r="3.5"
              fill="#0d0f12"
              stroke="#d4af37"
              strokeWidth="1"
            />
          ))}
        </g>
        {/* Right Reel */}
        <g transform="translate(105, 22)">
          <circle cx="0" cy="0" r="18" fill="#181a20" stroke="#d4af37" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="6" fill="#720e1e" stroke="#fef08a" strokeWidth="1.5" />
          {[0, 72, 144, 216, 288].map((a, i) => (
            <circle
              key={i}
              cx={11 * Math.cos((a * Math.PI) / 180)}
              cy={11 * Math.sin((a * Math.PI) / 180)}
              r="2.8"
              fill="#0d0f12"
              stroke="#d4af37"
              strokeWidth="1"
            />
          ))}
        </g>
        {/* Projector Body Base */}
        <rect x="55" y="36" width="90" height="34" rx="4" fill="#27272a" stroke="#d4af37" strokeWidth="2" />
        {/* Cooling vents */}
        <line x1="65" y1="46" x2="85" y2="46" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
        <line x1="65" y1="52" x2="85" y2="52" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
        <line x1="65" y1="58" x2="85" y2="58" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
        {/* Optical Glass Lens */}
        <path d="M145 44 L165 40 L165 66 L145 62 Z" fill="#3f3f46" stroke="#d4af37" strokeWidth="1.5" />
        <ellipse cx="165" cy="53" rx="4" ry="13" fill="#fef08a" className="animate-pulse" />
        {/* Projector Stand */}
        <line x1="80" y1="70" x2="70" y2="78" stroke="#a1a1aa" strokeWidth="3" />
        <line x1="120" y1="70" x2="130" y2="78" stroke="#a1a1aa" strokeWidth="3" />
      </svg>
    </div>
  );
};

// Preset Cinematic Vector Character Avatars (100% SVG code)
export const PresetAvatarGraphic: React.FC<{
  type: string;
  className?: string;
}> = ({ type, className = 'w-full h-full' }) => {
  const normType = type.replace('preset:', '').toLowerCase();

  switch (normType) {
    case 'film-reel-gold':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="reelBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38050b" />
              <stop offset="60%" stopColor="#1a0205" />
              <stop offset="100%" stopColor="#090102" />
            </linearGradient>
            <radialGradient id="reelGoldGlow" cx="0.5" cy="0.45" r="0.55">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#720e1e" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="200" height="240" fill="url(#reelBg)" />
          {/* Golden Spotlight Glow */}
          <circle cx="100" cy="110" r="85" fill="url(#reelGoldGlow)" />
          {/* Celluloid Film Strip Ribbon Spiraling Out */}
          <path
            d="M 20 210 Q 50 160 100 180 T 180 140"
            stroke="#1c1917"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 20 210 Q 50 160 100 180 T 180 140"
            stroke="#d4af37"
            strokeWidth="20"
            fill="none"
            strokeDasharray="4 6"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Main 35mm Gold Film Reel Disc */}
          <g transform="translate(100, 105)">
            <circle cx="0" cy="0" r="65" fill="#180306" stroke="#d4af37" strokeWidth="6" />
            <circle cx="0" cy="0" r="58" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Outer Rim Film Windows */}
            {[0, 60, 120, 180, 240, 300].map((deg, idx) => (
              <circle
                key={idx}
                cx={42 * Math.cos((deg * Math.PI) / 180)}
                cy={42 * Math.sin((deg * Math.PI) / 180)}
                r="12"
                fill="#0d0102"
                stroke="#d4af37"
                strokeWidth="2.5"
              />
            ))}
            {/* Center Reel Hub */}
            <circle cx="0" cy="0" r="22" fill="#991b1b" stroke="#facc15" strokeWidth="4" />
            <circle cx="0" cy="0" r="8" fill="#fef08a" />
          </g>
          {/* Sparkles */}
          <polygon points="40,40 43,48 51,51 43,54 40,62 37,54 29,51 37,48" fill="#fde047" />
          <polygon points="165,60 167,65 172,67 167,69 165,74 163,69 158,67 163,65" fill="#fde047" />
        </svg>
      );

    case 'movie-camera-vintage':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cameraBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#280408" />
              <stop offset="60%" stopColor="#120103" />
              <stop offset="100%" stopColor="#050001" />
            </linearGradient>
            <linearGradient id="lensBeam" x1="0" y1="0" x2="1" y2="0.3">
              <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#facc15" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="200" height="240" fill="url(#cameraBg)" />
          {/* Projected Light Cone Beam */}
          <polygon points="135,95 200,60 200,130" fill="url(#lensBeam)" />

          {/* Wooden Tripod Legs */}
          <line x1="100" y1="140" x2="40" y2="230" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
          <line x1="100" y1="140" x2="100" y2="235" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
          <line x1="100" y1="140" x2="160" y2="230" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
          <path d="M 60 190 L 140 190" stroke="#d4af37" strokeWidth="2.5" />

          {/* Hollywood Vintage Camera Body */}
          {/* Top Twin Film Magazine Reels */}
          <circle cx="70" cy="55" r="26" fill="#18181b" stroke="#d4af37" strokeWidth="3" />
          <circle cx="70" cy="55" r="8" fill="#991b1b" stroke="#facc15" strokeWidth="1.5" />
          <circle cx="115" cy="55" r="26" fill="#18181b" stroke="#d4af37" strokeWidth="3" />
          <circle cx="115" cy="55" r="8" fill="#991b1b" stroke="#facc15" strokeWidth="1.5" />

          {/* Main Metallic Camera Box */}
          <rect x="55" y="75" width="75" height="55" rx="6" fill="#27272a" stroke="#d4af37" strokeWidth="3" />
          {/* Hand Crank Gear */}
          <path d="M 55 102 L 35 102 L 35 120" stroke="#facc15" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="35" cy="120" r="4" fill="#991b1b" />

          {/* Turret Lens System */}
          <rect x="130" y="88" width="12" height="28" rx="2" fill="#3f3f46" stroke="#d4af37" strokeWidth="2" />
          <path d="M 142 90 L 160 84 L 160 120 L 142 114 Z" fill="#18181b" stroke="#facc15" strokeWidth="2" />
          <ellipse cx="160" cy="102" rx="4" ry="17" fill="#fef08a" />

          {/* Viewfinder Scope */}
          <rect x="65" y="68" width="55" height="8" fill="#52525b" stroke="#d4af37" strokeWidth="1" />
        </svg>
      );

    case 'cinema-clapperboard':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="clapBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38050b" />
              <stop offset="60%" stopColor="#1a0205" />
              <stop offset="100%" stopColor="#080001" />
            </linearGradient>
          </defs>
          <rect width="200" height="240" fill="url(#clapBg)" />
          {/* Velvet Stage Curtain Silhouette */}
          <path d="M 0 0 C 40 80 20 180 0 240 L 200 240 C 180 180 160 80 200 0 Z" fill="#240306" />

          {/* Angled Upper Clapper Stick */}
          <g transform="translate(15, 75) rotate(-22)">
            <rect x="0" y="0" width="150" height="22" rx="3" fill="#991b1b" stroke="#d4af37" strokeWidth="2" />
            <path d="M 20 0 L 38 0 L 22 22 L 4 22 Z" fill="#fef08a" />
            <path d="M 55 0 L 73 0 L 57 22 L 39 22 Z" fill="#fef08a" />
            <path d="M 90 0 L 108 0 L 92 22 L 74 22 Z" fill="#fef08a" />
            <path d="M 125 0 L 143 0 L 127 22 L 109 22 Z" fill="#fef08a" />
          </g>

          {/* Lower Base Board */}
          <g transform="translate(25, 95)">
            <rect x="0" y="0" width="150" height="22" rx="2" fill="#18181b" stroke="#d4af37" strokeWidth="2" />
            <path d="M 20 0 L 38 0 L 22 22 L 4 22 Z" fill="#fef08a" />
            <path d="M 55 0 L 73 0 L 57 22 L 39 22 Z" fill="#fef08a" />
            <path d="M 90 0 L 108 0 L 92 22 L 74 22 Z" fill="#fef08a" />
            <path d="M 125 0 L 143 0 L 127 22 L 109 22 Z" fill="#fef08a" />

            {/* Slate Board Body */}
            <rect x="0" y="22" width="150" height="95" rx="4" fill="#121215" stroke="#d4af37" strokeWidth="2.5" />
            <line x1="0" y1="58" x2="150" y2="58" stroke="#3f3f46" strokeWidth="1.5" />
            <line x1="75" y1="22" x2="75" y2="117" stroke="#3f3f46" strokeWidth="1.5" />

            {/* Slate Text Labels */}
            <text x="12" y="42" fill="#d4af37" fontSize="10" fontFamily="serif" fontWeight="bold">SCENE 01</text>
            <text x="88" y="42" fill="#d4af37" fontSize="10" fontFamily="serif" fontWeight="bold">TAKE 01</text>
            <text x="12" y="78" fill="#fde047" fontSize="11" fontFamily="serif" fontWeight="black">LEMON CINEMA</text>
            <text x="12" y="98" fill="#fca5a5" fontSize="8" fontFamily="sans-serif">DIRECTOR: AI STUDIO</text>
          </g>
        </svg>
      );

    case 'popcorn-cinema-cup':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="popBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#450a0a" />
              <stop offset="60%" stopColor="#1c0205" />
              <stop offset="100%" stopColor="#090102" />
            </linearGradient>
          </defs>
          <rect width="200" height="240" fill="url(#popBg)" />

          {/* Golden Ticket Stub on Ground */}
          <g transform="translate(20, 175) rotate(-10)">
            <rect x="0" y="0" width="85" height="42" rx="3" fill="#facc15" stroke="#78350f" strokeWidth="2" />
            <circle cx="0" cy="21" r="5" fill="#1c0205" />
            <circle cx="85" cy="21" r="5" fill="#1c0205" />
            <text x="16" y="25" fill="#720e1e" fontSize="9" fontFamily="serif" fontWeight="black">ADMIT ONE</text>
          </g>

          {/* Soda Drink Cup */}
          <g transform="translate(115, 80)">
            {/* Straw */}
            <path d="M 25 0 L 35 -30 L 45 -30" stroke="#fde047" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Cup Lid */}
            <ellipse cx="25" cy="5" rx="28" ry="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            {/* Cup Tapered Body */}
            <polygon points="2,5 48,5 42,95 8,95" fill="#0284c7" stroke="#d4af37" strokeWidth="2" />
            {/* Lemon Cinema Cup Logo */}
            <circle cx="25" cy="50" r="14" fill="#facc15" />
            <text x="16" y="54" fill="#720e1e" fontSize="11" fontWeight="bold">🍋</text>
          </g>

          {/* Red & White Popcorn Bucket */}
          <g transform="translate(30, 60)">
            {/* Fluffy Golden Popcorn Kernels Overflowing */}
            {[
              { x: 20, y: -5, r: 14 }, { x: 38, y: -15, r: 16 }, { x: 58, y: -8, r: 15 },
              { x: 74, y: -2, r: 13 }, { x: 28, y: 8, r: 12 }, { x: 50, y: 2, r: 15 }, { x: 65, y: 10, r: 12 }
            ].map((p, idx) => (
              <circle key={idx} cx={p.x} cy={p.y} r={p.r} fill="#fde047" stroke="#d97706" strokeWidth="1.5" />
            ))}

            {/* Bucket Container */}
            <polygon points="10,15 85,15 75,125 20,125" fill="#f8fafc" stroke="#d4af37" strokeWidth="3" />
            {/* Red Vertical Stripes */}
            <polygon points="22,15 34,15 31,125 23,125" fill="#991b1b" />
            <polygon points="43,15 55,15 50,125 42,125" fill="#991b1b" />
            <polygon points="64,15 76,15 69,125 61,125" fill="#991b1b" />

            {/* Emblem */}
            <rect x="26" y="50" width="44" height="30" rx="4" fill="#18181b" stroke="#facc15" strokeWidth="1.5" />
            <text x="31" y="68" fill="#fde047" fontSize="9" fontFamily="serif" fontWeight="bold">LEMON</text>
          </g>
        </svg>
      );

    case 'film-projector-beam':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="projBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e0206" />
              <stop offset="60%" stopColor="#0a0102" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            <linearGradient id="bigBeam" x1="0" y1="0" x2="1" y2="0.2">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#facc15" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="200" height="240" fill="url(#projBg)" />

          {/* Huge Cone of Projection Light Beam with Floating Sparks */}
          <polygon points="120,80 200,30 200,160" fill="url(#bigBeam)" />
          <circle cx="150" cy="70" r="1.5" fill="#ffffff" />
          <circle cx="170" cy="90" r="2" fill="#fde047" />
          <circle cx="185" cy="110" r="1.5" fill="#ffffff" />

          {/* Stand / Pedestal */}
          <rect x="55" y="160" width="30" height="60" fill="#27272a" stroke="#d4af37" strokeWidth="2" />
          <rect x="40" y="220" width="60" height="12" rx="2" fill="#18181b" stroke="#d4af37" strokeWidth="2" />

          {/* Projector Body */}
          {/* Top Reels */}
          <g transform="translate(45, 45)">
            <circle cx="0" cy="0" r="25" fill="#18181b" stroke="#d4af37" strokeWidth="3" />
            <circle cx="0" cy="0" r="8" fill="#991b1b" stroke="#fde047" strokeWidth="1.5" />
          </g>
          <g transform="translate(100, 40)">
            <circle cx="0" cy="0" r="22" fill="#18181b" stroke="#d4af37" strokeWidth="3" />
            <circle cx="0" cy="0" r="7" fill="#991b1b" stroke="#fde047" strokeWidth="1.5" />
          </g>

          {/* Main Body Frame */}
          <rect x="35" y="65" width="75" height="55" rx="5" fill="#3f3f46" stroke="#d4af37" strokeWidth="3" />
          <line x1="45" y1="80" x2="70" y2="80" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
          <line x1="45" y1="88" x2="70" y2="88" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
          <line x1="45" y1="96" x2="70" y2="96" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />

          {/* Lens Barrel */}
          <path d="M 110 75 L 125 70 L 125 90 L 110 85 Z" fill="#27272a" stroke="#d4af37" strokeWidth="2" />
          <ellipse cx="125" cy="80" rx="3" ry="10" fill="#fde047" />
        </svg>
      );
    case 'noir-detective':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="noirBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="70%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
            <radialGradient id="lampGlow" cx="0.8" cy="0.2" r="0.6">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#eab308" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="200" height="240" fill="url(#noirBg)" />
          {/* Streetlamp glow in fog */}
          <circle cx="160" cy="40" r="70" fill="url(#lampGlow)" />
          {/* Rain streaks */}
          <line x1="30" y1="10" x2="20" y2="50" stroke="#38bdf8" strokeWidth="0.8" opacity="0.3" />
          <line x1="80" y1="20" x2="70" y2="70" stroke="#38bdf8" strokeWidth="0.8" opacity="0.3" />
          <line x1="140" y1="15" x2="130" y2="65" stroke="#38bdf8" strokeWidth="0.8" opacity="0.3" />
          {/* Trench Coat Shoulders */}
          <path d="M30 240 L50 160 L100 145 L150 160 L170 240 Z" fill="#1c1917" stroke="#ca8a04" strokeWidth="1.5" />
          {/* High collar */}
          <path d="M60 165 L85 130 L100 150 L115 130 L140 165 Z" fill="#292524" />
          <path d="M92 148 L100 180 L108 148 Z" fill="#991b1b" /> {/* Crimson tie */}
          {/* Face silhouette & shadow */}
          <path d="M75 100 Q100 140 125 100 Q100 75 75 100 Z" fill="#d6d3d1" />
          <path d="M75 100 Q100 140 100 100 Z" fill="#78716c" opacity="0.7" />
          {/* Fedora Hat */}
          <path d="M45 92 Q100 70 155 92 Q100 82 45 92 Z" fill="#1c1917" stroke="#ca8a04" strokeWidth="2" />
          <path d="M65 88 L72 45 Q100 35 128 45 L135 88 Z" fill="#292524" />
          {/* Fedora Silk Band */}
          <path d="M66 82 L70 68 Q100 62 130 68 L134 82 Z" fill="#720e1e" />
          {/* Cigarette Ember Glow */}
          <circle cx="106" cy="124" r="2.5" fill="#ef4444" className="animate-pulse" />
          <circle cx="106" cy="124" r="5" fill="#f97316" opacity="0.4" />
          <path d="M106 122 Q112 110 108 100 Q118 90 114 80" stroke="#f1f5f9" strokeWidth="1" fill="none" opacity="0.4" />
        </svg>
      );

    case 'cyberpunk-empress':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cyberBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e1035" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>
            <linearGradient id="neonPink" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <rect width="200" height="240" fill="url(#cyberBg)" />
          {/* Circuit Lines Background */}
          <path d="M20 20 H70 L90 40 V100" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.4" />
          <path d="M180 20 H130 L110 40 V90" stroke="#ec4899" strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="70" cy="20" r="3" fill="#06b6d4" />
          <circle cx="130" cy="20" r="3" fill="#ec4899" />
          {/* Cybernetic Neck & Collar */}
          <path d="M40 240 L55 170 L100 155 L145 170 L160 240 Z" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
          {/* Sleek Bob Haircut with Cyber Highlights */}
          <path d="M55 130 C45 60 70 30 100 30 C130 30 155 60 145 130 C135 150 130 100 120 70 C100 80 80 80 80 70 C70 100 65 150 55 130 Z" fill="#312e81" stroke="#ec4899" strokeWidth="1" />
          {/* Face */}
          <path d="M72 90 Q100 145 128 90 Z" fill="#e0e7ff" />
          {/* Neon Visor */}
          <path d="M60 85 L140 85 L135 105 L65 105 Z" fill="#06b6d4" opacity="0.9" filter="drop-shadow(0 0 6px #06b6d4)" />
          <line x1="65" y1="95" x2="135" y2="95" stroke="#ec4899" strokeWidth="2" />
          {/* Headset Antenna */}
          <path d="M52 82 L42 55" stroke="#f43f5e" strokeWidth="2.5" />
          <circle cx="42" cy="55" r="3" fill="#f43f5e" />
          <path d="M148 82 L158 55" stroke="#06b6d4" strokeWidth="2.5" />
          <circle cx="158" cy="55" r="3" fill="#06b6d4" />
        </svg>
      );

    case 'vampire-lord':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="gothicMoon" cx="0.5" cy="0.3" r="0.5">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#450a0a" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="200" height="240" fill="#09090b" />
          <circle cx="100" cy="70" r="60" fill="url(#gothicMoon)" />
          {/* Gothic High Collar Cape */}
          <path d="M30 240 L35 150 L50 85 L85 140 L100 155 L115 140 L150 85 L165 150 L170 240 Z" fill="#7f1d1d" stroke="#f59e0b" strokeWidth="2" />
          <path d="M45 160 L100 170 L155 160 L145 240 L55 240 Z" fill="#18181b" />
          {/* Aristocratic Cravat & Ruby Brooch */}
          <path d="M85 150 L100 190 L115 150 Z" fill="#f8fafc" />
          <circle cx="100" cy="165" r="5" fill="#dc2626" stroke="#fbbf24" strokeWidth="1.5" />
          {/* Aristocrat Face & Hair */}
          <path d="M75 80 Q100 135 125 80 Z" fill="#f1f5f9" />
          <path d="M65 80 C60 40 80 25 100 25 C120 25 140 40 135 80 C125 65 110 50 100 50 C90 50 75 65 65 80 Z" fill="#1c1917" />
          {/* Crimson Piercing Eyes */}
          <ellipse cx="88" cy="90" rx="3" ry="1.5" fill="#ef4444" />
          <ellipse cx="112" cy="90" rx="3" ry="1.5" fill="#ef4444" />
          {/* Fangs subtle hint */}
          <path d="M96 114 L98 118 L100 114 L102 118 L104 114" stroke="#e2e8f0" strokeWidth="1" fill="none" />
        </svg>
      );

    case 'celestial-priestess':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sunburstGlow" cx="0.5" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#d97706" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="200" height="240" fill="#0f172a" />
          <circle cx="100" cy="90" r="75" fill="url(#sunburstGlow)" />
          {/* Golden Sun Halo Rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <line
              key={i}
              x1={100 + 48 * Math.cos((deg * Math.PI) / 180)}
              y1={85 + 48 * Math.sin((deg * Math.PI) / 180)}
              x2={100 + 68 * Math.cos((deg * Math.PI) / 180)}
              y2={85 + 68 * Math.sin((deg * Math.PI) / 180)}
              stroke="#fbbf24"
              strokeWidth="1.5"
            />
          ))}
          {/* Ethereal Robes */}
          <path d="M35 240 L60 160 L100 150 L140 160 L165 240 Z" fill="#f8fafc" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M70 165 L100 195 L130 165 Z" fill="#fef3c7" />
          {/* Veil & Hair */}
          <path d="M60 120 C50 60 75 35 100 35 C125 35 150 60 140 120 C130 150 70 150 60 120 Z" fill="#e2e8f0" opacity="0.8" />
          {/* Face */}
          <path d="M78 85 Q100 130 122 85 Z" fill="#fffbeb" />
          {/* Third Eye Star Sigil */}
          <polygon points="100,72 102,77 107,79 102,81 100,86 98,81 93,79 98,77" fill="#fbbf24" />
          {/* Eyes serene */}
          <path d="M86 93 Q92 97 98 93" stroke="#92400e" strokeWidth="1.5" fill="none" />
          <path d="M102 93 Q108 97 114 93" stroke="#92400e" strokeWidth="1.5" fill="none" />
        </svg>
      );

    case 'steampunk-alchemist':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="240" fill="#1c1917" />
          {/* Background Brass Cog */}
          <circle cx="160" cy="50" r="35" stroke="#b45309" strokeWidth="3" strokeDasharray="8 6" fill="none" opacity="0.4" />
          {/* Leather coat */}
          <path d="M30 240 L50 160 L100 150 L150 160 L170 240 Z" fill="#78350f" stroke="#d97706" strokeWidth="2" />
          {/* Brass buckles */}
          <rect x="90" y="175" width="20" height="6" fill="#fbbf24" rx="2" />
          <rect x="90" y="195" width="20" height="6" fill="#fbbf24" rx="2" />
          <rect x="90" y="215" width="20" height="6" fill="#fbbf24" rx="2" />
          {/* Leather Cap & Face */}
          <path d="M60 75 Q100 40 140 75 L135 110 Q100 135 65 110 Z" fill="#fed7aa" />
          <path d="M55 70 Q100 30 145 70 L140 55 Q100 20 60 55 Z" fill="#451a03" stroke="#92400e" strokeWidth="2" />
          {/* Dual Brass Goggles */}
          <circle cx="82" cy="85" r="15" fill="#1c1917" stroke="#d97706" strokeWidth="3" />
          <circle cx="82" cy="85" r="10" fill="#22c55e" opacity="0.8" />
          <circle cx="118" cy="85" r="15" fill="#1c1917" stroke="#d97706" strokeWidth="3" />
          <circle cx="118" cy="85" r="10" fill="#eab308" opacity="0.8" />
          <line x1="97" y1="85" x2="103" y2="85" stroke="#d97706" strokeWidth="4" />
          {/* Potion Flask in Pocket */}
          <path d="M45 190 L55 190 L58 220 L42 220 Z" fill="#06b6d4" opacity="0.8" stroke="#f59e0b" strokeWidth="1.5" />
        </svg>
      );

    case 'ao-dai-nam':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="aodaiBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <radialGradient id="hueLanternGlow" cx="0.5" cy="0.3" r="0.6">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#eab308" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="silkPattern" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="50%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>
          </defs>
          <rect width="200" height="240" fill="url(#aodaiBg)" />
          {/* Imperial Palace Lantern Glow */}
          <circle cx="100" cy="70" r="75" fill="url(#hueLanternGlow)" />
          {/* Traditional silk lantern accent */}
          <path d="M165 20 C155 35 155 55 165 70 C175 55 175 35 165 20 Z" fill="#b91c1c" stroke="#facc15" strokeWidth="1" opacity="0.85" />
          <line x1="165" y1="10" x2="165" y2="20" stroke="#facc15" strokeWidth="1" />
          <line x1="165" y1="70" x2="165" y2="85" stroke="#facc15" strokeWidth="1" />

          {/* Vietnamese Male Áo Dài (Áo Ngũ Thân / Áo Tấc Nam) Robe */}
          <path d="M30 240 L50 160 L100 148 L150 160 L170 240 Z" fill="url(#silkPattern)" stroke="#fbbf24" strokeWidth="1.5" />
          
          {/* Inner white collar band */}
          <path d="M85 138 L100 152 L115 138 Z" fill="#f8fafc" />
          
          {/* Stand Collar (Lập lĩnh) */}
          <path d="M78 132 C78 126 122 126 122 132 L118 145 C118 148 82 148 82 145 Z" fill="#1e3a8a" stroke="#fbbf24" strokeWidth="1" />
          
          {/* Diagonal button placket across right shoulder */}
          <path d="M100 145 Q125 152 145 175 L155 240" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          
          {/* Traditional knot buttons */}
          <circle cx="105" cy="147" r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="118" cy="154" r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="132" cy="165" r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="145" cy="182" r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />

          {/* Golden Brocade Embroidery Patterns */}
          <path d="M60 190 Q75 180 90 190 Q75 200 60 190 Z" fill="none" stroke="#facc15" strokeWidth="1" opacity="0.75" />
          <path d="M75 210 Q90 200 105 210 Q90 220 75 210 Z" fill="none" stroke="#facc15" strokeWidth="1" opacity="0.75" />

          {/* Noble Face Structure */}
          <path d="M75 88 Q100 140 125 88 Z" fill="#fed7aa" />
          <path d="M75 88 Q100 115 100 88 Z" fill="#fdba74" opacity="0.3" />

          {/* Traditional Black/Indigo Silk Turban (Khăn đóng / Khăn xếp nam) */}
          <path d="M62 82 C55 45 75 30 100 30 C125 30 145 45 138 82 C132 88 68 88 62 82 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
          <path d="M66 65 Q100 55 134 65" stroke="#334155" strokeWidth="2" fill="none" />
          <path d="M64 72 Q100 62 136 72" stroke="#1e293b" strokeWidth="2.5" fill="none" />
          <path d="M62 78 Q100 68 138 78" stroke="#334155" strokeWidth="2" fill="none" />

          {/* Facial features */}
          <path d="M80 88 Q90 85 96 88" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M104 88 Q110 85 120 88" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="88" cy="94" rx="3.5" ry="2" fill="#0f172a" />
          <ellipse cx="112" cy="94" rx="3.5" ry="2" fill="#0f172a" />
          <path d="M99 94 L97 106 L103 106" stroke="#ea580c" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M93 116 Q100 120 107 116" stroke="#b91c1c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'co-trang-hoa-ngu':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hanfuBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1022" />
              <stop offset="50%" stopColor="#2e0515" />
              <stop offset="100%" stopColor="#0a0105" />
            </linearGradient>
            <radialGradient id="moonMist" cx="0.5" cy="0.3" r="0.5">
              <stop offset="0%" stopColor="#fde047" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#f43f5e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0a0105" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="200" height="240" fill="url(#hanfuBg)" />
          {/* Full Moon behind misty mountains */}
          <circle cx="100" cy="65" r="55" fill="url(#moonMist)" />
          {/* Floating red plum blossoms */}
          <circle cx="35" cy="45" r="3" fill="#f43f5e" opacity="0.8" />
          <circle cx="45" cy="70" r="2" fill="#fda4af" opacity="0.7" />
          <circle cx="165" cy="50" r="3.5" fill="#f43f5e" opacity="0.8" />
          <circle cx="155" cy="85" r="2.5" fill="#fda4af" opacity="0.7" />

          {/* Flowing Silk Hanfu Robes */}
          <path d="M25 240 L45 155 L100 145 L155 155 L175 240 Z" fill="#991b1b" stroke="#facc15" strokeWidth="1.5" />
          <path d="M55 160 L100 190 L145 160 L135 240 L65 240 Z" fill="#f8fafc" />
          <path d="M70 140 L100 178 L115 155 Z" fill="#be123c" />
          <path d="M130 140 L100 178 L85 155 Z" fill="#f8fafc" stroke="#facc15" strokeWidth="1" />
          {/* Jade Pendant Brooch */}
          <circle cx="100" cy="188" r="6" fill="#059669" stroke="#fde047" strokeWidth="1.5" />
          <path d="M100 194 L100 220" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 2" />

          {/* Long Flowing Ebony Hair over shoulders */}
          <path d="M48 95 C45 160 55 210 60 240 L45 240 C38 210 35 150 42 95 Z" fill="#09090b" />
          <path d="M152 95 C155 160 145 210 140 240 L155 240 C162 210 165 150 158 95 Z" fill="#09090b" />

          {/* Aristocrat Wuxia Face */}
          <path d="M74 80 Q100 135 126 80 Z" fill="#fff1f2" />

          {/* High Topknot Bun & Jade Hairpin */}
          <path d="M68 75 C60 30 78 20 100 20 C122 20 140 30 132 75 Z" fill="#0f172a" />
          <ellipse cx="100" cy="22" rx="16" ry="14" fill="#09090b" />
          <path d="M88 22 L112 22 L108 14 L92 14 Z" fill="#f59e0b" stroke="#fef08a" strokeWidth="1" />
          <line x1="72" y1="20" x2="128" y2="20" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="73" cy="20" r="3" fill="#fef08a" />
          {/* Forehead Huadian Mark */}
          <path d="M100 68 Q103 72 100 76 Q97 72 100 68 Z" fill="#dc2626" />

          {/* Phoenix Eyes */}
          <path d="M82 82 Q90 79 97 83" stroke="#09090b" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M103 83 Q110 79 118 82" stroke="#09090b" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="89" cy="87" rx="3.5" ry="2" fill="#18181b" />
          <ellipse cx="111" cy="87" rx="3.5" ry="2" fill="#18181b" />
          <path d="M94 108 Q100 112 106 108" stroke="#e11d48" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'hien-dai-streetwear':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="modernCityBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#18181b" />
              <stop offset="50%" stopColor="#09090b" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
            <radialGradient id="neonBokeh" cx="0.8" cy="0.3" r="0.5">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#18181b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="200" height="240" fill="url(#modernCityBg)" />
          {/* City Bokeh Lights */}
          <circle cx="160" cy="55" r="45" fill="url(#neonBokeh)" />
          <circle cx="40" cy="40" r="15" fill="#a855f7" opacity="0.2" />
          <circle cx="170" cy="110" r="10" fill="#38bdf8" opacity="0.3" />

          {/* Designer Oversized Streetwear Bomber Jacket */}
          <path d="M30 240 L45 160 L100 150 L155 160 L170 240 Z" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5" />
          <path d="M70 160 L100 195 L130 160 L120 240 L80 240 Z" fill="#18181b" />
          <path d="M85 170 L100 185 L115 170 Z" fill="#3b82f6" />
          
          {/* Silver Cuban Chain Necklace */}
          <path d="M80 155 Q100 180 120 155" stroke="#e2e8f0" strokeWidth="2.5" fill="none" strokeDasharray="3 1.5" />

          {/* High stand zipper collar */}
          <path d="M60 160 L78 135 L100 152 L122 135 L140 160 Z" fill="#3f3f46" stroke="#52525b" strokeWidth="1" />
          <line x1="100" y1="152" x2="100" y2="240" stroke="#71717a" strokeWidth="2" />

          {/* Modern Jawline & Neck */}
          <path d="M76 85 Q100 135 124 85 Z" fill="#fed7aa" />

          {/* Modern Layered Haircut */}
          <path d="M60 85 C55 35 75 25 100 25 C125 25 145 35 140 85 C132 55 115 42 100 45 C85 42 68 55 60 85 Z" fill="#18181b" />
          <path d="M75 48 Q95 38 115 42" stroke="#3f3f46" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M85 58 Q100 48 120 54" stroke="#52525b" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Trendy Wireless Earbud */}
          <path d="M128 88 L133 88 L133 97 L130 97 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
          <circle cx="131" cy="90" r="2.5" fill="#f8fafc" />

          {/* Stylish Glasses */}
          <rect x="76" y="82" width="18" height="13" rx="4" fill="none" stroke="#e2e8f0" strokeWidth="1.5" opacity="0.9" />
          <rect x="106" y="82" width="18" height="13" rx="4" fill="none" stroke="#e2e8f0" strokeWidth="1.5" opacity="0.9" />
          <line x1="94" y1="87" x2="106" y2="87" stroke="#e2e8f0" strokeWidth="1.5" />

          <ellipse cx="85" cy="88" rx="3.5" ry="2" fill="#1e293b" />
          <ellipse cx="115" cy="88" rx="3.5" ry="2" fill="#1e293b" />
          <path d="M94 112 Q100 116 106 112" stroke="#ea580c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'hoc-sinh-trung-quoc':
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="schoolSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <radialGradient id="sunWarmth" cx="0.8" cy="0.2" r="0.5">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fde047" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="200" height="240" fill="url(#schoolSky)" />
          {/* Warm youth drama afternoon sunlight */}
          <circle cx="160" cy="40" r="50" fill="url(#sunWarmth)" />
          {/* School campus rooftop railing */}
          <line x1="0" y1="130" x2="200" y2="130" stroke="#f1f5f9" strokeWidth="2" opacity="0.5" />
          <line x1="0" y1="140" x2="200" y2="140" stroke="#f1f5f9" strokeWidth="1.5" opacity="0.4" />
          {[20, 60, 100, 140, 180].map((rx, idx) => (
            <line key={idx} x1={rx} y1="130" x2={rx} y2="155" stroke="#f1f5f9" strokeWidth="1.5" opacity="0.4" />
          ))}

          {/* Iconic Chinese High School Athletic Uniform Jacket (Navy & White) */}
          <path d="M30 240 L45 160 L100 150 L155 160 L170 240 Z" fill="#1d4ed8" stroke="#1e40af" strokeWidth="1.5" />
          
          {/* Wide Color-block White V-chest & shoulder panel */}
          <path d="M50 160 L100 195 L150 160 L140 240 L60 240 Z" fill="#f8fafc" />
          {/* Sky-blue stripe accent across chest */}
          <path d="M55 168 L100 203 L145 168" stroke="#0ea5e9" strokeWidth="3" fill="none" />

          {/* Central metal zip */}
          <line x1="100" y1="138" x2="100" y2="240" stroke="#94a3b8" strokeWidth="2" />
          <rect x="98" y="148" width="4" height="6" fill="#cbd5e1" rx="1" />

          {/* High Athletic Stand Collar */}
          <path d="M68 155 L78 136 L100 148 L122 136 L132 155 Z" fill="#1d4ed8" stroke="#f8fafc" strokeWidth="1.5" />
          {/* Inner white polo collar */}
          <path d="M85 138 L100 148 L115 138 Z" fill="#ffffff" />
          {/* Red neckerchief accent */}
          <path d="M96 148 L100 170 L104 148 Z" fill="#ef4444" />

          {/* Youthful Fresh Face */}
          <path d="M76 86 Q100 134 124 86 Z" fill="#fed7aa" />

          {/* Classic Youth School Hairstyle */}
          <path d="M62 85 C55 42 75 32 100 32 C125 32 145 42 138 85 C130 55 115 48 100 48 C85 48 70 55 62 85 Z" fill="#1e293b" />
          <path d="M72 75 Q85 82 92 72 Q100 82 108 72 Q115 82 128 75" fill="#1e293b" />

          {/* Youthful bright cheerful eyes */}
          <ellipse cx="87" cy="92" rx="4" ry="2.8" fill="#0f172a" />
          <ellipse cx="113" cy="92" rx="4" ry="2.8" fill="#0f172a" />
          <circle cx="88.5" cy="91" r="1.2" fill="#ffffff" />
          <circle cx="114.5" cy="91" r="1.2" fill="#ffffff" />

          {/* Soft boyish smile */}
          <path d="M94 114 Q100 119 106 114" stroke="#e11d48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'shadow-ninja':
    default:
      return (
        <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ninjaMoon" cx="0.5" cy="0.4" r="0.5">
              <stop offset="0%" stopColor="#f87171" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#991b1b" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#030712" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="200" height="240" fill="#030712" />
          {/* Red Crescent Moon */}
          <path d="M140 30 A35 35 0 0 0 140 90 A28 28 0 0 1 140 30 Z" fill="#ef4444" opacity="0.7" />
          {/* Ninja Gi & Katana Hilt */}
          <path d="M35 240 L50 160 L100 150 L150 160 L165 240 Z" fill="#111827" stroke="#dc2626" strokeWidth="1.5" />
          {/* Katana wrapped across back */}
          <line x1="35" y1="230" x2="165" y2="100" stroke="#f8fafc" strokeWidth="3" />
          <rect x="150" y="85" width="22" height="6" fill="#991b1b" stroke="#facc15" strokeWidth="1" transform="rotate(-40 160 88)" />
          {/* Masked Head */}
          <ellipse cx="100" cy="95" rx="36" ry="42" fill="#1f2937" />
          {/* Forehead Protector Plate */}
          <rect x="74" y="66" width="52" height="12" rx="2" fill="#9ca3af" stroke="#facc15" strokeWidth="1" />
          {/* Eye opening in mask */}
          <path d="M76 86 L124 86 L120 102 L80 102 Z" fill="#fee2e2" />
          {/* Sharp, focused gaze */}
          <ellipse cx="88" cy="94" rx="3" ry="2" fill="#dc2626" />
          <ellipse cx="112" cy="94" rx="3" ry="2" fill="#dc2626" />
        </svg>
      );
  }
};

// 100% Vector Art: Tied-Back Grand Cinema Red Velvet Curtains with Gold Tassels
export const CinemaCurtainsFrame: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 1000 600"
      className={`absolute inset-0 pointer-events-none z-30 ${className}`}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Red Velvet Gradient for Deep Rich Folds */}
        <linearGradient id="velvetRed" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4d050e" />
          <stop offset="25%" stopColor="#991b1b" />
          <stop offset="50%" stopColor="#720e1e" />
          <stop offset="75%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#38040a" />
        </linearGradient>
        <linearGradient id="goldRibbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        {/* Shadow Drop */}
        <filter id="curtainShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.8" />
        </filter>
      </defs>

      {/* TOP VALANCE (Rèm Mái Đỏ Viền Vàng Tua Rua) */}
      <g filter="url(#curtainShadow)">
        {/* Top Swags */}
        <path
          d="M 0,0 L 1000,0 L 1000,60 C 900,110 800,110 700,50 C 600,110 500,110 400,50 C 300,110 200,110 100,50 C 50,80 0,70 0,60 Z"
          fill="url(#velvetRed)"
          stroke="#520914"
          strokeWidth="2"
        />
        {/* Gold Fringe Trim along Top Valance */}
        <path
          d="M 0,60 C 50,70 100,50 100,50 C 200,110 300,110 400,50 C 500,110 600,110 700,50 C 800,110 900,110 1000,60"
          stroke="url(#goldRibbon)"
          strokeWidth="6"
          strokeDasharray="4 2"
        />
      </g>

      {/* LEFT TIED-BACK CURTAIN (Rèm Đỏ Buộc Sang Bên Trái) */}
      <g filter="url(#curtainShadow)">
        {/* Main Curtain Body Gathered to Left */}
        <path
          d="M 0,0 C 120,40 180,120 100,300 C 60,390 140,540 220,600 L 0,600 Z"
          fill="url(#velvetRed)"
          stroke="#4a0711"
          strokeWidth="2"
        />
        {/* Velvet Folds Lines */}
        <path d="M 40,0 C 130,100 110,240 70,300 C 40,365 110,500 170,600" stroke="#2c0307" strokeWidth="3" opacity="0.7" />
        <path d="M 80,0 C 160,110 130,250 85,300 C 50,380 130,520 190,600" stroke="#b91c1c" strokeWidth="2" opacity="0.5" />
        <path d="M 120,0 C 180,120 145,260 95,300 C 60,390 150,540 210,600" stroke="#2c0307" strokeWidth="2.5" opacity="0.6" />

        {/* GOLDEN TIE-BACK ROPE & TASSEL (Dây Thừng Thắt Vàng Bên Trái) */}
        <g transform="translate(85, 290)">
          {/* Tie Belt */}
          <path d="M -40,-12 Q 15,0 45,-8 L 40,12 Q 10,20 -45,8 Z" fill="url(#goldRibbon)" stroke="#854d0e" strokeWidth="1.5" />
          {/* Tassel Knot & Fringe */}
          <circle cx="15" cy="5" r="8" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
          <path d="M 10,12 L 5,45 M 15,13 L 15,48 M 20,12 L 25,45" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>

      {/* RIGHT TIED-BACK CURTAIN (Rèm Đỏ Buộc Sang Bên Phải) */}
      <g filter="url(#curtainShadow)">
        {/* Main Curtain Body Gathered to Right */}
        <path
          d="M 1000,0 C 880,40 820,120 900,300 C 940,390 860,540 780,600 L 1000,600 Z"
          fill="url(#velvetRed)"
          stroke="#4a0711"
          strokeWidth="2"
        />
        {/* Velvet Folds Lines */}
        <path d="M 960,0 C 870,100 890,240 930,300 C 960,365 890,500 830,600" stroke="#2c0307" strokeWidth="3" opacity="0.7" />
        <path d="M 920,0 C 840,110 870,250 915,300 C 950,380 870,520 810,600" stroke="#b91c1c" strokeWidth="2" opacity="0.5" />
        <path d="M 880,0 C 820,120 855,260 905,300 C 940,390 850,540 790,600" stroke="#2c0307" strokeWidth="2.5" opacity="0.6" />

        {/* GOLDEN TIE-BACK ROPE & TASSEL (Dây Thừng Thắt Vàng Bên Phải) */}
        <g transform="translate(915, 290)">
          {/* Tie Belt */}
          <path d="M -45,-8 Q -15,0 40,-12 L 45,8 Q -10,20 -40,12 Z" fill="url(#goldRibbon)" stroke="#854d0e" strokeWidth="1.5" />
          {/* Tassel Knot & Fringe */}
          <circle cx="-15" cy="5" r="8" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
          <path d="M -20,12 L -25,45 M -15,13 L -15,48 M -10,12 L -5,45" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};

