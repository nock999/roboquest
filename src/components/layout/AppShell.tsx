import { type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, User, Trophy } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/learn', icon: BookOpen, label: 'Learn' },
  { to: '/achievements', icon: Trophy, label: 'Awards' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isLesson = location.pathname.startsWith('/lesson/');

  return (
    <div className="min-h-screen flex flex-col">
      <main className={`flex-1 ${isLesson ? '' : 'pb-20'}`}>
        {children}
      </main>

      {!isLesson && (
        <nav className="fixed bottom-0 left-0 right-0 bg-dark-900/95 backdrop-blur-md border-t border-dark-800 z-40">
          <div className="flex items-center justify-around max-w-lg mx-auto">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `
                  flex flex-col items-center gap-1 py-3 px-4 touch-target transition-colors
                  ${isActive ? 'text-primary-400' : 'text-dark-500 hover:text-dark-300'}
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
