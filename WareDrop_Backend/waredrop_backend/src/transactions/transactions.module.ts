import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import {PrismaService} from "../database/prisma.service";
import JwtDecoder from "../auth/jwt.decoder";
import {StockModule} from "../stock/stock.module";

@Module({
  providers: [TransactionsService, PrismaService, JwtDecoder],
  controllers: [TransactionsController],
  imports: [StockModule]
})
export class TransactionsModule {}
