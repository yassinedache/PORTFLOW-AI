import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Truck, Plus, Trash2 } from 'lucide-react';
import {
  PageTransition,
  EmptyState,
  ConfirmDialog,
  ErrorAlert,
} from '@/components/shared';
import { TableSkeleton } from '@/components/shared/Skeletons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function TrucksPage() {
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [plate, setPlate] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const {
    data: trucks,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.trucks,
    queryFn: carrierApi.getTrucks,
  });

  const createTruck = useMutation({
    mutationFn: carrierApi.createTruck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trucks });
      setShowCreate(false);
      setPlate('');
      toast.success('Truck registered');
    },
    onError: () => toast.error('Failed to register truck'),
  });

  const deleteTruck = useMutation({
    mutationFn: carrierApi.deleteTruck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trucks });
      toast.success('Truck deleted');
    },
    onError: () => toast.error('Failed to delete truck'),
  });

  if (isError) return <ErrorAlert onRetry={refetch} />;

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Trucks</h1>
            <p className="text-sm text-muted-foreground">Manage your fleet</p>
          </div>
          <Button variant="glow" onClick={() => setShowCreate(true)}>
            <Plus className="h-4 w-4" />
            Register Truck
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : !trucks?.length ? (
              <EmptyState
                title="No trucks registered"
                description="Register your first truck to start booking"
                icon={<Truck className="h-8 w-8 text-muted-foreground" />}
                action={
                  <Button variant="outline" onClick={() => setShowCreate(true)}>
                    <Plus className="mr-1 h-4 w-4" />
                    Register Truck
                  </Button>
                }
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License Plate</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Last Location</TableHead>
                    <TableHead className="w-16" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {trucks.map((truck) => (
                      <motion.tr
                        key={truck.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-border/50 transition-colors hover:bg-muted/30"
                      >
                        <TableCell className="font-mono font-semibold">
                          {truck.plate}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDateTime(truck.createdAt)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {truck.latestLocation
                            ? `${truck.latestLocation.lat.toFixed(4)}, ${truck.latestLocation.lng.toFixed(4)}`
                            : '—'}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(truck.id)}
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
            <DialogTitle>Register Truck</DialogTitle>
            <DialogDescription>Add a new truck to your fleet</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>License Plate</Label>
              <Input
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                placeholder="ABC-1234"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
            <Button
              variant="glow"
              onClick={() => createTruck.mutate({ plate })}
              disabled={!plate}
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
          if (deleteId) deleteTruck.mutate(deleteId);
          setDeleteId(null);
        }}
        title="Delete truck?"
        description="This will permanently remove the truck and cannot be undone."
        confirmLabel="Delete"
      />
    </PageTransition>
  );
}
