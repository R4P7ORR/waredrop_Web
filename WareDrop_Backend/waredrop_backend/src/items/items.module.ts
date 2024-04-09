import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import {PrismaService} from "../database/prisma.service";
import JwtDecoder from "../auth/jwt.decoder";

@Module({
  providers: [ItemsService, PrismaService, JwtDecoder],
  controllers: [ItemsController],
})
export class ItemsModule {}
