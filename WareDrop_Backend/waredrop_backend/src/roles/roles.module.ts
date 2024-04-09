import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import {PrismaModule} from "../database/prisma.module";
import { RolesController } from './roles.controller';

@Module({
  providers: [RolesService],
  imports: [PrismaModule],
  exports: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
