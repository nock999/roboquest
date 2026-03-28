import { useParams, useNavigate } from 'react-router-dom';
import { useLesson } from '@/hooks/useLessons';
import { LessonRenderer } from '@/components/lesson/LessonRenderer';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = useLesson(id ?? '');

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        {id ? (
          <>
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin mb-4" />
            <p className="text-dark-400">Loading lesson...</p>
          </>
        ) : (
          <>
            <p className="text-dark-400 mb-4">Lesson not found</p>
            <Button onClick={() => navigate('/learn')} variant="secondary">
              Back to Lessons
            </Button>
          </>
        )}
      </div>
    );
  }

  return <LessonRenderer lesson={lesson} />;
}
