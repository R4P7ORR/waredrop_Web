import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";

@Injectable()
export default class JwtDecoder{
    constructor(private jwt: JwtService) {
    }

    decodeToken(req: Request){
        const token = req.headers.authorization.split(' ')[1];
        return this.jwt.decode(token);
    }
}