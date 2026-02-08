import { Badge } from '@/components/ui/badge';
import { BookingStatus, ContainerStatus, GateAccessResult } from '@/types';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Rocket,
  XCircle,
  Ban,
  Scan,
} from 'lucide-react';

const statusConfig: Record<
  string,
  {
    label: string;
    variant:
      | 'default'
      | 'success'
      | 'warning'
      | 'destructive'
      | 'accent'
      | 'secondary';
    icon: React.ReactNode;
  }
> = {
  [BookingStatus.PENDING]: {
    label: 'Pending',
    variant: 'warning',
    icon: <Clock className="h-3 w-3" />,
  },
  [BookingStatus.CONFIRMED]: {
    label: 'Confirmed',
    variant: 'success',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  [BookingStatus.AT_RISK]: {
    label: 'At Risk',
    variant: 'destructive',
    icon: <AlertTriangle className="h-3 w-3" />,
  },
  [BookingStatus.READY_TO_GO]: {
    label: 'Ready to Go',
    variant: 'accent',
    icon: <Rocket className="h-3 w-3" />,
  },
  [BookingStatus.REJECTED]: {
    label: 'Rejected',
    variant: 'destructive',
    icon: <XCircle className="h-3 w-3" />,
  },
  [BookingStatus.CONSUMED]: {
    label: 'Consumed',
    variant: 'secondary',
    icon: <Scan className="h-3 w-3" />,
  },
  [BookingStatus.CANCELLED]: {
    label: 'Cancelled',
    variant: 'secondary',
    icon: <Ban className="h-3 w-3" />,
  },
  [ContainerStatus.NOT_ARRIVED]: {
    label: 'Not Arrived',
    variant: 'secondary',
    icon: <Clock className="h-3 w-3" />,
  },
  [ContainerStatus.IN_YARD]: {
    label: 'In Yard',
    variant: 'warning',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  [ContainerStatus.READY]: {
    label: 'Ready',
    variant: 'success',
    icon: <Rocket className="h-3 w-3" />,
  },
  [ContainerStatus.RELEASED]: {
    label: 'Released',
    variant: 'accent',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  [GateAccessResult.ALLOWED]: {
    label: 'Allowed',
    variant: 'success',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  [GateAccessResult.DENIED]: {
    label: 'Denied',
    variant: 'destructive',
    icon: <XCircle className="h-3 w-3" />,
  },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    variant: 'secondary' as const,
    icon: null,
  };

  return (
    <Badge variant={config.variant} className={className}>
      {config.icon}
      <span className="ml-1">{config.label}</span>
    </Badge>
  );
}
