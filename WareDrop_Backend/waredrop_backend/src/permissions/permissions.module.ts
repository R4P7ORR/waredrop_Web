import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import {PrismaService} from "../database/prisma.service";
import JwtDecoder from "../auth/jwt.decoder";

@Module({
  providers: [PermissionsService, PrismaService, JwtDecoder],
  controllers: [PermissionsController],
  exports: [PermissionsService]
})
export class PermissionsModule {}
