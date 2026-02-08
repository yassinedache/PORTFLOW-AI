import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Building2,
  DoorOpen,
  MapPin,
  CalendarClock,
  Plus,
  Trash2,
  Edit,
  Layers,
} from 'lucide-react';
import { PageTransition, ErrorAlert } from '@/components/shared';
import { PageSkeleton } from '@/components/shared/Skeletons';
import { EmptyState } from '@/components/shared/EmptyState';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { adminApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';
import type { Terminal, Gate, Zone } from '@/types';
import { ZoneType } from '@/types';

export default function PortBuilderPage() {
  const queryClient = useQueryClient();
  const [selectedTerminal, setSelectedTerminal] = useState<Terminal | null>(
    null,
  );
  const [showCreateTerminal, setShowCreateTerminal] = useState(false);
  const [showCreateGate, setShowCreateGate] = useState(false);
  const [showCreateZone, setShowCreateZone] = useState(false);
  const [showCreateSlot, setShowCreateSlot] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{
    type: 'terminal' | 'gate' | 'zone';
    id: string;
    label: string;
  } | null>(null);

  // Form state
  const [terminalForm, setTerminalForm] = useState({ name: '', location: '' });
  const [gateForm, setGateForm] = useState({ name: '' });
  const [zoneForm, setZoneForm] = useState({
    name: '',
    type: ZoneType.GENERAL,
    maxTrucks: 50,
  });
  const [slotForm, setSlotForm] = useState({
    startTime: '',
    endTime: '',
    capacity: 10,
  });

  const {
    data: terminals,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.terminals,
    queryFn: adminApi.getTerminals,
  });

  const { data: gates } = useQuery({
    queryKey: queryKeys.gates,
    queryFn: adminApi.getGates,
  });

  const { data: zones } = useQuery({
    queryKey: queryKeys.zones(),
    queryFn: () => adminApi.getZones(),
  });

  const today = new Date().toISOString().split('T')[0]!;
  const { data: terminalSlots } = useQuery({
    queryKey: queryKeys.slotsAvailability(selectedTerminal?.id ?? '', today),
    queryFn: () => adminApi.getSlotAvailability(selectedTerminal!.id, today),
    enabled: !!selectedTerminal,
  });

  // Mutations
  const createTerminal = useMutation({
    mutationFn: adminApi.createTerminal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.terminals });
      setShowCreateTerminal(false);
      setTerminalForm({ name: '', location: '' });
      toast.success('Terminal created');
    },
    onError: () => toast.error('Failed to create terminal'),
  });

  const deleteTerminal = useMutation({
    mutationFn: adminApi.deleteTerminal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.terminals });
      setSelectedTerminal(null);
      toast.success('Terminal deleted');
    },
    onError: () => toast.error('Failed to delete terminal'),
  });

  const createGate = useMutation({
    mutationFn: adminApi.createGate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gates });
      queryClient.invalidateQueries({ queryKey: queryKeys.terminals });
      setShowCreateGate(false);
      setGateForm({ name: '' });
      toast.success('Gate created');
    },
    onError: () => toast.error('Failed to create gate'),
  });

  const deleteGate = useMutation({
    mutationFn: adminApi.deleteGate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gates });
      queryClient.invalidateQueries({ queryKey: queryKeys.terminals });
      toast.success('Gate deleted');
    },
    onError: () => toast.error('Failed to delete gate'),
  });

  const createZone = useMutation({
    mutationFn: adminApi.createZone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.zones() });
      setShowCreateZone(false);
      setZoneForm({ name: '', type: ZoneType.GENERAL, maxTrucks: 50 });
      toast.success('Zone created');
    },
    onError: () => toast.error('Failed to create zone'),
  });

  const deleteZone = useMutation({
    mutationFn: adminApi.deleteZone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.zones() });
      toast.success('Zone deleted');
    },
    onError: () => toast.error('Failed to delete zone'),
  });

  const createSlot = useMutation({
    mutationFn: adminApi.createTimeSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slots'] });
      setShowCreateSlot(false);
      setSlotForm({ startTime: '', endTime: '', capacity: 10 });
      toast.success('Time slot created');
    },
    onError: () => toast.error('Failed to create time slot'),
  });

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorAlert onRetry={refetch} />;

  const terminalGates = selectedTerminal
    ? gates?.filter((g) => g.terminalId === selectedTerminal.id) || []
    : [];
  const terminalZones = selectedTerminal
    ? zones?.filter((z) => z.terminalId === selectedTerminal.id) || []
    : [];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Port Builder</h1>
            <p className="text-sm text-muted-foreground">
              Configure terminals, gates, zones, and time slots
            </p>
          </div>
          <Button variant="glow" onClick={() => setShowCreateTerminal(true)}>
            <Plus className="h-4 w-4" />
            New Terminal
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Terminal List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Terminals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!terminals?.length ? (
                <EmptyState
                  title="No terminals"
                  description="Create your first terminal to get started"
                  icon={<Building2 className="h-8 w-8 text-muted-foreground" />}
                />
              ) : (
                <div className="space-y-2">
                  {terminals.map((terminal) => (
                    <motion.button
                      key={terminal.id}
                      whileHover={{ x: 4 }}
                      onClick={() => setSelectedTerminal(terminal)}
                      className={`w-full rounded-lg p-3 text-left transition-all ${
                        selectedTerminal?.id === terminal.id
                          ? 'bg-primary/15 ring-1 ring-primary/30'
                          : 'hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{terminal.name}</span>
                        <span
                          className={`h-2 w-2 rounded-full ${
                            terminal.isActive ? 'bg-success' : 'bg-destructive'
                          }`}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {terminal.location}
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Terminal Details */}
          <Card className="lg:col-span-2">
            {selectedTerminal ? (
              <>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{selectedTerminal.name}</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          setPendingDelete({
                            type: 'terminal',
                            id: selectedTerminal.id,
                            label: selectedTerminal.name,
                          })
                        }
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="gates">
                    <TabsList>
                      <TabsTrigger value="gates">
                        <DoorOpen className="mr-1 h-3 w-3" />
                        Gates ({terminalGates.length})
                      </TabsTrigger>
                      <TabsTrigger value="zones">
                        <Layers className="mr-1 h-3 w-3" />
                        Zones ({terminalZones.length})
                      </TabsTrigger>
                      <TabsTrigger value="slots">
                        <CalendarClock className="mr-1 h-3 w-3" />
                        Time Slots
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="gates" className="mt-4 space-y-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCreateGate(true)}
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Add Gate
                      </Button>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <AnimatePresence>
                          {terminalGates.map((gate) => (
                            <motion.div
                              key={gate.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
                            >
                              <div className="flex items-center gap-2">
                                <DoorOpen className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">
                                  {gate.name}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  setPendingDelete({
                                    type: 'gate',
                                    id: gate.id,
                                    label: gate.name,
                                  })
                                }
                              >
                                <Trash2 className="h-3 w-3 text-destructive" />
                              </Button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </TabsContent>

                    <TabsContent value="zones" className="mt-4 space-y-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCreateZone(true)}
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Add Zone
                      </Button>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {terminalZones.map((zone) => (
                          <motion.div
                            key={zone.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-accent" />
                                <span className="text-sm font-medium">
                                  {zone.name}
                                </span>
                              </div>
                              <div className="mt-1 flex gap-2">
                                <Badge variant="outline">{zone.type}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  Max: {zone.maxTrucks}
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                setPendingDelete({
                                  type: 'zone',
                                  id: zone.id,
                                  label: zone.name,
                                })
                              }
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="slots" className="mt-4 space-y-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCreateSlot(true)}
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Add Time Slot
                      </Button>
                      {terminalSlots?.length ? (
                        <div className="space-y-2">
                          {terminalSlots.map((slot) => (
                            <motion.div
                              key={slot.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-3"
                            >
                              <div className="space-y-0.5">
                                <p className="text-sm font-medium">
                                  {formatDateTime(slot.startTime)} –{' '}
                                  {formatDateTime(slot.endTime)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {slot.availableCount} / {slot.capacity}{' '}
                                  available
                                </p>
                              </div>
                              <Badge
                                variant={
                                  slot.availableCount > 0
                                    ? 'secondary'
                                    : 'destructive'
                                }
                              >
                                {slot.availableCount > 0 ? 'Open' : 'Full'}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No time slots configured for today. Add one above.
                        </p>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </>
            ) : (
              <CardContent className="py-16">
                <EmptyState
                  title="Select a terminal"
                  description="Choose a terminal from the list to manage its gates, zones, and slots"
                  icon={<Building2 className="h-8 w-8 text-muted-foreground" />}
                />
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      {/* Create Terminal Dialog */}
      <Dialog open={showCreateTerminal} onOpenChange={setShowCreateTerminal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Terminal</DialogTitle>
            <DialogDescription>
              Add a new terminal to your port
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={terminalForm.name}
                onChange={(e) =>
                  setTerminalForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Terminal A"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={terminalForm.location}
                onChange={(e) =>
                  setTerminalForm((f) => ({ ...f, location: e.target.value }))
                }
                placeholder="North Dock"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateTerminal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="glow"
              onClick={() => createTerminal.mutate(terminalForm)}
              disabled={!terminalForm.name || !terminalForm.location}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Gate Dialog */}
      <Dialog open={showCreateGate} onOpenChange={setShowCreateGate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Gate</DialogTitle>
            <DialogDescription>
              Add a gate to {selectedTerminal?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Gate Name</Label>
              <Input
                value={gateForm.name}
                onChange={(e) => setGateForm({ name: e.target.value })}
                placeholder="Gate 1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateGate(false)}>
              Cancel
            </Button>
            <Button
              variant="glow"
              onClick={() =>
                selectedTerminal &&
                createGate.mutate({
                  name: gateForm.name,
                  terminalId: selectedTerminal.id,
                })
              }
              disabled={!gateForm.name}
            >
              Add Gate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Zone Dialog */}
      <Dialog open={showCreateZone} onOpenChange={setShowCreateZone}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Zone</DialogTitle>
            <DialogDescription>
              Add a zone to {selectedTerminal?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Zone Name</Label>
              <Input
                value={zoneForm.name}
                onChange={(e) =>
                  setZoneForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Zone A"
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={zoneForm.type}
                onValueChange={(val) =>
                  setZoneForm((f) => ({ ...f, type: val as ZoneType }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ZoneType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Max Trucks</Label>
              <Input
                type="number"
                value={zoneForm.maxTrucks}
                onChange={(e) =>
                  setZoneForm((f) => ({
                    ...f,
                    maxTrucks: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateZone(false)}>
              Cancel
            </Button>
            <Button
              variant="glow"
              onClick={() =>
                selectedTerminal &&
                createZone.mutate({
                  ...zoneForm,
                  terminalId: selectedTerminal.id,
                })
              }
              disabled={!zoneForm.name}
            >
              Add Zone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Time Slot Dialog */}
      <Dialog open={showCreateSlot} onOpenChange={setShowCreateSlot}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Time Slot</DialogTitle>
            <DialogDescription>
              Create a time slot for {selectedTerminal?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="datetime-local"
                value={slotForm.startTime}
                onChange={(e) =>
                  setSlotForm((f) => ({ ...f, startTime: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="datetime-local"
                value={slotForm.endTime}
                onChange={(e) =>
                  setSlotForm((f) => ({ ...f, endTime: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Capacity</Label>
              <Input
                type="number"
                value={slotForm.capacity}
                onChange={(e) =>
                  setSlotForm((f) => ({
                    ...f,
                    capacity: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateSlot(false)}>
              Cancel
            </Button>
            <Button
              variant="glow"
              onClick={() =>
                selectedTerminal &&
                createSlot.mutate({
                  terminalId: selectedTerminal.id,
                  startTime: new Date(slotForm.startTime).toISOString(),
                  endTime: new Date(slotForm.endTime).toISOString(),
                  capacity: slotForm.capacity,
                })
              }
              disabled={!slotForm.startTime || !slotForm.endTime}
            >
              Create Slot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) return;
          if (pendingDelete.type === 'terminal')
            deleteTerminal.mutate(pendingDelete.id);
          else if (pendingDelete.type === 'gate')
            deleteGate.mutate(pendingDelete.id);
          else if (pendingDelete.type === 'zone')
            deleteZone.mutate(pendingDelete.id);
          setPendingDelete(null);
        }}
        title={`Delete ${pendingDelete?.type}?`}
        description={`This will permanently delete "${pendingDelete?.label}". This action cannot be undone.`}
        confirmLabel="Delete"
      />
    </PageTransition>
  );
}
