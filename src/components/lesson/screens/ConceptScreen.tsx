import { motion } from 'framer-motion';
import type { LessonScreen } from '@/types/lesson';

interface ConceptScreenProps {
  screen: LessonScreen;
}

export function ConceptScreen({ screen }: ConceptScreenProps) {
  return (
    <div className="py-4">
      {screen.title && (
        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xl font-bold text-white mb-4"
        >
          {screen.title}
        </motion.h2>
      )}

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {screen.content && (
          <div className="text-dark-200 leading-relaxed whitespace-pre-line">
            {screen.content}
          </div>
        )}

        {screen.illustration && (
          <div className="bg-dark-800 rounded-2xl border border-dark-700 p-6 flex items-center justify-center text-4xl">
            {screen.illustration}
          </div>
        )}

        {screen.elements?.map((element, i) => (
          <motion.div
            key={i}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            {element.type === 'text' && (
              <div className="bg-dark-800/50 rounded-xl p-4 border-l-4 border-primary-500">
                <p className="text-dark-200">{element.content}</p>
              </div>
            )}
            {element.type === 'diagram' && (
              <div className="bg-dark-800 rounded-xl p-4 text-center text-dark-400">
                {element.content || '[Diagram placeholder]'}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  (ŸJ£