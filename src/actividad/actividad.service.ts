import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Actividad } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateActividadDto } from './dto/actividad.dto';

@Injectable()
export class ActividadService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllActividades(): Promise<Actividad[] | HttpException> {
    try {
      const actividades = await this.prismaService.actividad.findMany({
        include: {
          pais: true,
        },
      });
      return actividades;
    } catch (error) {
      return new HttpException(
        'Error al obtener las actividades',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getActividad(id: number): Promise<Actividad | HttpException> {
    try {
      const actividad = await this.prismaService.actividad.findUnique({
        where: { id: id },
        include: {
          pais: true,
        },
      });

      if (!actividad) {
        return new HttpException(
          'La actividad no existe',
          HttpStatus.NOT_FOUND,
        );
      }

      return actividad;
    } catch (error) {
      return new HttpException(
        'Error al obtener la actividad',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getActividades(
    pais: string,
    temporada: string,
    continente: string,
  ): Promise<Actividad[] | HttpException> {
    try {
      const actividades = await this.prismaService.actividad.findMany({
        where: {
          pais: {
            nombre: pais,
            continentes: {
              some: {
                nombre: continente,
              },
            },
          },
          temporada: temporada,
        },
        include: {
          pais: true,
        },
      });

      if (actividades.length == 0) {
        return new HttpException(
          'No hay actividades para los parametros ingresados',
          HttpStatus.NOT_FOUND,
        );
      }

      return actividades;
    } catch (error) {
      return new HttpException(
        'Error al obtener las actividades',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getActividadesByPais(pais: number) {
    try {
      const actividades = await this.prismaService.actividad.findMany({
        where: {
          paisId: pais,
        },
        include: {
          pais: true,
        },
      });
      if (actividades.length == 0) {
        return new HttpException(
          'No hay actividades para el pais',
          HttpStatus.NOT_FOUND,
        );
      }
      return actividades;
    } catch (error) {
      return new HttpException(
        'Error al obtener las actividades',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createActividad(
    pais: number,
    actividad: CreateActividadDto,
  ): Promise<Actividad | HttpException> {
    try {
      const actividadCreada = await this.prismaService.actividad.create({
        data: {
          nombre: actividad.nombre,
          lugar: actividad.lugar,
          descripcion: actividad.descripcion,
          temporada: actividad.temporada,
          gratis: actividad.gratis,
          paisId: pais,
        },
      });
      return actividadCreada;
    } catch (error) {
      return new HttpException(
        'Error al crear la actividad',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
