/*
  Warnings:

  - You are about to drop the column `situation` on the `movies` table. All the data in the column will be lost.
  - Added the required column `situationId` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" DROP COLUMN "situation",
ADD COLUMN     "situationId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "MovieSituation";

-- CreateTable
CREATE TABLE "situations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "situations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "situations_name_key" ON "situations"("name");

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "situations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
