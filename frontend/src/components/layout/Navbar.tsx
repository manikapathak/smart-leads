import { useState } from 'react';
import { ChevronDown, LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-14 border-b border-surface-200 bg-white flex items-center px-4 gap-3 shrink-0 z-10">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-lg hover:bg-surface-100 text-slate-500"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-surface-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center">
              <span className="text-xs font-semibold text-brand-700">
                {user?.name?.[0]?.toUpperCase() ?? 'U'}
              </span>
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span className="text-sm font-medium text-slate-700">{user?.name}</span>
              <span className="text-xs text-slate-400">{user?.role}</span>
            </div>
            <ChevronDown
              className={cn(
                'w-3.5 h-3.5 text-slate-400 transition-transform duration-150',
                dropdownOpen && 'rotate-180'
              )}
            />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-surface-200 rounded-xl shadow-modal z-20 py-1 animate-slide-up">
                <div className="px-3 py-2 border-b border-surface-100">
                  <p className="text-xs font-medium text-slate-700 truncate">{user?.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                </div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-surface-50 transition-colors">
                  <User className="w-3.5 h-3.5" />
                  Profile
                </button>
                <button
                  onClick={() => { setDropdownOpen(false); logout(); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
