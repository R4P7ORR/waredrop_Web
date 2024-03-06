import { Module } from '@nestjs/common';
import {UsersService} from "./users.service";
import { UsersController } from './users.controller';
import {PrismaModule} from "../database/prisma.module";
import {RolesModule} from "../roles/roles.module";

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [PrismaModule, RolesModule],
    exports: [UsersService]
})
export class UsersModule {}
