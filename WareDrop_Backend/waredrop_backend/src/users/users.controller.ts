import {Body, Controller, Post,} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {UsersService} from "./users.service";
import {RolesService} from "../roles/roles.service";

export interface UpdateInput {
    data: {
        user_name?: string,
        user_password?: string,
        user_email?: string,
    }
    where: number;
}

@Controller('/user')
export class UsersController {
    constructor(private users: UsersService, private roles: RolesService) {}


    @Post('/login')
    async login(@Body() loginInput: Prisma.usersWhereUniqueInput){
        return this.users.loginUser(loginInput);
    }

    @Post('/register')
    async registerUser(@Body() createInput: Prisma.usersCreateInput){
        return this.users.registerUser(createInput);
    }
    @Post('/role')
    async userRole(@Body() user: Prisma.usersWhereUniqueInput) {
        return this.roles.getUserRole(user);
    }

    @Post('/update')
    async updateUser(@Body() updateInput: UpdateInput){
        return this.users.updateUser(updateInput);
    }

    @Post('/delete')
    async deleteUser(@Body() deleteUser: Prisma.usersWhereUniqueInput){
        return this.users.deleteUser(deleteUser);
    }
}