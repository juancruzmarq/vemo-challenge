/*
  Warnings:

  - A unique constraint covering the columns `[png]` on the table `Bandera` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[svg]` on the table `Bandera` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Lenguaje` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Moneda` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Pais` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bandera_png_key" ON "Bandera"("png");

-- CreateIndex
CREATE UNIQUE INDEX "Bandera_svg_key" ON "Bandera"("svg");

-- CreateIndex
CREATE UNIQUE INDEX "Lenguaje_nombre_key" ON "Lenguaje"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Moneda_nombre_key" ON "Moneda"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Pais_nombre_key" ON "Pais"("nombre");
