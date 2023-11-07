import { BadRequestException, Body, Controller, Get, Logger, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/config/crypting/crypto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';



class Credentials {
    email: string;
    password: String;
}
  
class LoginResponse {
    access_token: string;
}



@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
     private jwtService: JwtService,
      private crypto: CryptoService,
       private config: ConfigService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req, @Body() credentials: Credentials) {
    return this.authService.login(req.user);
  }

  @Post('generate-token')
  @UseGuards(AuthGuard('jwt'))
  generateToken(@Body() data: { id: string, email: string, name: string }) {
    if (!data.email) {
      throw new BadRequestException('Email is mandatory');
    }

    const token = this.authService.generateToken({
      ...data,
    //   role: UserRole.Admin,
      hash: this.crypto.hash(`${data.email}`),/* ${UserRole.Admin} */
      sso: false
    });
    return { token };
  }

  @Post(':id/resetPassword')
    async resetPassword(@Param('id') id: number, @Body() data) {
        return await this.usersService.resetPassword(id, data);
    }

}
