import { Badge } from '@/components/ui/badge';
import { DollarSign, Leaf, Zap } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PriceBadgeProps {
  price: number;
  isEcoSlot?: boolean;
  isPriority?: boolean;
  className?: string;
}

export function PriceBadge({
  price,
  isEcoSlot,
  isPriority,
  className,
}: PriceBadgeProps) {
  if (isEcoSlot) {
    return (
      <Badge variant="success" className={className}>
        <Leaf className="h-3 w-3" />
        <span className="ml-1">{formatCurrency(price)}</span>
        <span className="ml-1 text-[10px] opacity-75">ECO</span>
      </Badge>
    );
  }

  if (isPriority) {
    return (
      <Badge variant="accent" className={className}>
        <Zap className="h-3 w-3" />
        <span className="ml-1">{formatCurrency(price)}</span>
        <span className="ml-1 text-[10px] opacity-75">PRIORITY</span>
      </Badge>
    );
  }

  return (
    <Badge variant="default" className={className}>
      <DollarSign className="h-3 w-3" />
      <span className="ml-1">{formatCurrency(price)}</span>
    </Badge>
  );
}
