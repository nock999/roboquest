import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { Lesson, LessonScreen } from '@/types/lesson';
import { ScreenIndicator } from '@/components/ui/ScreenIndicator';
import { HookScreen } from './screens/HookScreen';
import { ConceptScreen } from './screens/ConceptScreen';
import { InteractiveScreen } from './screens/InteractiveScreen';
import { ReflectScreen } from './screens/ReflectScreen';
import { ChallengeScreen } from './screens/ChallengeScreen';
import { LessonComplete } from './LessonComplete';

interface LessonRendererProps {
  lesson: Lesson;
}

export function LessonRenderer({ lesson }: LessonRendererProps) {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [direction, setDirection] = useState(1);
  const [screenResults, setScreenResults] = useState<Record<number, boolean>>({});

  const screen = lesson.screens[currentScreen];
  const isLastScreen = currentScreen === lesson.screens.length - 1;

  const handleNext = useCallback(() => {
    if (isLastScreen) {
      setCompleted(true);
    } else {
      setDirection(1);
      setCurrentScreen((prev) => prev + 1);
    }
  }, [isLastScreen]);

  const handlePrev = useCallback(() => {
    if (currentScreen > 0) {
      setDirection(-1);
      setCurrentScreen((prev) => prev - 1);
    }
  }, [currentScreen]);

  const handleScreenComplete = useCallback((success: boolean) => {
    setScreenResults((prev) => ({ ...prev, [currentScreen]: success }));
  }, [currentScreen]);

  if (completed) {
    const correctAnswers = Object.values(screenResults).filter(Boolean).length;
    return (
      <LessonComplete
        lesson={lesson}
        correctAnswers={correctAnswers}
        totalQuestions={Object.keys(screenResults).length}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <div className="sticky top-0 z-30 bg-dark-950/95 backdrop-blur-sm border-b border-dark-800 px-4 py-3">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-dark-800 text-dark-400 hover:text-white transition-colors touch-target">
            <X className="w-5 h-5" />
          </button>
          <ScreenIndicator total={lesson.screens.length} current={currentScreen} className="flex-1" />
          <span className="text-xs text-dark-500 font-medium tabular-nums">{currentScreen + 1}/{lesson.screens.length}</span>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={currentScreen} custom={direction} initial={{ x: direction * 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: direction * -100, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="absolute inset-0 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-4 py-6">
              <ScreenRouter screen={screen} onNext={handleNext} onComplete={handleScreenComplete} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="sticky bottom-0 bg-dark-950/95 backdrop-blur-sm border-t border-dark-800 px-4 py-3">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={handlePrev} disabled={currentScreen === 0} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-dark-400 hover:text-white hover:bg-dark-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-target">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <button onClick={handleNext} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all active:scale-95 touch-target">
            <span className="text-sm">{isLastScreen ? 'Finish' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ScreenRouter({ screen, onNext, onComplete }: { screen: LessonScreen; onNext: () => void; onComplete: (success: boolean) => void }) {
  switch (screen.type) {
    case 'hook': return <HookScreen screen={screen} />;
    case 'concept': return <ConceptScreen screen={screen} />;
    case 'interactive': return <InteractiveScreen screen={screen} onComplete={onComplete} />;
    case 'guided_challenge': case 'solo_challenge': return <ChallengeScreen screen={screen} onComplete={onComplete} />;
    case 'reflect': return <ReflectScreen screen={screen} onNext={onNext} onComplete={onComplete} />;
    default: return <div className="text-dark-400">Unknown screen type</div>;
  }
}
