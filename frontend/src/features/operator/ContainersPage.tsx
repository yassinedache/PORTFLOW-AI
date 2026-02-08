import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Container, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { PageTransition, EmptyState } from '@/components/shared';
import { TableSkeleton } from '@/components/shared/Skeletons';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { operatorApi, carrierApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';
import { ContainerStatus, type Container as ContainerType } from '@/types';

const STATUS_FLOW: ContainerStatus[] = [
  ContainerStatus.NOT_ARRIVED,
  ContainerStatus.IN_YARD,
  ContainerStatus.READY,
  ContainerStatus.RELEASED,
];

const statusLabel: Record<ContainerStatus, string> = {
  [ContainerStatus.NOT_ARRIVED]: 'Not Arrived',
  [ContainerStatus.IN_YARD]: 'In Yard',
  [ContainerStatus.READY]: 'Ready',
  [ContainerStatus.RELEASED]: 'Released',
};

export default function ContainersPage() {
  const queryClient = useQueryClient();
  const [updateTarget, setUpdateTarget] = useState<ContainerType | null>(null);
  const [newStatus, setNewStatus] = useState<ContainerStatus>(
    ContainerStatus.IN_YARD,
  );

  // We fetch queue to get bookings with containers
  const { data: queue, isLoading } = useQuery({
    queryKey: queryKeys.operatorQueue(),
    queryFn: () => operatorApi.getQueue(),
  });

  // Extract unique containers from bookings
  const containers =
    queue
      ?.filter((b) => b.container)
      .map((b) => b.container!)
      .filter((c, i, arr) => arr.findIndex((x) => x.id === c.id) === i) ?? [];

  const updateMutation = useMutation({
    mutationFn: ({
      containerId,
      status,
    }: {
      containerId: string;
      status: ContainerStatus;
    }) => operatorApi.updateContainerStatus(containerId, { status }),
    onSuccess: () => {
      toast.success('Container status updated');
      setUpdateTarget(null);
      queryClient.invalidateQueries({ queryKey: ['operator', 'queue'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.containers });
    },
    onError: () => toast.error('Failed to update status'),
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Container Operations</h1>
          <p className="text-sm text-muted-foreground">
            Track and update container statuses
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : !containers.length ? (
              <EmptyState
                title="No containers"
                description="Containers appear when carriers create bookings"
                icon={<Container className="h-8 w-8 text-muted-foreground" />}
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Container #</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {containers.map((container, i) => (
                    <motion.tr
                      key={container.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border/50"
                    >
                      <TableCell className="font-mono text-sm font-medium">
                        {container.containerNumber}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={container.status} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDateTime(container.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setUpdateTarget(container);
                            // Pre-select the next status in the flow
                            const currentIdx = STATUS_FLOW.indexOf(
                              container.status,
                            );
                            const nextIdx = currentIdx + 1;
                            if (
                              currentIdx >= 0 &&
                              nextIdx < STATUS_FLOW.length
                            ) {
                              setNewStatus(STATUS_FLOW[nextIdx]!);
                            }
                          }}
                        >
                          <ArrowRight className="h-3.5 w-3.5 mr-1" />
                          Update Status
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Update Status Dialog */}
        <Dialog
          open={!!updateTarget}
          onOpenChange={() => setUpdateTarget(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Container Status</DialogTitle>
            </DialogHeader>
            {updateTarget && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Container:{' '}
                  <span className="font-mono font-medium text-foreground">
                    {updateTarget.containerNumber}
                  </span>
                </p>

                {/* Status flow visualization */}
                <div className="flex items-center gap-1.5 py-2">
                  {STATUS_FLOW.map((s, i) => {
                    const isCurrent = s === updateTarget.status;
                    const isTarget = s === newStatus;
                    return (
                      <div key={s} className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setNewStatus(s)}
                          className={`
                            px-2.5 py-1 rounded-md text-xs font-medium transition-all
                            ${
                              isCurrent
                                ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/40'
                                : isTarget
                                  ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40'
                                  : 'bg-foreground/5 text-muted-foreground hover:bg-foreground/10'
                            }
                          `}
                        >
                          {statusLabel[s]}
                        </button>
                        {i < STATUS_FLOW.length - 1 && (
                          <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setUpdateTarget(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="glow"
                    disabled={
                      updateMutation.isPending ||
                      newStatus === updateTarget.status
                    }
                    onClick={() =>
                      updateMutation.mutate({
                        containerId: updateTarget.id,
                        status: newStatus,
                      })
                    }
                  >
                    {updateMutation.isPending && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    Update to {statusLabel[newStatus]}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
