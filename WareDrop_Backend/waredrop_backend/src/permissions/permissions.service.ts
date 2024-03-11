import { Injectable } from '@nestjs/common';
import {PrismaService} from "../database/prisma.service";

export interface PermissionDto{
    permission_id: number,
    permission_name: string
}

@Injectable()
export class PermissionsService {
    constructor(private readonly db: PrismaService) {}

    async givePermission(permission_id: number, role_id: number){
        return this.db.role_has_permission.create({
            data: {
                permission_permission_id: permission_id,
                role_role_id: role_id,
            }
        });
    }
}
