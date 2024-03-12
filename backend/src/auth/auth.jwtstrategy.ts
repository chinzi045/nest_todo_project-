import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { validate } from 'class-validator';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Any } from "typeorm";
// import { Strategy } from "passport-local";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configservice: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiratrion: false,
      secretOrKey: 'hdhgahfjhofahfiuhoifhugye89dregfjekfhjehfhfhjf',
    });
  }

  validate(payload: any) {
    return {
      userId: payload.userId,
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email,
      role: payload.role,
    };
  }
}
