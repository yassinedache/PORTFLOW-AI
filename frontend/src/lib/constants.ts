// React Query keys
export const queryKeys = {
  // Auth
  me: ['auth', 'me'] as const,

  // Terminals
  terminals: ['terminals'] as const,
  terminal: (id: string) => ['terminals', id] as const,

  // Gates
  gates: ['gates'] as const,
  gate: (id: string) => ['gates', id] as const,

  // Zones
  zones: (terminalId?: string) => ['zones', { terminalId }] as const,
  zone: (id: string) => ['zones', id] as const,

  // Time Slots
  slotsAvailability: (terminalId: string, date: string) =>
    ['slots', 'availability', { terminalId, date }] as const,
  slotHeatmap: (terminalId: string) =>
    ['slots', 'heatmap', { terminalId }] as const,
  slotPricing: (slotId: string) => ['slots', 'pricing', slotId] as const,

  // Bookings
  myBookings: ['bookings', 'my'] as const,
  booking: (id: string) => ['bookings', id] as const,
  bookingCharges: (id: string) => ['bookings', id, 'charges'] as const,
  bookingReschedule: (id: string) => ['bookings', id, 'reschedule'] as const,

  // Operator
  operatorQueue: (terminalId?: string) =>
    ['operator', 'queue', { terminalId }] as const,
  operatorAlerts: (terminalId?: string) =>
    ['operator', 'alerts', { terminalId }] as const,

  // Carrier Fleet
  trucks: ['carrier', 'trucks'] as const,
  truckLocations: (truckId: string) =>
    ['carrier', 'trucks', truckId, 'locations'] as const,
  containers: ['carrier', 'containers'] as const,

  // Gate Access
  gateScanHistory: ['gate', 'history'] as const,

  // OCR
  ocrJob: (id: string) => ['ocr', id] as const,

  // AI
  aiSessions: ['ai', 'sessions'] as const,
  aiHistory: (sessionId: string) =>
    ['ai', 'sessions', sessionId, 'history'] as const,
  aiReadiness: (bookingId: string) => ['ai', 'readiness', bookingId] as const,

  // Blockchain
  proofs: (entityId: string) => ['blockchain', 'proofs', entityId] as const,
  verify: (entityType: string, entityId: string) =>
    ['blockchain', 'verify', entityType, entityId] as const,

  // Audit
  auditLogs: (params?: Record<string, unknown>) =>
    ['audit', 'logs', params] as const,

  // Analytics
  waitingTime: (terminalId?: string, days?: number) =>
    ['analytics', 'waiting-time', { terminalId, days }] as const,

  // Monetization
  penalties: ['penalties'] as const,

  // Public
  publicPulse: ['public', 'pulse'] as const,
  publicStats: ['public', 'stats'] as const,
} as const;
