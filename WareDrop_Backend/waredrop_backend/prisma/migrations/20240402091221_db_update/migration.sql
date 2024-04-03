-- CreateTable
CREATE TABLE "items" (
    "item_id" SERIAL NOT NULL,
    "item_name" VARCHAR(30) NOT NULL,
    "item_quantity" INTEGER NOT NULL,

    CONSTRAINT "items_pk" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "permission_id" SERIAL NOT NULL,
    "permission_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "permissons_pk" PRIMARY KEY ("permission_id")
);

-- CreateTable
CREATE TABLE "role_has_permission" (
    "permission_permission_id" INTEGER NOT NULL,
    "role_role_id" INTEGER NOT NULL,

    CONSTRAINT "relation_7_pk" PRIMARY KEY ("permission_permission_id","role_role_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "roles_pk" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "trans_id" SERIAL NOT NULL,
    "trans_post_date" TIMESTAMP(3) NOT NULL,
    "trans_arrived_date" TIMESTAMP(3),
    "trans_origin" VARCHAR(30),
    "trans_target" VARCHAR(30) NOT NULL,
    "warehouse_warehouse_id" INTEGER NOT NULL,
    "item_item_id" INTEGER NOT NULL,
    "worker_email" VARCHAR(50),

    CONSTRAINT "transactions_pk" PRIMARY KEY ("trans_id")
);

-- CreateTable
CREATE TABLE "user_assigned_to_warehouse" (
    "user_user_id" INTEGER NOT NULL,
    "warehouse_warehouse_id" INTEGER NOT NULL,

    CONSTRAINT "relation_5_pk" PRIMARY KEY ("user_user_id","warehouse_warehouse_id")
);

-- CreateTable
CREATE TABLE "user_has_role" (
    "role_role_id" INTEGER NOT NULL,
    "user_user_id" INTEGER NOT NULL,

    CONSTRAINT "relation_6_pk" PRIMARY KEY ("role_role_id","user_user_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(30) NOT NULL,
    "user_email" VARCHAR(50) NOT NULL,
    "user_password" VARCHAR(500) NOT NULL,

    CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "warehouses" (
    "warehouse_id" SERIAL NOT NULL,
    "warehouse_name" VARCHAR(30) NOT NULL,
    "location" VARCHAR(30) NOT NULL,

    CONSTRAINT "warehouses_pk" PRIMARY KEY ("warehouse_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_name_uk" ON "items"("item_name");

-- CreateIndex
CREATE UNIQUE INDEX "permission_name_uk" ON "permissions"("permission_name");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_uk" ON "roles"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_uk" ON "users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "warehouse_name_uk" ON "warehouses"("warehouse_name");

-- AddForeignKey
ALTER TABLE "role_has_permission" ADD CONSTRAINT "relation_7_permisson_fk" FOREIGN KEY ("permission_permission_id") REFERENCES "permissions"("permission_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_has_permission" ADD CONSTRAINT "relation_7_role_fk" FOREIGN KEY ("role_role_id") REFERENCES "roles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transaction_item_fk" FOREIGN KEY ("item_item_id") REFERENCES "items"("item_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transaction_warehouse_fk" FOREIGN KEY ("warehouse_warehouse_id") REFERENCES "warehouses"("warehouse_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_assigned_to_warehouse" ADD CONSTRAINT "relation_5_user_fk" FOREIGN KEY ("user_user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_assigned_to_warehouse" ADD CONSTRAINT "relation_5_warehouse_fk" FOREIGN KEY ("warehouse_warehouse_id") REFERENCES "warehouses"("warehouse_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_has_role" ADD CONSTRAINT "relation_6_role_fk" FOREIGN KEY ("role_role_id") REFERENCES "roles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_has_role" ADD CONSTRAINT "relation_6_user_fk" FOREIGN KEY ("user_user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
