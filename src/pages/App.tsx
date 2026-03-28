import React from 'react';
import { Dashboard } from './Dashboard';
import { LessonContent } from '../components/lesson/LessonContent';

export function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Dashboard />
      </main>
    </div>
  );
}
