import { motion } from 'framer-motion';
import type { LessonScreen } from '@/types/lesson';

interface HookScreenProps {
  screen: LessonScreen;
}

export function HookScreen({ screen }: HookScreenProps) {
  return (
    <div className="flex flex-col items-center text-center py-8">
      {screen.illustration && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xs mb-8"
        >
          <div className="aspect-square bg-dark-800 rounded-2xl border border-dark-700 flex items-center justify-center text-6xl">
            {screen.illustration}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {screen.title && (
          <h2 className="text-2xl font-bold text-white mb-4">{screen.title}</h2>
        )}
        <p className="text-lg text-dark-300 leading-relaxed">{screen.content}</p>
      </motion.div>
    </div>
  );
}
