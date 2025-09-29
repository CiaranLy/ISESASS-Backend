-- CreateEnum
CREATE TYPE "public"."Semester" AS ENUM ('autumn', 'spring', 'summer');

-- CreateEnum
CREATE TYPE "public"."Bed" AS ENUM ('single', 'double');

-- CreateEnum
CREATE TYPE "public"."Bathroom" AS ENUM ('shared', 'personal');

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Posts" (
    "id" SERIAL NOT NULL,
    "posterId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "semester" "public"."Semester" NOT NULL,
    "bed" "public"."Bed" NOT NULL,
    "bathroom" "public"."Bathroom" NOT NULL,
    "ensuite" BOOLEAN NOT NULL DEFAULT false,
    "roommates" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Locations" (
    "id" SERIAL NOT NULL,
    "line_1" TEXT,
    "line_2" TEXT,
    "line_3" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "eircode" TEXT,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Posts_locationId_key" ON "public"."Posts"("locationId");

-- CreateIndex
CREATE INDEX "Posts_posterId_idx" ON "public"."Posts"("posterId");

-- AddForeignKey
ALTER TABLE "public"."Posts" ADD CONSTRAINT "Posts_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Posts" ADD CONSTRAINT "Posts_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
