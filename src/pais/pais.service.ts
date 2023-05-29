import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaisDto } from './dto/pais.dto';
import { Pais } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PaisFormated } from 'src/interfaces/pais.formated';

@Injectable()
export class PaisService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<PaisFormated[] | HttpException> {
    try {
      const paises = await this.prismaService.pais.findMany({
        include: {
          capitales: true,
          continentes: true,
          lenguajes: true,
          monedas: true,
        },
      });

      const paisesFormated = paises.map((pais) => {
        return {
          nombre: pais.nombre,
          capital: pais.capitales.map((capital) => capital.nombre),
          bandera: {
            png: pais.png,
            svg: pais.svg,
            alt: pais.alt,
          },
          poblacion: pais.poblacion,
          continente: pais.continentes.map((continente) => continente.nombre),
          lenguaje: pais.lenguajes.map((lenguaje) => lenguaje.nombre),
        };
      });
      return paisesFormated;
    } catch (error) {
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: CreatePaisDto): Promise<Pais | HttpException> {
    try {
      const {
        nombre,
        capital,
        bandera,
        poblacion,
        continente,
        lenguaje,
        moneda,
      } = data;

      const pais = await this.prismaService.pais.upsert({
        where: {
          nombre: nombre,
        },
        update: {
          nombre: nombre,
          poblacion: poblacion,
          png: bandera.png,
          svg: bandera.svg,
          alt: bandera.alt ? bandera.alt : nombre,
        },
        create: {
          nombre: nombre,
          poblacion: poblacion,
          png: bandera.png,
          svg: bandera.svg,
          alt: bandera.alt ? bandera.alt : nombre,
        },
      });

      // Crea o actualiza el continente en la base de datos y devuelve el continente creado o actualizado
      const continentes = await Promise.all(
        continente.map(async (continente) => {
          return await this.prismaService.continente.upsert({
            where: {
              nombre: continente.nombre,
            },
            update: {
              nombre: continente.nombre,
            },
            create: {
              nombre: continente.nombre,
            },
          });
        }),
      );

      // Crea o actualiza el lenguaje en la base de datos y devuelve el lenguaje creado o actualizado
      const lenguajes = await Promise.all(
        lenguaje.map(async (lenguaje) => {
          return await this.prismaService.lenguaje.upsert({
            where: {
              nombre: lenguaje.nombre,
            },
            update: {
              nombre: lenguaje.nombre,
            },
            create: {
              nombre: lenguaje.nombre,
            },
          });
        }),
      );

      // Crea o actualiza la moneda en la base de datos y devuelve la moneda creada o actualizada
      const monedas = await Promise.all(
        moneda.map(async (moneda) => {
          return await this.prismaService.moneda.upsert({
            where: {
              nombre: moneda.nombre,
            },
            update: {
              nombre: moneda.nombre,
            },
            create: {
              nombre: moneda.nombre,
            },
          });
        }),
      );

      // Crea o actualiza la capital en la base de datos y devuelve la capital creada o actualizada
      const capitals = await Promise.all(
        capital.map(async (capital) => {
          return await this.prismaService.capital.upsert({
            where: {
              nombre_paisId: {
                nombre: capital.nombre,
                paisId: pais.id,
              },
            },
            update: {
              nombre: capital.nombre,
            },
            create: {
              nombre: capital.nombre,
              pais: {
                connect: {
                  id: pais.id,
                },
              },
            },
          });
        }),
      );

      // Actualiza el pais con las relaciones
      const paisCreated = await this.prismaService.pais.update({
        where: {
          id: pais.id,
        },
        data: {
          continentes: {
            connect: continentes.map((continente) => ({ id: continente.id })),
          },
          lenguajes: {
            connect: lenguajes.map((lenguaje) => ({ id: lenguaje.id })),
          },
          monedas: {
            connect: monedas.map((moneda) => ({ id: moneda.id })),
          },
          capitales: {
            connect: capitals.map((capital) => ({ id: capital.id })),
          },
        },
      });

      return paisCreated;
    } catch (error) {
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
