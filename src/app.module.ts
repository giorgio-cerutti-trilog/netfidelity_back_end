import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DEFAULT_ENTITIES } from './database/default-entities';
import { MIGRATIONS_CLASSES } from './database/migrations';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        './environments/.env',
        '../environments/.env',
        'src/environments/.env',
      ],
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('db'),
        entities: DEFAULT_ENTITIES,
        migrations: MIGRATIONS_CLASSES,
        migrationsRun: false,
        synchronize: true,
        // extra: {
        //   max: 50,
        //   options: "-c statement_timeout=20000ms"
        // }
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
