import { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: 'primary' | 'success' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animate?: boolean;
  className?: string;
}

const colorStyles = {
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  accent: 'bg-accent-500',
};

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export function ProgressBar({
  value,
  max,
  color = 'primary',
  size = 'md',
  showLabel = false,
  animate = true,
  className = '',
}: ProgressBarProps) {
  const [width, setWidth] = useState(animate ? 0 : (value / max) * 100);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setWidth(percentage), 100);
      return () => clearTimeout(timer);
    }
    setWidth(percentage);
  }, [percentage, animate]);

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm text-dark-400 mb-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      <div className={`w-full bg-dark-800 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`${colorStyles[color]} ${sizeStyles[size]} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  (ŸB