import {Injectable,} from "@nestjs/common";
import {PrismaService} from "../database/prisma.service";
import {Prisma} from "@prisma/client"
import {UpdateInput} from "./users.controller";
import * as bcrypt from 'bcrypt'


export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export interface UserDto{
    userId: number,
}

@Injectable()
export class UsersService {
    constructor(private db: PrismaService) {}

    async createUser(createInput: CreateUserDto){
        const salt = await bcrypt.genSalt();
        createInput.password = await bcrypt.hash(createInput.password, salt);
        return this.db.users.create({
                data: {
                    user_name: createInput.name,
                    user_email: createInput.email,
                    user_password: createInput.password,
                }
            });
    }

    async findUser(email: string){
        const result = await this.db.users.findFirst({
            where: {
                user_email: email
            }
        })
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
        return this.db.users.delete({
            where: deleteInput
        });
    }
}