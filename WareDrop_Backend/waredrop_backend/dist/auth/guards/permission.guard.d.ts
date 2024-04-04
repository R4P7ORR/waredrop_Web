import { CanActivate, ExecutionContext } from "@nestjs/common";
import JwtDecoder from "../jwt.decoder";
import { Reflector } from "@nestjs/core";
export declare class PermissionGuard implements CanActivate {
    private readonly jwt;
    private readonly reflector;
    constructor(jwt: JwtDecoder, reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
