import {Injectable,} from "@nestjs/common";
import {PrismaService} from "../database/prisma.service";
import {Prisma} from "@prisma/client"
import {UpdateInput} from "./users.controller";
import * as bcrypt from 'bcrypt'


export interface CreateUserInput{
    user_name: string;
    user_email: string;
    user_password: string;
}

@Injectable()
export class UsersService {
    constructor(private db: PrismaService) {}

    async registerUser(createInput: CreateUserInput){
        const salt = await bcrypt.genSalt();
        createInput.user_password = await bcrypt.hash(createInput.user_password, salt);
        const result = await this.db.users.create({
            data: createInput,
        });
        return result;
    }
    
    async loginUser(loginInput: Prisma.usersWhereUniqueInput) {
        const salt = await bcrypt.genSalt();
        console.log(loginInput);
        const user = await this.db.users.findFirst({
            where: {
                user_email: loginInput.user_email
            }
        })
        if(user === undefined || user === null){
            return {errorMessage: 'Email not found, or is incorrect!'}
        }
        const hash = await bcrypt.hash(user.user_password, salt);
        if(!await bcrypt.compare(user.user_password, hash)){
            return {errorMessage: 'Wrong password!'}
        }
        return user;
    }

    async updateUser(updateInput: UpdateInput){
        const result = await this.db.users.update({
            data: updateInput.data,
            where: {
                user_id: updateInput.where
            }
        })
    }

    async deleteUser(deleteInput: Prisma.usersWhereUniqueInput){
        const result = await this.db.users.delete({
            where: deleteInput
        });
        return result;
    }
}