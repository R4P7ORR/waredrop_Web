import { Module } from '@nestjs/common';
import {PrismaModule} from "./database/prisma.module";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PermissionsModule } from './permissions/permissions.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { ItemsModule } from './items/items.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [PrismaModule, UsersModule, RolesModule, AuthModule, PermissionsModule, WarehousesModule, ItemsModule, TransactionsModule],
})
export class AppModule{}
