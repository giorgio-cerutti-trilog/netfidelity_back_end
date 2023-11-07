import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { CryptoService } from "src/config/crypting/crypto";
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "src/users/users.service";
import { User } from "src/database/entities/user.entity";

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    // private readonly storesService: StoresService,
    private readonly jwtService: JwtService,
    private crypto: CryptoService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    // this.logger.debug("VALIDATE USER")
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(`User ${email} not found`);
    }
    if (!this.crypto.hashCompare(pass, user.password)) {
      throw new UnauthorizedException(`Wrong password`);
    }

    const result = {
      id: user.id,
      name: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      hash: this.crypto.hash(`${user.email}_${user.role}`),
      sso: false
    };
    return result;
  }

  async login(validatedUser: any) {
    const payload = {
      id: validatedUser.id,
      email: validatedUser.email,
      role: validatedUser.role,
      firstname: validatedUser.firstname,
      lastname: validatedUser.lastname,
      hash: validatedUser.hash,
      sso: validatedUser.sso
    };
    console.log('ValidatedUsers',validatedUser);

    if (validatedUser && validatedUser.stores) {
      payload['stores'] = validatedUser.stores;
    }

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  generateToken(user: any) {
    return this.jwtService.sign(user);
  }
}
