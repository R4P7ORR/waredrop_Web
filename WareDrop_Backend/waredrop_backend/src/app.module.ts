import { Module } from '@nestjs/common';
import {PrismaModule} from "./database/prisma.module";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [PrismaModule, UsersModule, RolesModule],
})
export class AppModule{}
