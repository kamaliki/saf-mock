
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ 
      usernameField: 'phone', // Map 'phone' from request to usernameField
      passwordField: 'pin' // Map 'pin' from request to passwordField
    });
  }

  async validate(phone: string, pin: string): Promise<any> {
    console.log('local strategy :::::::::: validate');
    console.log(phone, pin);
    console.log(' :::::::::: ');
    
    const user = await this.authService.validateUser(phone, pin);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

