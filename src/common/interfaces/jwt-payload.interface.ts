import { Role } from '../../../generated/prisma/client.js';

export interface JwtPayload {
  sub: string; // user id
  email: string;
  role: Role;
  deviceId?: string | null;
  iat?: number;
  exp?: number;
}

export interface RequestUser {
  id: string;
  email: string;
  role: Role;
  companyId?: string | null;
  deviceId?: string | null;
}
