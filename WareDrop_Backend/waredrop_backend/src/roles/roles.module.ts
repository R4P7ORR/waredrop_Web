import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import {PrismaModule} from "../database/prisma.module";

@Module({
  providers: [RolesService],
  imports: [PrismaModule],
})
export class RolesModule {}
