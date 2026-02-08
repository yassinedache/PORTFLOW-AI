import { Badge } from '@/components/ui/badge';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

interface RiskBadgeProps {
  riskLevel: string;
  probability?: number;
  className?: string;
}

export function RiskBadge({
  riskLevel,
  probability,
  className,
}: RiskBadgeProps) {
  const config = {
    LOW: {
      variant: 'success' as const,
      icon: <ShieldCheck className="h-3 w-3" />,
      label: 'Low Risk',
    },
    MEDIUM: {
      variant: 'warning' as const,
      icon: <Shield className="h-3 w-3" />,
      label: 'Medium Risk',
    },
    HIGH: {
      variant: 'destructive' as const,
      icon: <ShieldAlert className="h-3 w-3" />,
      label: 'High Risk',
    },
  }[riskLevel.toUpperCase()] || {
    variant: 'secondary' as const,
    icon: <Shield className="h-3 w-3" />,
    label: riskLevel,
  };

  return (
    <Badge variant={config.variant} className={className}>
      {config.icon}
      <span className="ml-1">{config.label}</span>
      {probability !== undefined && (
        <span className="ml-1 opacity-75">({probability}%)</span>
      )}
    </Badge>
  );
}
