-- CreateTable
CREATE TABLE "Actividad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "lugar" TEXT NOT NULL,
    "descripcion" TEXT,
    "temporada" TEXT NOT NULL,
    "gratis" BOOLEAN NOT NULL,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
