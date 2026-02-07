import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import * as QRCode from 'qrcode';

@Injectable()
export class QrService {
  private readonly secret: string;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.secret = this.configService.get<string>(
      'QR_TOKEN_SECRET',
      'qr-secret',
    );
  }

  /**
   * Generate a signed JWT token for a booking, to be embedded in a QR code.
   */
  generateBookingToken(bookingId: string): string {
    return jwt.sign(
      {
        bookingId,
        type: 'gate-access',
        iat: Math.floor(Date.now() / 1000),
      },
      this.secret,
      { expiresIn: '24h' },
    );
  }

  /**
   * Verify and decode a QR token.
   */
  verifyToken(token: string): { bookingId: string; type: string } | null {
    try {
      const decoded = jwt.verify(token, this.secret) as any;
      if (decoded.type !== 'gate-access') return null;
      return { bookingId: decoded.bookingId, type: decoded.type };
    } catch {
      return null;
    }
  }

  /**
   * Generate a QR code data URL from a token.
   */
  async generateQrDataUrl(token: string): Promise<string> {
    return QRCode.toDataURL(token);
  }

  /**
   * Generate a QR code buffer (PNG).
   */
  async generateQrBuffer(token: string): Promise<Buffer> {
    return QRCode.toBuffer(token);
  }
}
