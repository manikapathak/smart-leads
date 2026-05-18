import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullPage?: boolean;
}

const sizeMap = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };

export function Loader({ className, size = 'md', text, fullPage }: LoaderProps) {
  const icon = (
    <Loader2
      className={cn('animate-spin text-brand-500', sizeMap[size], className)}
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-40">
        <div className="flex flex-col items-center gap-3">
          {icon}
          {text && <p className="text-sm text-slate-500">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 py-12">
      {icon}
      {text && <p className="text-sm text-slate-500">{text}</p>}
    </div>
  );
}
