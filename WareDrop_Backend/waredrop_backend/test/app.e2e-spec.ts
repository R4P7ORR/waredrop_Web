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
        it('should return token after login', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    email: 'admin@admin.hu',
                    password: 'admin123'
                })
                .expect(201)

            expect(response.body).toEqual(expect.any(String));
        });
    })
});