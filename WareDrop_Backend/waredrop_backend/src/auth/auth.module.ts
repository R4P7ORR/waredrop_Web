import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule,} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {UsersModule} from "../users/users.module";
import JwtDecoder from "./jwt.decoder";
import {PermissionsModule} from "../permissions/permissions.module";

@Module({
    imports: [
      PassportModule,
      JwtModule.register({
        secret: `${process.env.JWT_SECRET}`,
        signOptions: { expiresIn: '30d', },
          global: true,
      }),
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      UsersModule,
      PermissionsModule,
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtDecoder,],
    controllers: [AuthController],
    exports: [JwtDecoder]
})
export class AuthModule {}
