import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import {PrismaService} from "../database/prisma.service";
import JwtDecoder from "../auth/jwt.decoder";

@Module({
  providers: [WarehousesService, PrismaService, JwtDecoder],
  controllers: [WarehousesController]
})
export class WarehousesModule {}
