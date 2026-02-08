import { apiClient } from '../apiClient';
import type {
  Truck,
  Container,
  TruckLocation,
  CreateTruckRequest,
  CreateContainerRequest,
  Booking,
  CreateBookingRequest,
  SlotAvailability,
  SlotPricing,
  HeatmapSlot,
  ChargesBreakdown,
  OcrJob,
  PriorityPurchaseRequest,
  PriorityAccess,
  BlockchainProof,
} from '@/types';

export const carrierApi = {
  // ── Trucks ──
  getTrucks: async (): Promise<Truck[]> => {
    const res = await apiClient.get('/carrier/trucks');
    return res.data;
  },
  createTruck: async (data: CreateTruckRequest): Promise<Truck> => {
    const res = await apiClient.post('/carrier/trucks', data);
    return res.data;
  },
  deleteTruck: async (id: string): Promise<void> => {
    await apiClient.delete(`/carrier/trucks/${id}`);
  },
  updateTruckLocation: async (
    truckId: string,
    lat: number,
    lng: number,
  ): Promise<TruckLocation> => {
    const res = await apiClient.post('/carrier/trucks/location', {
      truckId,
      lat,
      lng,
    });
    return res.data;
  },
  getTruckLocations: async (truckId: string): Promise<TruckLocation[]> => {
    const res = await apiClient.get(`/carrier/trucks/${truckId}/locations`);
    return res.data;
  },

  // ── Containers ──
  getContainers: async (): Promise<Container[]> => {
    const res = await apiClient.get('/carrier/containers');
    return res.data;
  },
  createContainer: async (data: CreateContainerRequest): Promise<Container> => {
    const res = await apiClient.post('/carrier/containers', data);
    return res.data;
  },
  deleteContainer: async (id: string): Promise<void> => {
    await apiClient.delete(`/carrier/containers/${id}`);
  },

  // ── Slots ──
  getAvailability: async (
    terminalId: string,
    date: string,
  ): Promise<SlotAvailability[]> => {
    const res = await apiClient.get('/slots/availability', {
      params: { terminalId, date },
    });
    return res.data;
  },
  getHeatmap: async (terminalId: string): Promise<HeatmapSlot[]> => {
    const res = await apiClient.get('/slots/heatmap', {
      params: { terminalId },
    });
    return res.data;
  },
  getSlotPricing: async (slotId: string): Promise<SlotPricing> => {
    const res = await apiClient.get(`/slots/${slotId}/pricing`);
    return res.data;
  },

  // ── Bookings ──
  getMyBookings: async (): Promise<Booking[]> => {
    const res = await apiClient.get('/bookings/my');
    return res.data;
  },
  getBooking: async (id: string): Promise<Booking> => {
    const res = await apiClient.get(`/bookings/${id}`);
    return res.data;
  },
  createBooking: async (data: CreateBookingRequest): Promise<Booking> => {
    const res = await apiClient.post('/bookings', data);
    return res.data;
  },
  cancelBooking: async (id: string): Promise<Booking> => {
    const res = await apiClient.post(`/bookings/${id}/cancel`);
    return res.data;
  },
  getRescheduleOptions: async (id: string): Promise<SlotAvailability[]> => {
    const res = await apiClient.get(`/bookings/${id}/reschedule-options`);
    return res.data;
  },

  // ── Charges ──
  getBookingCharges: async (id: string): Promise<ChargesBreakdown> => {
    const res = await apiClient.get(`/bookings/${id}/charges`);
    return res.data;
  },

  // ── Priority ──
  purchasePriority: async (
    bookingId: string,
    data: PriorityPurchaseRequest,
  ): Promise<PriorityAccess> => {
    const res = await apiClient.post(`/bookings/${bookingId}/priority`, data);
    return res.data;
  },

  // ── OCR ──
  uploadBol: async (
    file: File,
  ): Promise<{ id: string; documentId: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post('/carrier/bol/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  getOcrJob: async (id: string): Promise<OcrJob> => {
    const res = await apiClient.get(`/carrier/ocr-jobs/${id}`);
    return res.data;
  },

  // ── Blockchain Proofs ──
  getProofs: async (entityId: string): Promise<BlockchainProof[]> => {
    const res = await apiClient.get(`/blockchain/proofs/${entityId}`);
    return res.data;
  },
  verifyProof: async (
    entityType: string,
    entityId: string,
  ): Promise<{ valid: boolean }> => {
    const res = await apiClient.get(
      `/blockchain/verify/${entityType}/${entityId}`,
    );
    return res.data;
  },
};
