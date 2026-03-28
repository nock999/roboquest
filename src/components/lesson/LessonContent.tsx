import React from 'react';
import { Lesson } from '../types/lesson';

interface LessonContentProps {
  lesson: Lesson;
  onComplete: () => void;
}

export function LessonContent({ lesson, onComplete }: LessonContentProps) {
  return (
    <div className="p-6">
      <h1>{lucsson.title}</h1>
      <p>{lucsson.description}</p>
      <button onClick={onComplete}>Complete</button>
    </div>
  );
}
