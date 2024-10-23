-- CreateTable
CREATE TABLE "User" (
    "email" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "phone_number" VARCHAR(20),

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "device" (
    "mac_address" VARCHAR(17) NOT NULL,
    "version" VARCHAR(10) NOT NULL,
    "runtime" DOUBLE PRECISION DEFAULT 0,
    "user_email" VARCHAR(255) DEFAULT 'kosar.liam@gmail.com',
    "date_updated" VARCHAR(50) NOT NULL,

    CONSTRAINT "device_pkey" PRIMARY KEY ("mac_address")
);

-- CreateTable
CREATE TABLE "maintenanceprocedure" (
    "id" SERIAL NOT NULL,
    "mac_address" VARCHAR(17) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "interval" DOUBLE PRECISION NOT NULL,
    "current_interval" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "maintenanceprocedure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "mac_address" VARCHAR(17) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("mac_address")
);

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_email") REFERENCES "User"("email") ON DELETE SET DEFAULT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maintenanceprocedure" ADD CONSTRAINT "fk_device" FOREIGN KEY ("mac_address") REFERENCES "device"("mac_address") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "fk_device" FOREIGN KEY ("mac_address") REFERENCES "device"("mac_address") ON DELETE NO ACTION ON UPDATE NO ACTION;
