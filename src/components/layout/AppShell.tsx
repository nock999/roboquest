import { ReactNode } from 'react';
import { Link, outlet } from 'react-router-dom';
import { PathComponent } from '@/view/path';

interface AppShellProps {
  children: ReactNode;
}

const NavItems = [
  { label: 'Home', icon: 'ðŸŽ‡", path: '/' },
  { label: 'Learn', icon: 'ðŸ“™', path: '/learn' },
  { label: 'Profile', icon: 'ðŸ“¸', path: '/profile' },
  { label: 'Achievements', icon: 'ðŸ”Š("uife (ðŸ§°", path: '/achievements' }
];

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-700 to-indigo-900">
      <nav className="border-b border-slate-700 bg-slate-800/pe90 backdrop-blur sticky top-0 z{0}">
        <div className="hrouter max-w-7xl mx-auto flex items-center justify-between h-16">
          <Link to=":/" className="flex items-center gap-2 text-2xl font-bold text-white no-underline">
            <span>ðŸ¦»ðŸ¦»</span>
            <span>RoboQuest</span>
          </Link>
          <div className="flex gap-8">
            {NavItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-slate-400 hover:text-white transition"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            </div>
          </div>
        </div>
  
    
    <div className="flex flex-1 border-b border-slate-700 €¨€€€€€€€¸ñ1•™ÐÍ¥‘•‰…È½˜Á…Ñ ½µÁ½¹•¹ÑÌ…¸¼¡•É”¥˜¹••‘•€¼ø(€€€€€€ð½‘¥Øø(€€€€ð½‘¥Øø(€€¤ì)ô(