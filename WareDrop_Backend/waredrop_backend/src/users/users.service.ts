import {Injectable,} from "@nestjs/common";
import {PrismaService} from "../database/prisma.service";
import {Prisma} from "@prisma/client"
import * as bcrypt from 'bcrypt'


export interface CreateUserDto {
    userName: string;
    userEmail: string;
    userPassword: string;
}

export interface UpdateInput {
    userId: number
    userName?: string,
    userPassword?: string,
    userEmail?: string,
}

export interface UserDto{
    userId: number,
    userEmail: string,
}

@Injectable()
export class UsersService {
    constructor(private db: PrismaService) {}

    async createUser(createInput: CreateUserDto){
        const salt = await bcrypt.genSalt();
        createInput.userPassword = await bcrypt.hash(createInput.userPassword, salt);
        return this.db.users.create({
                data: {
                    user_name: createInput.userName,
                    user_email: createInput.userEmail,
                    user_password: createInput.userPassword,
                }
            });
    }

    async listUsers(){
        return this.db.users.findMany();
    }

    async findUser(email: string){
        return this.db.users.findFirst({
            where: {
                user_email: email
            }
        })
    }

    async updateUser(updateInput: UpdateInput){
        return this.db.users.update({
            data: updateInput,
            where: {
                user_id: updateInput.userId
            }
        })
    }

    async deleteUser(deleteInput: UserDto){
        try {

            //If the user got any assigned roles, those will be deleted as well
            const hasRole = await this.db.user_has_role.findFirst({
                where: {
                    user_user_id: deleteInput.userId
                }
            })

            if (hasRole){
                await this.db.user_has_role.deleteMany({
                    where: {
                        user_user_id: deleteInput.userId
                    }
                })
            }

            //If the user got any warehouses, those will be deleted as well
            const assignedToWarehouse = await this.db.user_assigned_to_warehouse.findFirst({
                where: {
                    user_user_id: deleteInput.userId
                }
            })

            if(assignedToWarehouse){
                await this.db.user_assigned_to_warehouse.deleteMany({
                    where: {
                        user_user_id: deleteInput.userId
                    }
                })
            }

            await this.db.users.delete({
                where: {
                    user_id: deleteInput.userId,
                }
            });

            return {Massage: "User deleted"};
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025'){
                return {errorMassage: "User does not exist"};
            }
            else {
                throw e
            }
        }
    }

    async getUserName(user: UserDto){
        return this.db.users.findFirst({
            select: {
                user_name: true,
            },
            where: {
                user_id: user.userId,
            }
        })
    }
}