import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule,} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";
import {UsersService} from "../users/users.service";
import * as process from "process";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
      PassportModule,
      JwtModule.register({
        secret: `${process.env.JWT_SECRET}`,
        signOptions: { expiresIn: '30d', },
      }),
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      UsersModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
