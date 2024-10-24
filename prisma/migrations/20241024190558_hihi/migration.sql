/*
  Warnings:

  - You are about to drop the column `mac_address` on the `maintenanceprocedure` table. All the data in the column will be lost.
  - The primary key for the `vehicle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `image_url` on the `vehicle` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[mac_address]` on the table `vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "maintenanceprocedure" DROP CONSTRAINT "fk_device";

-- AlterTable
ALTER TABLE "maintenanceprocedure" DROP COLUMN "mac_address",
ADD COLUMN     "vehicle_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_pkey",
ADD COLUMN     "runtime" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "user_email" VARCHAR(255) NOT NULL,
ADD COLUMN     "vehicle_id" SERIAL NOT NULL,
ALTER COLUMN "mac_address" DROP NOT NULL,
ALTER COLUMN "image_url" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "vehicle_pkey" PRIMARY KEY ("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_mac_address_key" ON "vehicle"("mac_address");

-- AddForeignKey
ALTER TABLE "maintenanceprocedure" ADD CONSTRAINT "fk_vehicle" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("vehicle_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_email") REFERENCES "User"("email") ON DELETE SET DEFAULT ON UPDATE NO ACTION;
