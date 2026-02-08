// ── Role ──
export enum Role {
  PORT_ADMIN = 'PORT_ADMIN',
  TERMINAL_OPERATOR = 'TERMINAL_OPERATOR',
  CARRIER = 'CARRIER',
  GATE_AGENT = 'GATE_AGENT',
}

// ── Booking Status ──
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  AT_RISK = 'AT_RISK',
  READY_TO_GO = 'READY_TO_GO',
  REJECTED = 'REJECTED',
  CONSUMED = 'CONSUMED',
  CANCELLED = 'CANCELLED',
}

// ── Container Status ──
export enum ContainerStatus {
  NOT_ARRIVED = 'NOT_ARRIVED',
  IN_YARD = 'IN_YARD',
  READY = 'READY',
  RELEASED = 'RELEASED',
}

// ── Gate Access Result ──
export enum GateAccessResult {
  ALLOWED = 'ALLOWED',
  DENIED = 'DENIED',
}

// ── Tracking Event Type ──
export enum TrackingEventType {
  ARRIVED = 'ARRIVED',
  DEPARTED = 'DEPARTED',
  IN_TRANSIT = 'IN_TRANSIT',
  CUSTOMS_HOLD = 'CUSTOMS_HOLD',
  RELEASED = 'RELEASED',
}

// ── OCR Job Status ──
export enum OcrJobStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

// ── Priority Level ──
export enum PriorityLevel {
  STANDARD = 'STANDARD',
  PRIORITY = 'PRIORITY',
}

// ── Penalty Type ──
export enum PenaltyType {
  NO_SHOW = 'NO_SHOW',
  LATE = 'LATE',
}

// ── Zone Type ──
export enum ZoneType {
  GENERAL = 'GENERAL',
  HAZMAT = 'HAZMAT',
  REEFER = 'REEFER',
  OVERSIZED = 'OVERSIZED',
}

// ── AI Message Role ──
export enum AiMessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
  TOOL = 'TOOL',
}

// ── Domain Models ──

export interface User {
  id: string;
  email: string;
  role: Role;
  companyId?: string;
  deviceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface Terminal {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  gates?: Gate[];
  _count?: { bookings: number };
}

export interface Gate {
  id: string;
  name: string;
  terminalId: string;
  isActive: boolean;
  terminal?: Terminal;
  createdAt: string;
  updatedAt: string;
}

export interface Zone {
  id: string;
  name: string;
  terminalId: string;
  type: ZoneType;
  maxTrucks: number;
  isActive: boolean;
  terminal?: Terminal;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  id: string;
  terminalId: string;
  startTime: string;
  endTime: string;
  capacity: number;
  terminal?: Terminal;
  createdAt: string;
  updatedAt: string;
}

export interface SlotAvailability {
  id: string;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
  availableCount: number;
  terminalId: string;
}

export interface SlotPricing {
  id: string;
  slotId: string;
  basePrice: number;
  multiplier: number;
  finalPrice: number;
  reason: string;
  isEcoSlot: boolean;
}

export interface Booking {
  id: string;
  carrierId: string;
  terminalId: string;
  timeSlotId: string;
  truckId?: string;
  containerId?: string;
  status: BookingStatus;
  readinessScore?: number;
  price?: number;
  qrToken?: string;
  blockchainHash?: string;
  idempotencyKey?: string;
  createdAt: string;
  updatedAt: string;
  terminal?: Terminal;
  timeSlot?: TimeSlot;
  truck?: Truck;
  container?: Container;
  charges?: ChargesBreakdown;
  readinessPrediction?: ReadinessPrediction;
}

export interface ReadinessPrediction {
  id: string;
  bookingId: string;
  probability: number;
  riskLevel: string;
  computedAt: string;
}

export interface ChargesBreakdown {
  slotCost: number;
  ecoDiscount: number;
  priorityFee: number;
  penalties: number;
  total: number;
  details?: ChargeDetail[];
}

export interface ChargeDetail {
  label: string;
  amount: number;
  type: string;
}

export interface Truck {
  id: string;
  plate: string;
  carrierId: string;
  createdAt: string;
  updatedAt: string;
  latestLocation?: TruckLocation;
}

export interface TruckLocation {
  id: string;
  truckId: string;
  lat: number;
  lng: number;
  createdAt: string;
}

export interface Container {
  id: string;
  containerNumber: string;
  carrierId: string;
  terminalId?: string;
  status: ContainerStatus;
  createdAt: string;
  updatedAt: string;
  trackingEvents?: TrackingEvent[];
}

export interface TrackingEvent {
  id: string;
  containerId: string;
  type: TrackingEventType;
  location: string;
  createdAt: string;
}

export interface GateAccessLog {
  id: string;
  bookingId: string;
  gateId: string;
  result: GateAccessResult;
  reason?: string;
  createdAt: string;
  booking?: Booking;
  gate?: Gate;
}

export interface BlockchainProof {
  id: string;
  entityType: string;
  entityId: string;
  hash: string;
  payloadHash: string;
  createdAt: string;
}

export interface Document {
  id: string;
  type: string;
  status: string;
  fileName: string;
  filePath: string;
  userId: string;
  createdAt: string;
}

export interface OcrJob {
  id: string;
  documentId: string;
  status: OcrJobStatus;
  resultJson?: Record<string, unknown>;
  originalFilename?: string;
  extractedData?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AiSession {
  id: string;
  userId: string;
  createdAt: string;
}

export interface AiMessage {
  id: string;
  sessionId: string;
  role: AiMessageRole;
  content: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
}

export interface PriorityAccess {
  id: string;
  bookingId: string;
  level: PriorityLevel;
  fee: number;
}

export interface Penalty {
  id: string;
  bookingId: string;
  type: PenaltyType;
  amount: number;
  reason?: string;
  createdAt: string;
  booking?: Booking;
}

export interface HeatmapSlot {
  date: string;
  hour: number;
  count: number;
}

export interface OperatorAlert {
  type: string;
  message: string;
  terminalId?: string;
  createdAt: string;
}

export interface MetricDaily {
  id: string;
  date: string;
  terminalId: string;
  avgWaitingTime: number;
  totalBookings: number;
  revenue: number;
}

export interface PublicPulse {
  type: string;
  terminalId: string;
  gateName: string;
  result: GateAccessResult;
}

export interface PublicStats {
  totalBookings: number;
  totalGateAccess: number;
  totalTerminals: number;
}

// ── API Request/Response Types ──

export interface LoginRequest {
  email: string;
  password: string;
  deviceId?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: Role;
  companyId?: string;
  deviceId?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface CreateTerminalRequest {
  name: string;
  location: string;
  isActive?: boolean;
}

export interface UpdateTerminalRequest {
  name?: string;
  location?: string;
  isActive?: boolean;
}

export interface CreateGateRequest {
  name: string;
  terminalId: string;
  isActive?: boolean;
}

export interface UpdateGateRequest {
  name?: string;
  isActive?: boolean;
}

export interface CreateZoneRequest {
  name: string;
  terminalId: string;
  type?: ZoneType;
  maxTrucks?: number;
}

export interface UpdateZoneRequest {
  name?: string;
  type?: ZoneType;
  maxTrucks?: number;
  isActive?: boolean;
}

export interface CreateTimeSlotRequest {
  terminalId: string;
  startTime: string;
  endTime: string;
  capacity: number;
}

export interface CreateBookingRequest {
  terminalId: string;
  timeSlotId: string;
  containerId: string;
  truckId?: string;
  idempotencyKey?: string;
  price?: number;
}

export interface GateScanRequest {
  qrToken: string;
  gateId: string;
}

export interface GateScanResponse {
  result: GateAccessResult;
  reason?: string;
  booking?: Booking;
  gate?: Gate;
}

export interface CreateTruckRequest {
  plate: string;
}

export interface CreateContainerRequest {
  containerNumber: string;
}

export interface UpdateContainerStatusRequest {
  status: ContainerStatus;
}

export interface AiQueryRequest {
  sessionId: string;
  message: string;
}

export interface AiQueryResponse {
  response: string;
  messages?: AiMessage[];
}

export interface CapacityOverrideRequest {
  timeSlotId: string;
  newCapacity: number;
}

export interface PriorityPurchaseRequest {
  level?: PriorityLevel;
}

export interface PenaltyRequest {
  type: PenaltyType;
  amount?: number;
  minutesLate?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
