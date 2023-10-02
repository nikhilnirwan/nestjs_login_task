// jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServiceToken {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(email: string): Promise<string> {
    const payload = { email };
    return this.jwtService.sign(payload);
  }
}
