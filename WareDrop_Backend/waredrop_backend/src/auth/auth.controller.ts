import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService,} from "./auth.service";
import {LocalGuard} from "./guards/local.guard";
import {Request} from "express";
import {JwtAuthGuard} from "./guards/jwt.guard";
import {CreateUserDto} from "../users/users.service";
import JwtDecoder from "./jwt.decoder";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService, private readonly jwt: JwtDecoder) { }

    @ApiOperation({summary: 'Login', description: 'Returns the accessToken when successfully logged in'})
    @ApiCreatedResponse({description: 'Successful login'})
    @ApiBadRequestResponse({description: 'Wrong password or email'})
    @ApiBody({
        description: 'The email and password pair required to login',
        schema: {
            default: {email: 'testWrongEmail', password: 'TestWrongPasswd'},
            type: 'object',
            properties: {
                email: {type: 'string', description: 'The user email'},
                password: {type: 'string', description: 'The user password'},
            }
        }
    })
    @Post('login')
    @UseGuards(LocalGuard)
    validate (@Req() req: Request){
        return req.user;
    }

    @ApiOperation({summary: 'Registration', description: 'Creates a new user in the database'})
    @ApiCreatedResponse({description: 'User created'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why OR says that this user already exist'})
    @Post('register')
    register(@Body() newUser: CreateUserDto){
        return this.service.register(newUser);
    }

    @ApiOperation({summary: 'Worker registration', description: 'Creates a new worker in the database, only used for testing'})
    @ApiCreatedResponse({description: 'Worker created'})
    @ApiBadRequestResponse({description: 'In the error message, it says which value failed the validation and why OR says that this user already exist'})
    @Post('registerWorker')
    registerWorker(@Body() newUser: CreateUserDto){
        return this.service.registerWorker(newUser);
    }

    @ApiOperation({summary: 'Status check', description: 'It sends back the decoded token values, only used for testing'})
    @ApiUnauthorizedResponse({description: 'Wrong or missing token'})
    @ApiOkResponse({description: 'Sends the data'})
    @ApiBearerAuth()
    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req : Request){
        return req.user;
    }
    @ApiOperation({summary: 'User is admin?', description: 'It returns true if the logged in user is an admin and return false if not'})
    @ApiUnauthorizedResponse({description: 'Wrong or missing token'})
    @ApiOkResponse({description: 'Sends true or false'})
    @ApiBearerAuth()
    @Get('isAdmin')
    @UseGuards(JwtAuthGuard)
    isAdmin(@Req() req : Request){
        const user_token = this.jwt.decodeToken(req);
        return this.service.isAdmin(user_token.sub.userPermissions);
    }

    @ApiOperation({summary: 'User is worker?', description: 'It returns true if the logged in user is a worker and return false if not'})
    @ApiUnauthorizedResponse({description: 'Wrong or missing token'})
    @ApiOkResponse({description: 'Sends true or false'})
    @ApiBearerAuth()
    @Get('isWorker')
    @UseGuards(JwtAuthGuard)
    isWorker(@Req() req : Request){
        const user_token = this.jwt.decodeToken(req);
        return this.service.isWorker(user_token.sub.userPermissions);
    }
}
