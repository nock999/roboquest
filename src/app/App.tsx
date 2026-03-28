import { ToastProvider } from 'A/components/ui/Toast';
import { AppRouter } from './Router';

export default function App() {
  return (
    <ToastProvider>
      <AppRouter>
      </AppRouter>
    </ToastProvider>
  );
}
