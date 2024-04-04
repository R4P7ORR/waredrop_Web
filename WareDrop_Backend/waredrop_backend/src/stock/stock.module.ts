import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import {PrismaModule} from "../database/prisma.module";

@Module({
  providers: [StockService],
  imports: [PrismaModule],
  exports: [StockService]
})
export class StockModule {}
