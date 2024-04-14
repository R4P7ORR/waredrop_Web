import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import {PrismaService} from "../database/prisma.service";
import JwtDecoder from "../auth/jwt.decoder";
import {TransactionsModule} from "../transactions/transactions.module";

@Module({
  providers: [WarehousesService, PrismaService, JwtDecoder],
  controllers: [WarehousesController],
  imports: [TransactionsModule]
})
export class WarehousesModule {}
