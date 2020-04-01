
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstant } from './jwt.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger: Logger;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstant.secret,
    });
    this.logger = new Logger()
  }

  async validate(payload: any) {
    this.logger.warn(payload)
    throw new UnauthorizedException()
  }
}