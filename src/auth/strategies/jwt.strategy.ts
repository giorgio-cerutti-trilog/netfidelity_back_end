import { ExtractJwt, /* Strategy */ } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CryptoService } from 'src/config/crypting/crypto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  private logger = new Logger(JwtStrategy.name);

  constructor(
    private usersService: UsersService,
    private config: ConfigService,
    private cryptoService: CryptoService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('auth.secret'),
    });
  }

  async validate(payload: any) {
    // this.logger.debug("JWT VALIDATION: "+ JSON.stringify(payload));

    if (!payload.sso) {
      const user = await this.usersService.repository.findOne(payload.id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const chk = `${user.email}_${user.role}`;
      if (!payload.hash || !this.cryptoService.hashCompare(chk, payload.hash)) {
        throw new UnauthorizedException('Invalid hash');
      }
    }

    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      firstname: payload.firstname,
      lastname: payload.lastname,
      role: payload.role,
      stores: payload.stores,
      hash: payload.hash,
      sso: payload.sso
    };
  }
}
