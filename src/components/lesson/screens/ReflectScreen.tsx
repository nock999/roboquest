import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import type { LessonScreen } from '@/types/lesson';

interface ReflectScreenProps {
  screen: LessonScreen;
  onNext: () => void;
  onComplete: (success: boolean) => void;
}

export function ReflectScreen({ screen, onComplete }: ReflectScreenProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const question = screen.question;
  if (!question) return null;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);

    const isCorrect = question.options?.[index]?.correct ?? false;
    onComplete(isCorrect);
  };

  return (
    <div className="py-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2.5 py-1 bg-primary-500/10 text-primary-400 text-xs font-semibold rounded-lg uppercase tracking-wide">
          Quick Check
        </span>
      </div>

      <h2 className="text-xl font-bold text-white mb-6">{question.prompt}</h2>

      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const isSelected = selectedOption === index;
          const showCorrect = answered && option.correct;
          const showIncorrect = answered && isSelected && !option.correct;

          return (
            <motion.button
              key={index}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(index)}
              disabled={answered}
              className={`
                w-full text-left p-4 rounded-xl border transition-all touch-target
                ${!answered
                  ? 'border-dark-700 bg-dark-800 hover:border-primary-500/50 hover:bg-dark-700 active:scale-[0.98]'
                  : showCorrect
                  ? 'border-success-500/50 bg-success-500/10'
                  : showIncorrect
                  ? 'border-red-500/50 bg-red-500/10'
                  : 'border-dark-700 bg-dark-800 opacity-50'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0
                  ${!answered
                    ? 'bg-dark-700 text-dark-300'
                    : showCorrect
                    ? 'bg-success-500 text-white'
                    : showIncorrect
                    ? 'bg-red-500 text-white'
                    : 'bg-dark-700 text-dark-500'
                  }
                `}>
                  {answered && showCorrect ? <CheckCircle className="w-4 h-4" /> :
                  answered && showIncorrect ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + index)}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${answered && !showCorrect && !showIncorrect ? 'text-dark-500' : 'text-dark-100'}`}>
                    {option.text}
                  </p>
                  {answered && (showCorrect || showIncorrect) && option.feedback && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className={`text-sn mt-2 ${showCorrect ? 'text-success-400' : 'text-red-400'}`}
                    >
                       {option.feedback}
                    </motion.p>
                  )}
                </div>
               </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
