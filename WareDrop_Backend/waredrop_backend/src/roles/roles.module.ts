import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import {PrismaModule} from "../database/prisma.module";
import { RolesController } from './roles.controller';
import JwtDecoder from "../auth/jwt.decoder";

@Module({
  providers: [RolesService, JwtDecoder],
  imports: [PrismaModule],
  exports: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
