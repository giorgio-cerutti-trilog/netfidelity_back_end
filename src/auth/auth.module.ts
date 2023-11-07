import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { CryptoService } from 'src/config/crypting/crypto';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
              return {
                secret: config.get('auth.secret')
              };
            }
          }),
    ],
    controllers: [AuthController],
    exports: [
        AuthService,
        JwtStrategy,
        LocalStrategy,
        CryptoService
    ],
    providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy,
        CryptoService
    ]

})
export class AuthModule {}
