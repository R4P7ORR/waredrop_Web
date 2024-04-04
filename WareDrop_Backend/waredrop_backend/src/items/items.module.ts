import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import {PrismaService} from "../database/prisma.service";
import JwtDecoder from "../auth/jwt.decoder";
import {StockModule} from "../stock/stock.module";

@Module({
  providers: [ItemsService, PrismaService, JwtDecoder],
  controllers: [ItemsController],
  imports: [StockModule]
})
export class ItemsModule {}
