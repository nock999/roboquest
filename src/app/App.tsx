import { ToastProvider } from '@/components/ui/Toast';
import { AppRouter } from './Router';

export default function App() {
  return (
    <ToastProvider>
      <AppRouter>
      </AppRouter>
    </ToastProvider>
  );
}
