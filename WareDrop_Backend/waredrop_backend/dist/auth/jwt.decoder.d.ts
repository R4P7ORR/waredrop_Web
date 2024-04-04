import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
export default class JwtDecoder {
    private jwt;
    constructor(jwt: JwtService);
    decodeToken(req: Request): any;
}
