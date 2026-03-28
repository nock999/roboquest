import { useState, useEffect } from 'react';
import type { Lesson, World } from '@/types/lesson';

// Import all lesson and world JSON statically
import world01 from '../../content/worlds/01-bones-and-joints/world.json';
import lesson01 from '../../content/worlds/01-bones-and-joints/lessons/01-what-is-a-robot.json';
import lesson02 from '../../content/worlds/01-bones-and-joints/lessons/02-levers.json';
import lesson03 from '../../content/worlds/01-bones-and-joints/lessons/03-gears.json';
import lesson04 from '../../content/worlds/01-bones-and-joints/lessons/04-linkages.json';
import lesson05 from '../../content/worlds/01-bones-and-joints/lessons/05-degrees-of-freedom.json';

const allLessons: Lesson[] = [
  lesson01 as unknown as Lesson,
  lesson02 as unknown as Lesson,
  lesson03 as unknown as Lesson,
  lesson04 as unknown as Lesson,
  lesson05 as unknown as Lesson,
];

const allWorlds: World[] = [world01 as unknown as World];

export function useWorlds() {
  return allWorlds;
}

export function useWorld(worldId: string) {
  return allWorlds.find((w) => w.id === worldId) ?? null;
}

export function useLessons(worldId?: string) {
  if (worldId) {
    return allLessons.filter((l) => l.worldId === worldId);
  }
  return allLessons;
}

export function useLesson(lessonId: string) {
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const found = allLessons.find((l) => l.id === lessonId);
    setLesson(found ?? null);
  }, [lessonId]);

  return lesson;
}
