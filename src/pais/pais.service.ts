import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaisDto } from './dto/pais.dto';
import { Pais } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { IPais, PaisFormated } from 'src/interfaces/pais.formated';
import { Column, Workbook, Worksheet } from 'exceljs';

@Injectable()
export class PaisService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPaises(): Promise<PaisFormated[] | HttpException> {
    try {
      const paises = await this.prismaService.pais.findMany({
        include: {
          capitales: true,
          continentes: true,
          lenguajes: true,
          monedas: true,
          actividades: true,
        },
      });

      if (paises.length === 0) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      // Se formatea la respuesta para que sea más fácil de consumir
      const paisesFormated = paises.map((pais) => {
        return this.formatResponse(pais);
      });
      return paisesFormated;
    } catch (error) {
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPais(id: number): Promise<PaisFormated | HttpException> {
    try {
      const pais = await this.prismaService.pais.findUnique({
        where: {
          id: id,
        },
        include: {
          capitales: true,
          continentes: true,
          lenguajes: true,
          monedas: true,
          actividades: true,
        },
      });

      if (!pais) {
        return new HttpException('El pais no existe', HttpStatus.NOT_FOUND);
      }

      // Se formatea la respuesta para que sea más fácil de consumir
      const paisFormated = this.formatResponse(pais);

      return paisFormated;
    } catch (error) {
      return new HttpException(
        'Error al obtener el pais',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBy(
    nombre: string,
    capital: string,
    continente: string,
  ): Promise<PaisFormated[] | HttpException> {
    try {
      const paises = await this.prismaService.pais.findMany({
        where: {
          nombre: nombre,
          capitales: {
            some: {
              nombre: capital,
            },
          },
          continentes: {
            some: {
              nombre: continente,
            },
          },
        },
        include: {
          capitales: true,
          continentes: true,
          lenguajes: true,
          monedas: true,
          actividades: true,
        },
      });

      if (paises.length === 0) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      // Se formatea la respuesta para que sea más fácil de consumir
      const paisesFormated = paises.map((pais) => {
        return this.formatResponse(pais);
      });

      return paisesFormated;
    } catch (error) {
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async orderBy(order: string): Promise<PaisFormated[] | HttpException> {
    try {
      // Se obtienen todos los países con sus relaciones
      const paises = await this.prismaService.pais.findMany({
        include: {
          capitales: true,
          continentes: true,
          lenguajes: true,
          monedas: true,
          actividades: true,
        },
      });

      if (paises.length === 0) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      // Se formatea la respuesta para que sea más fácil de consumir
      const paisesFormated = paises.map((pais) => {
        return this.formatResponse(pais);
      });

      // Se ordena la respuesta según el parámetro recibido
      switch (order) {
        case 'nombre':
          const paisesNombreFormated = paisesFormated.sort((a, b) =>
            a.nombre.localeCompare(b.nombre),
          );
          return paisesNombreFormated;
        case 'capital':
          const paisesCapitalFormated = paisesFormated.sort((a, b) =>
            a.capital[0].localeCompare(b.capital[0]),
          );
          return paisesCapitalFormated;
        case 'continente':
          const paisesContinenteFormated = paisesFormated.sort((a, b) =>
            a.continente[0].localeCompare(b.continente[0]),
          );
          return paisesContinenteFormated;
        default:
          return paisesFormated;
      }
    } catch (error) {
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: CreatePaisDto): Promise<Pais | HttpException> {
    try {
      // Se desestructura la data recibida
      const {
        nombre,
        capital,
        bandera,
        poblacion,
        continente,
        lenguaje,
        moneda,
      } = data;

      // Se crea el pais en la base de datos y devuelve el pais creado o actualizado
      const pais = await this.prismaService.pais.upsert({
        where: {
          nombre: nombre,
        },
        update: {
          nombre: nombre,
          poblacion: poblacion,
          png: bandera.png,
          svg: bandera.svg,
          alt: bandera.alt ? bandera.alt : 'Bandera de ' + nombre,
        },
        create: {
          nombre: nombre,
          poblacion: poblacion,
          png: bandera.png,
          svg: bandera.svg,
          alt: bandera.alt ? bandera.alt : 'Bandera de ' + nombre,
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

  async getExcel(): Promise<Workbook | HttpException> {
    try {
      const paises = await this.getPaises();

      if (paises instanceof HttpException) {
        return paises;
      }

      const book = new Workbook();
      const sheet: Worksheet = book.addWorksheet('Paises');

      const columns: Partial<Column>[] = [
        { header: 'Nombre', key: 'nombre', width: 20 },
        { header: 'Capital', key: 'capital', width: 20 },
        { header: 'Continente', key: 'continente', width: 20 },
        { header: 'Moneda', key: 'moneda', width: 20 },
        { header: 'Poblacion', key: 'poblacion', width: 15 },
        { header: 'Lenguaje', key: 'lenguaje', width: 20 },
        { header: 'PNG', key: 'png', width: 20 },
        { header: 'SVG', key: 'svg', width: 20 },
        { header: 'Alt', key: 'alt', width: 20 },
        { header: 'Actividad', key: 'actividad', width: 20 },
        { header: 'Lugar', key: 'lugar', width: 20 },
        { header: 'Descripcion', key: 'descripcion', width: 20 },
        { header: 'Temporada', key: 'temporada', width: 20 },
        { header: 'Gratis', key: 'gratis', width: 20 },
      ];

      sheet.columns = columns;

      // Se recorre la data para añadir los datos al sheet
      const rows = [];

      paises.forEach((pais) => {
        const actividades = pais.actividades || [];
        const capitales = pais.capital || [];
        const continentes = pais.continente || [];
        const monedas = pais.moneda || [];
        const lenguajes = pais.lenguaje || [];

        const rowCount = Math.max(
          capitales.length,
          continentes.length,
          monedas.length,
          lenguajes.length,
          actividades.length,
        );

        for (let i = 0; i < rowCount; i++) {
          const capital = capitales[i % capitales.length] || '';
          const continente = continentes[i % continentes.length] || '';
          const moneda = monedas[i % monedas.length] || '';
          const lenguaje = lenguajes[i % lenguajes.length] || '';

          const row = {
            nombre: pais.nombre,
            capital: capital,
            continente: continente,
            moneda: moneda,
            poblacion: pais.poblacion,
            lenguaje: lenguaje,
            png: pais.bandera?.png,
            svg: pais.bandera?.svg,
            alt: pais.bandera?.alt || '',
            actividad: i < actividades.length ? actividades[i].nombre : '',
            lugar: i < actividades.length ? actividades[i].lugar : '',
            descripcion:
              i < actividades.length ? actividades[i].descripcion : '',
            temporada: i < actividades.length ? actividades[i].temporada : '',
            gratis:
              i < actividades.length
                ? actividades[i].gratis
                  ? 'Si'
                  : 'No'
                : '',
          };

          rows.push(row);
        }
      });

      sheet.addRows(rows);

      sheet.autoFilter = {
        from: 'A1',
        to: 'N1',
      };

      // Estilo al header
      sheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
        if (rowNumber === 1) {
          row.eachCell((cell) => {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FF000000' },
              bgColor: { argb: 'FF000000' },
            };
            cell.font = {
              color: { argb: 'FFFFFFFF' },
              bold: true,
            };
          });
        }
      });

      return book;
    } catch (error) {
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Formatea la respuesta para que sea más fácil de consumir
  private formatResponse(pais: IPais): PaisFormated {
    const paisFormated = {
      nombre: pais.nombre,
      capital: pais.capitales.map((capital) => capital.nombre),
      bandera: {
        png: pais.png,
        svg: pais.svg,
        alt: pais.alt,
      },
      moneda: pais.monedas.map((moneda) => moneda.nombre),
      poblacion: pais.poblacion,
      continente: pais.continentes.map((continente) => continente.nombre),
      lenguaje: pais.lenguajes.map((lenguaje) => lenguaje.nombre),
      actividades: pais.actividades.map((actividad) => {
        return {
          nombre: actividad.nombre,
          lugar: actividad.lugar,
          descripcion: actividad.descripcion,
          temporada: actividad.temporada,
          gratis: actividad.gratis,
        };
      }),
    };
    return paisFormated;
  }
}
