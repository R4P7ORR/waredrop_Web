import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import * as process from "process";
import * as request from "supertest";
import {PrismaService} from "../src/database/prisma.service";
import * as bcrypt from 'bcrypt';

describe('Waredrop E2E test', () => {
   let app: INestApplication;
   process.env.DATABASE_URL="postgresql://postgres:postgre@localhost:5432/waredrop-test?schema=public"

   beforeAll(async () =>{
       const moduleFixture: TestingModule = await Test.createTestingModule({
           imports: [AppModule],
       }).compile();

       app = moduleFixture.createNestApplication();
       await app.init();
       const prisma = app.get<PrismaService>(PrismaService);
       await prisma.permissions.createMany({
           data: [
               { permission_name: 'All'},
               { permission_name: 'Transaction'},
           ]
       });
       await prisma.roles.createMany({
           data: [
               { role_name: 'Admin'},
               { role_name: 'Worker'},
           ]
       });
       await prisma.users.create({
           data: {
               user_email: 'admin@admin.hu',
               user_name: 'admin',
               user_password: await bcrypt.hash('admin123', await bcrypt.genSalt())
           }
       });

       const adminUser = await prisma.users.findFirst({where: {user_name: 'admin'}});
       const allPermission = await prisma.permissions.findFirst({where: {permission_name: 'All'}});
       const transPermission = await prisma.permissions.findFirst({where: {permission_name: 'Transaction'}});
       const adminRole = await prisma.roles.findFirst({where: {role_name: 'Admin'}});
       const workerRole = await prisma.roles.findFirst({where: {role_name: 'Admin'}});

       await prisma.role_has_permission.createMany({
           data: [
               {permission_permission_id: allPermission.permission_id, role_role_id: adminRole.role_id},
               {permission_permission_id: transPermission.permission_id, role_role_id: workerRole.role_id}
           ]
       });

       await prisma.user_has_role.create({
           data: {
               user_user_id: adminUser.user_id,
               role_role_id: adminRole.role_id
           }
       });
   });

   afterAll(async () => {
       const prisma = app.get<PrismaService>(PrismaService);
       await prisma.user_assigned_to_warehouse.deleteMany();
       await prisma.user_has_role.deleteMany();
       await prisma.role_has_permission.deleteMany();
       await prisma.transactions.deleteMany();
       await prisma.items.deleteMany();
       await prisma.warehouses.deleteMany();
       await prisma.users.deleteMany();
       await prisma.roles.deleteMany();
       await prisma.permissions.deleteMany();
       await prisma.stock.deleteMany();
   })

    describe('Authentication', () => {

        describe("Login", () => {

            it('should return token after login', async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({
                        email: 'admin@admin.hu',
                        password: 'admin123'
                    })
                    .expect(201);

                expect(response.body).toEqual({accessToken: expect.any(String)});
            });

            it('should return 400 after failed login', async () => {
                return request(app.getHttpServer())
                    .post('/auth/login')
                    .send({
                        email: 'admin@admin.hu',
                        password: 'wrongPassword'
                    })
                    .expect(400);
            });
        })

        describe("Status", () => {
            it('should return the data of a user', async () => {
                const loginResponse = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({
                        email: 'admin@admin.hu',
                        password: 'admin123'
                    })
                    .expect(201);

                const response = await request(app.getHttpServer())
                    .get('/auth/status')
                    .auth(loginResponse.body.accessToken, {type: "bearer"})
                    .expect(200);

                expect(response.body.sub.email).toEqual('admin@admin.hu');
            });
        })

        describe("Register", () => {

            it('should create a new user', async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/register')
                    .send({
                        userName: "register test user",
                        userEmail: "register@test.email",
                        userPassword: "register.test.password",
                    })
                    .expect(201);

                expect(response.body).toEqual({message: 'User created'})
            });

            it('should return 400 if the user already exit', () => {
                return request(app.getHttpServer())
                    .post('/auth/register')
                    .send({
                        userName: "register test user",
                        userEmail: "register@test.email",
                        userPassword: "register.test.password",
                    })
                    .expect(400);
            });

            it('should return 400 if the email is invalid', () => {
                return request(app.getHttpServer())
                    .post('/auth/register')
                    .send({
                        userName: "register test user",
                        userEmail: "asd",
                        userPassword: "register.test.password",
                    })
                    .expect(400);
            });

            it('should return 400 if the user name is invalid', () => {
                return request(app.getHttpServer())
                    .post('/auth/register')
                    .send({
                        userName: 3,
                        userEmail: "register@test.email",
                        userPassword: "register.test.password",
                    })
                    .expect(400);
            });

            it('should return 400 if the user name is too short', () => {
                return request(app.getHttpServer())
                    .post('/auth/register')
                    .send({
                        userName: "ab",
                        userEmail: "register@test.email",
                        userPassword: "register.test.password",
                    })
                    .expect(400);
            });

            it('should return 400 if the password is invalid', () => {
                return request(app.getHttpServer())
                    .post('/auth/register')
                    .send({
                        userName: "register test user",
                        userEmail: "register@test.email",
                        userPassword: 1874152491246,
                    })
                    .expect(400);
            });

            it('should return 400 if the password is too short', () => {
                return request(app.getHttpServer())
                    .post('/auth/register')
                    .send({
                        userName: "register test user",
                        userEmail: "register@test.email",
                        userPassword: "pswd",
                    })
                    .expect(400);
            });
        })
        
        describe("Register worker", () => {

            it('should create a user with worker role', async () => {
                await request(app.getHttpServer())
                    .post('/auth/register')
                    .send({
                        userName: "register test worker",
                        userEmail: "register@testWorker.email",
                        userPassword: "register.test.worker.password",
                    })
                    .expect(201);

                const newWorker = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({
                        email: 'register@testWorker.email',
                        password: 'register.test.worker.password'
                    })
                    .expect(201);

                const response = await request(app.getHttpServer())
                    .get('/auth/status')
                    .auth(newWorker.body.accessToken, {type: 'bearer'})
                    .expect(200);

                expect(response.body.sub.userPermissions.permissionName).toEqual('Worker');
            });
        })
    })
});