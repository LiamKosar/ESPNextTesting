/*
  Warnings:

  - Added the required column `date_updated` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "maintenanceprocedure" ALTER COLUMN "vehicle_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "date_updated" VARCHAR(50) NOT NULL;
