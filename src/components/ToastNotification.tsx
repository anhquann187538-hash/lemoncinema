import React from 'react';
import { Film, CheckCircle2 } from 'lucide-react';

interface ToastNotificationProps {
  message: string | null;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#14171d] border-2 border-[#d4af37] text-neutral-100 shadow-[0_0_25px_rgba(212,175,55,0.4)]">
        <div className="w-7 h-7 rounded-lg bg-[#720e1e] border border-[#facc15] flex items-center justify-center shrink-0">
          <Film className="w-3.5 h-3.5 text-[#facc15]" />
        </div>
        <p className="text-xs font-medium text-[#fffbeb] tracking-wide max-w-sm">
          {message}
        </p>
      </div>
    </div>
  );
};
