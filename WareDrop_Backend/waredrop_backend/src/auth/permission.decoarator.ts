import {Permission} from "../permissions/permissions.service";
import {SetMetadata} from "@nestjs/common";

export const PermissionGuard = (...permission: Permission[]) => SetMetadata('permission', permission)