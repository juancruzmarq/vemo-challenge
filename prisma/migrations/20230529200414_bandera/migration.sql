/*
  Warnings:

  - You are about to drop the `Bandera` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[png]` on the table `Pais` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[svg]` on the table `Pais` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alt` to the `Pais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `png` to the `Pais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `svg` to the `Pais` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bandera" DROP CONSTRAINT "Bandera_paisId_fkey";

-- AlterTable
ALTER TABLE "Pais" ADD COLUMN     "alt" TEXT NOT NULL,
ADD COLUMN     "png" TEXT NOT NULL,
ADD COLUMN     "svg" TEXT NOT NULL;

-- DropTable
DROP TABLE "Bandera";

-- CreateIndex
CREATE UNIQUE INDEX "Pais_png_key" ON "Pais"("png");

-- CreateIndex
CREATE UNIQUE INDEX "Pais_svg_key" ON "Pais"("svg");
