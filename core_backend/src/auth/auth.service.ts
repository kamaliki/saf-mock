
import { Injectable } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: CustomersService,
    private jwtService: JwtService
  ) {}

  async validateUser(msisdn: string, pin: string): Promise<any> {
    const user = await this.usersService.findByMsisdn(msisdn);
    if (user && user.pin === pin) {
      const { pin, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Customer) {
    const payload = { username: user.id, sub: user.firstName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
