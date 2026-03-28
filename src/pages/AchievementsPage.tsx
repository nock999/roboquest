import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const achievements = [
  { id: 'first-spin', icon: '🔧', title: 'First Spin', description: 'Complete your first lesson', unlocked: false },
  { id: 'gear-head', icon: '⚙️', title: 'Gear Head', description: 'Complete World 1', unlocked: false },
  { id: 'streak-week', icon: '🔥', title: 'Streak Week', description: 'Maintain a 7-day streak', unlocked: false },
  { id: 'speed-demon', icon: '⚡', title: 'Speed Demon', description: 'Complete any lesson in under 3 minutes', unlocked: false },
  { id: 'perfectionist', icon: '⭐', title: 'Perfectionist', description: 'Get 3 stars on every lesson in a world', unlocked: false },
  { id: 'no-training-wheels', icon: '🚀', title: 'No Training Wheels', description: 'Complete 5 challenges without hints', unlocked: false },
];

export function AchievementsPage() {
  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Achievements</h1>

      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`p-4 text-center ${achievement.unlocked ? '' : 'opacity-50'}`}>
              <div className="text-3xl mb-2">
                {achievement.unlocked ? achievement.icon : <Lock className="w-8 h-8 text-dark-600 mx-auto" />}
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{achievement.title}</h3>
              <p className="text-xs text-dark-500">{achievement.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
