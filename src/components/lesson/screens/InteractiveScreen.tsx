import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import type { LessonScreen } from '@/types/lesson';
import { DragLabelInteractive } from '../interactives/DragLabelInteractive';
import { GearInteractive } from '../interactives/GearInteractive';
import { LeverInteractive } from '../interactives/LeverInteractive';
import { LinkageInteractive } from '../interactives/LinkageInteractive';
import { DOFInteractive } from '../interactives/DOFInteractive';

interface InteractiveScreenProps {
  screen: LessonScreen;
  onComplete: (success: boolean) => void;
}

export function InteractiveScreen({ screen, onComplete }: InteractiveScreenProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = (success: boolean) => {
    setIsCompleted(true);
    onComplete(success);
  };

  const widgetType = screen.widget?.type ?? 'default';

  return (
    <div className="py-4">
      {screen.title && (
        <h2 className="text-xl font-bold text-white mb-2">{screen.title}</h2>
      )}
      {screen.content && (
        <p className="text-dark-300 mb-6">{screen.content}</p>
      )}

      <div className="relative">
        {renderWidget(widgetType, screen, handleComplete)}

        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 bg-success-500 rounded-full p-2"
          >
            <CheckCircle className="w-6 h-6 text-white" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function renderWidget(
  type: string,
  screen: LessonScreen,
  onComplete: (success: boolean) => void,
) {
  const params = screen.widget?.params ?? {};

  switch (type) {
    case 'drag-label':
      return <DragLabelInteractive params={params} onComplete={onComplete} />;
    case 'gear-sim':
      return <GearInteractive params={params} onComplete={onComplete} />;
    case 'lever-sim':
      return <LeverInteractive params={params} onComplete={onComplete} />;
    case 'linkage-builder':
      return <LinkageInteractive params={params} onComplete={onComplete} />;
    case 'dof-explorer':
      return <DOFInteractive params={params} onComplete={onComplete} />;
    default:
      return (
        <div className="bg-dark-800 rounded-2xl border border-dark-700 p-8 text-center">
          <p className="text-dark-400">Interactive: {type}</p>
          <button
            onClick={() => onComplete(true)}
            className="mt-4 px-4 py-2 bg-primary-600 rounded-xl text-white text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Mark Complete
          </button>
        </div>
      );
  }
}
