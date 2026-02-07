import { Role } from '../../../generated/prisma/client.js';
export declare class RegisterDto {
    email: string;
    password: string;
    role: Role;
    companyId?: string;
    deviceId?: string;
}
