import { Module } from '@nestjs/common';
import {UsersService} from "./users.service";
import { UsersController } from './users.controller';
import {PrismaModule} from "../database/prisma.module";
import {RolesModule} from "../roles/roles.module";
import {PermissionsService} from "../permissions/permissions.service";
import JwtDecoder from "../auth/jwt.decoder";

@Module({
    providers: [UsersService, PermissionsService, JwtDecoder],
    controllers: [UsersController],
    imports: [PrismaModule, RolesModule],
    exports: [UsersService]
})
export class UsersModule {}
