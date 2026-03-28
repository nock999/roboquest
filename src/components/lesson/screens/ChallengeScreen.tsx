import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Eye, EyeOff } from 'lucide-react';
import type { LessonScreen } from '@/types/lesson';
import { Button } from 'A/components/ui/Button';

interface ChallengeScreenProps {
  screen: LessonScreen;
  onComplete: (success: boolean) => void;
}

export function ChallengeScreen({ screen, onComplete }: ChallengeScreenProps) {
  const [hintsShown, setHintsShown] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const isGuided = screen.type === 'guided_challenge';
  const hints = screen.hints ?? [];

  const revealNextHint = () => {
    if (hintsShown < hints.length) {
      setHintsShown((prev) => prev + 1);
      setShowHints(true);
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg uppercase tracking-wide ${
          isGuided
            ? 'bg-primary-500/10 text-primary-400'
            : 'bg-accent-500/10 text-accent-400'
        }`}>
          {isGuided ? 'Guided Challenge' : 'Solo Challenge'}
        </span>
      </div>

      {screen.title && (
        <h2 className="text-xl font-bold text-white mb-2">{screen.title}</h2>
      )}
      {screen.content && (
        <p className="text-dark-300 mb-6">{screen.content}</p>
      )}

      {/* Challenge area placeholder */}
      <div className="bg-dark-800 rounded-2xl border border-dark-700 aspect-video flex items-center justify-center mb-6">
        <p className="text-dark-500">Challenge arena</p>
      </div>

      {/* Hints (guided only) */}
      {isGuided && hints.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-sm text-dark-400 hover:text-dark-200 transition-colors mb-3"
          >
            {showHints ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showHints ? 'Hide hints' : `Hints (${hintsShown}/${hints.length} revealed)`}
          </button>

          {showHints && (
            <div className="space-y-2">
              {hints.slice(0, hintsShown).map((hint, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary-500/5 border border-primary-500/20 rounded-xl p-3 flex gap-3"
                >
                  <Lightbulb className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-dark-300">{hint}</p>
                </motion.div>
              ))}

              {hintsShown < hints.length && (
                <button
                   onClick={revealNextHint}
                   className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                >
                   Reveal next hint
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => onComplete(false)} className="flex-1">
          Skip
        </Button>
        <Button onClick={() => onComplete(true)} className="flex-1">
          Complete
        </Button>
      </div>
    </div>
  );
}
