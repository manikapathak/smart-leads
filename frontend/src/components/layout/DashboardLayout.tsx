import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  X,
  Zap,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Navbar } from './Navbar';
import { useAuth } from '../../hooks/useAuth';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { to: '/dashboard/leads', label: 'All Leads', icon: <Users className="w-4 h-4" /> },
  { to: '/dashboard/leads/create', label: 'New Lead', icon: <PlusCircle className="w-4 h-4" /> },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { isAdmin } = useAuth();

  return (
    <>
      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-60 bg-surface-950 flex flex-col z-30 transition-transform duration-300',
          'lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">LeadFlow</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded text-white/40 hover:text-white/70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto scrollbar-thin">
          <p className="px-3 mb-2 text-xs font-semibold text-white/30 uppercase tracking-widest">
            Menu
          </p>
          {navItems
            .filter((item) => !item.adminOnly || isAdmin)
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150',
                    isActive
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  )
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
        </nav>

        {/* Bottom info */}
        <div className="px-4 py-4 border-t border-white/5">
          <p className="text-xs text-white/25">LeadFlow v1.0</p>
        </div>
      </aside>
    </>
  );
}

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
