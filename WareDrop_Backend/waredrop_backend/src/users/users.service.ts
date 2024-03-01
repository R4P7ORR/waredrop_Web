import {Injectable,} from "@nestjs/common";
import {PrismaService} from "../database/prisma.service";
import {Prisma} from "@prisma/client"
import {UpdateInput} from "./users.controller";

@Injectable()
export class UsersService {
    constructor(private db: PrismaService) {}

    async registerUser(createInput: Prisma.usersCreateInput){
        const result = await this.db.users.create({
            data: createInput,
        });
        return result;
    }
    
    async loginUser(loginInput: Prisma.usersWhereUniqueInput) {
        const result = await this.db.users.findFirst({
            select: {user_id: true},
            where: loginInput
        })
        if(result === undefined || result === null){
            return {errorMessage: 'Email and password pair not found, or is incorrect!'}
        }
        return result;
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