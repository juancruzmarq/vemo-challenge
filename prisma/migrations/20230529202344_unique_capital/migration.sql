/*
  Warnings:

  - A unique constraint covering the columns `[nombre,paisId]` on the table `Capital` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Capital_nombre_paisId_key" ON "Capital"("nombre", "paisId");
