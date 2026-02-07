import {
  Inject,
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        role: dto.role,
        companyId: dto.companyId || null,
        // Bind GATE_AGENT accounts to a specific device at registration
        deviceId: dto.role === 'GATE_AGENT' ? dto.deviceId || null : null,
      },
      select: { id: true, email: true, role: true },
    });

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Device-binding enforcement for GATE_AGENT accounts
    if (user.role === 'GATE_AGENT') {
      if (user.deviceId) {
        // Account is already bound — the login must come from the same device
        if (!dto.deviceId) {
          throw new UnauthorizedException(
            'Device ID is required for gate agent login',
          );
        }
        if (dto.deviceId !== user.deviceId) {
          throw new UnauthorizedException(
            'This gate agent account is bound to a different device',
          );
        }
      } else if (dto.deviceId) {
        // First login with a deviceId — bind the account to this device
        await this.prisma.user.update({
          where: { id: user.id },
          data: { deviceId: dto.deviceId },
        });
      }
    }

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.role,
      user.deviceId,
    );

    // Store refresh token
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      ...tokens,
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token required');
    }

    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: {
        user: { select: { id: true, email: true, role: true, deviceId: true } },
      },
    });

    if (!stored || stored.expiresAt < new Date()) {
      if (stored) {
        await this.prisma.refreshToken.delete({ where: { id: stored.id } });
      }
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Rotate refresh token
    await this.prisma.refreshToken.delete({ where: { id: stored.id } });

    const tokens = await this.generateTokens(
      stored.user.id,
      stored.user.email,
      stored.user.role,
      stored.user.deviceId,
    );

    await this.prisma.refreshToken.create({
      data: {
        userId: stored.user.id,
        token: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      user: stored.user,
      ...tokens,
    };
  }

  async logout(refreshToken: string) {
    if (refreshToken) {
      await this.prisma.refreshToken
        .delete({ where: { token: refreshToken } })
        .catch(() => {});
    }
    return { message: 'Logged out successfully' };
  }

  private async generateTokens(
    userId: string,
    email: string,
    role: string,
    deviceId?: string | null,
  ) {
    const payload: JwtPayload = {
      sub: userId,
      email,
      role: role as any,
      ...(deviceId ? { deviceId } : {}),
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET')!,
        expiresIn: this.configService.get<string>(
          'JWT_ACCESS_EXPIRY',
          '15m',
        ) as any,
      }),
      this.jwtService.signAsync(
        { sub: userId, jti: uuidv4() },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET')!,
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_EXPIRY',
            '7d',
          ) as any,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  generateCsrfToken(): string {
    return uuidv4();
  }
}
