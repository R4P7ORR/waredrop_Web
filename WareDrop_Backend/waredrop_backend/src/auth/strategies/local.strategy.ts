import {PassportStrategy} from "@nestjs/passport";
import { Strategy } from 'passport-local';
import {AuthService} from "../auth.service";
import {Injectable} from "@nestjs/common";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService) {
        super({usernameField: 'email'});
    }

    validate(userEmail: string, userPassword: string){
        const user = this.authService.validateUser({userEmail: userEmail, userPassword: userPassword})
        if (!user) return {errorMessage: "User not found"};
        return user;
    }
}