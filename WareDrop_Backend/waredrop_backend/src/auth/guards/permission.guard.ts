import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import JwtDecoder from "../jwt.decoder";
import {Reflector} from "@nestjs/core";
import {TokenData} from "../auth.service";

@Injectable()
export class PermissionGuard implements CanActivate{

    constructor(private readonly jwt: JwtDecoder, private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token: TokenData = this.jwt.decodeToken(request)

        if (!token) return false;

        const permission = this.reflector.getAllAndOverride(
            'permission',[context.getHandler(), context.getClass()]
        );

        /*if(token.sub.userRoles){

        }*/

        return false;
    }
}