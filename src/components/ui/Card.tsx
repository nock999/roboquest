import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'achievement';
  glowColor?: string;
  children: ReactNode;
}

export function Card({
  variant = 'default',
  glowColor,
  children,
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'rounded-2xl border transition-all duration-200';

  const variantStyles = {
    default: 'bg-dark-900 border-dark-700',
    interactive: 'bg-dark-900 border-dark-700 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-900/20 cursor-pointer active:scale-[0.98]',
    achievement: 'bg-dark-900 border-accent-500/30 shadow-lg shadow-accent-900/10',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={glowColor ? { boxShadow: `0 0 20px ${glowColor}20` } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
