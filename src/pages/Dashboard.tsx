import React from 'react';
import { Lesson } from '../types/lesson';

interface DashboardProps {
  lessons: Lesson[];
  onLessonSelect: (lessonId: string) => void;
}

export function Dashboard({ lessons, onLessonSelect }: DashboardProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {lessons.map((l) => (
        <button key={l.id} onClick={() => onLessonSelect(l.id)}>
          {l.title}
        </button>
      ))}
    </div>
  );
}
