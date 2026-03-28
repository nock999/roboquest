export type ScreenType = 'hook' | 'concept' | 'interactive' | 'guided_challenge' | 'solo_challenge' | 'reflect';

export interface LessonScreen {
  type: ScreenType;
  title?: string;
  content?: string;
  illustration?: string;
  elements?: InteractiveElement[];
  widget?: WidgetConfig;
  arena?: string;
  winCondition?: WinCondition;
  hints?: string[];
  question?: ReflectQuestion;
}

export interface InteractiveElement {
  type: 'text' | 'diagram' | 'draggable' | 'toggle' | 'animation';
  content?: string;
  src?: string;
  options?: Record<string, unknown>;
}

export interface WidgetConfig {
  type: string;
  params: Record<string, unknown>;
}

export interface WinCondition {
  type: 'reach' | 'collect' | 'build' | 'match';
  target: unknown;
  description: string;
}

export interface ReflectQuestion {
  prompt: string;
  type: 'multiple_choice' | 'short_answer';
  options?: { text: string; correct: boolean; feedback: string }[];
  correctAnswer?: string;
  feedback?: { correct: string; incorrect: string };
}

export interface Lesson {
  id: string;
  worldId: string;
  order: number;
  title: string;
  subtitle?: string;
  estimatedMinutes: number;
  xpReward: number;
  xpBonus: number;
  prerequisites: string[];
  screens: LessonScreen[];
}

export interface World {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  order: number;
  icon: string;
  color: string;
  lessons: string[];
}

export interface LessonProgress {
  lessonId: string;
  worldId: string;
  completed: boolean;
  stars: number;
  xpEarned: number;
  hintsUsed: number;
  attempts: number;
  bestTimeSeconds?: number;
  completedAt?: string;
}

export interface UserProfile {
  displayName: string;
  avatarId: string;
  xp: number;
  level: number;
  streakCurrent: number;
  streakBest: number;
  streakLastDate?: string;
  streakFreezes: number;
}
