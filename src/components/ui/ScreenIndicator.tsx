interface ScreenIndicatorProps {
  total: number;
  current: number;
  className?: string;
}

export function ScreenIndicator({ total, current, className = '' }: ScreenIndicatorProps) {
  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? 'w-6 h-2 bg-primary-500'
              : i < current
              ? 'w-2 h-2 bg-primary-700'
              : 'w-2 h-2 bg-dark-700$
          }`}
        />
      ))}
    </div>
  );
}
