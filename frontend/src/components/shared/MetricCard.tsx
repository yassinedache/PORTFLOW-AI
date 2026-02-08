import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color?: string;
  trend?: { value: number; positive: boolean };
  className?: string;
  glowColor?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  color,
  trend,
  className,
  glowColor = 'rgba(59, 130, 246, 0.15)',
}: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={cn(
        'glass rounded-xl p-5 transition-shadow duration-300',
        className,
      )}
      style={{
        boxShadow: `0 0 30px -10px ${glowColor}`,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                'text-xs font-medium',
                trend.positive ? 'text-success' : 'text-destructive',
              )}
            >
              {trend.positive ? '+' : ''}
              {trend.value}%
            </p>
          )}
        </div>
        <div className="rounded-lg p-2.5" style={{ background: glowColor }}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
