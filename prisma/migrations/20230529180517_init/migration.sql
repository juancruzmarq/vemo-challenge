-- CreateTable
CREATE TABLE "Pais" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "poblacion" INTEGER NOT NULL,

    CONSTRAINT "Pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Continente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Continente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capital" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "Capital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lenguaje" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Lenguaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moneda" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Moneda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bandera" (
    "id" SERIAL NOT NULL,
    "png" TEXT NOT NULL,
    "svg" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "Bandera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContinenteToPais" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LenguajeToPais" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MonedaToPais" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Continente_nombre_key" ON "Continente"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Bandera_paisId_key" ON "Bandera"("paisId");

-- CreateIndex
CREATE UNIQUE INDEX "_ContinenteToPais_AB_unique" ON "_ContinenteToPais"("A", "B");

-- CreateIndex
CREATE INDEX "_ContinenteToPais_B_index" ON "_ContinenteToPais"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LenguajeToPais_AB_unique" ON "_LenguajeToPais"("A", "B");

-- CreateIndex
CREATE INDEX "_LenguajeToPais_B_index" ON "_LenguajeToPais"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MonedaToPais_AB_unique" ON "_MonedaToPais"("A", "B");

-- CreateIndex
CREATE INDEX "_MonedaToPais_B_index" ON "_MonedaToPais"("B");

-- AddForeignKey
ALTER TABLE "Capital" ADD CONSTRAINT "Capital_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bandera" ADD CONSTRAINT "Bandera_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContinenteToPais" ADD CONSTRAINT "_ContinenteToPais_A_fkey" FOREIGN KEY ("A") REFERENCES "Continente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContinenteToPais" ADD CONSTRAINT "_ContinenteToPais_B_fkey" FOREIGN KEY ("B") REFERENCES "Pais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LenguajeToPais" ADD CONSTRAINT "_LenguajeToPais_A_fkey" FOREIGN KEY ("A") REFERENCES "Lenguaje"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LenguajeToPais" ADD CONSTRAINT "_LenguajeToPais_B_fkey" FOREIGN KEY ("B") REFERENCES "Pais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonedaToPais" ADD CONSTRAINT "_MonedaToPais_A_fkey" FOREIGN KEY ("A") REFERENCES "Moneda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonedaToPais" ADD CONSTRAINT "_MonedaToPais_B_fkey" FOREIGN KEY ("B") REFERENCES "Pais"("id") ON DELETE CASCADE ON UPDATE CASCADE;
