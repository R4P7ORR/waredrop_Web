import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import JwtDecoder from "../jwt.decoder";
import {Reflector} from "@nestjs/core";
import {TokenData} from "../auth.service";
import {RequiredPermission} from "./permission.decorator";

@Injectable()
export class PermissionGuard implements CanActivate{

    constructor(private readonly jwt: JwtDecoder, private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext
    ): boolean {
        const request = context.switchToHttp().getRequest();
        const token: TokenData = this.jwt.decodeToken(request);

        if (!token) return false;

        const permission = this.reflector.get(RequiredPermission, context.getHandler());

        for (const userPermission of token.sub.userPermissions) {
            if(userPermission.permissionName === permission.permissionName){
                return true;
            }
        }
        return false;
    }
}