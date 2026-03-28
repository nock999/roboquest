import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from 'A/components/layout/AppShell';
import { HomePage } from '@/pages/HomePage';
import { LearnPage } from '@/pages/LearnPage';
import { LessonPage } from '@/pages/LessonPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AchievementsPage } from '@/pages/AchievementsPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
