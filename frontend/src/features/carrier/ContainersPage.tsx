import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Container, Plus, Trash2 } from 'lucide-react';
import {
  PageTransition,
  EmptyState,
  StatusBadge,
  ConfirmDialog,
  ErrorAlert,
} from '@/components/shared';
import { TableSkeleton } from '@/components/shared/Skeletons';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { carrierApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';

export default function ContainersPage() {
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [containerNumber, setContainerNumber] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const {
    data: containers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.containers,
    queryFn: carrierApi.getContainers,
  });

  const createContainer = useMutation({
    mutationFn: carrierApi.createContainer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.containers });
      setShowCreate(false);
      setContainerNumber('');
      toast.success('Container registered');
    },
    onError: () => toast.error('Failed to register container'),
  });

  const deleteContainer = useMutation({
    mutationFn: carrierApi.deleteContainer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.containers });
      toast.success('Container deleted');
    },
    onError: () => toast.error('Failed to delete container'),
  });

  if (isError) return <ErrorAlert onRetry={refetch} />;

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Containers</h1>
            <p className="text-sm text-muted-foreground">
              Manage your containers
            </p>
          </div>
          <Button variant="glow" onClick={() => setShowCreate(true)}>
            <Plus className="h-4 w-4" />
            Register Container
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : !containers?.length ? (
              <EmptyState
                title="No containers"
                description="Register a container to start tracking"
                icon={<Container className="h-8 w-8 text-muted-foreground" />}
                action={
                  <Button variant="outline" onClick={() => setShowCreate(true)}>
                    <Plus className="mr-1 h-4 w-4" />
                    Register Container
                  </Button>
                }
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Container Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="w-16" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {containers.map((container) => (
                      <motion.tr
                        key={container.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-border/50 transition-colors hover:bg-muted/30"
                      >
                        <TableCell className="font-mono font-semibold">
                          {container.containerNumber}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={container.status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDateTime(container.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(container.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register Container</DialogTitle>
            <DialogDescription>
              Add a container (ISO 6346 format)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Container Number</Label>
              <Input
                value={containerNumber}
                onChange={(e) =>
                  setContainerNumber(e.target.value.toUpperCase())
                }
                placeholder="MSCU1234567"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
            <Button
              variant="glow"
              onClick={() => createContainer.mutate({ containerNumber })}
              disabled={!containerNumber}
            >
              Register
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteContainer.mutate(deleteId);
          setDeleteId(null);
        }}
        title="Delete container?"
        description="This will permanently remove the container and cannot be undone."
        confirmLabel="Delete"
      />
    </PageTransition>
  );
}
