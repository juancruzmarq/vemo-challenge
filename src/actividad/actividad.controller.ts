import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CreateActividadDto, UpdateActividadDto } from './dto/actividad.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { QueryValidationPipe } from 'src/core/pipes/query.pipe';

@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Get('/find')
  @ApiOperation({ summary: 'Obtener actividades por pais' })
  @ApiParam({ name: 'pais', type: String, required: false })
  @ApiParam({ name: 'temporada', type: String, required: false })
  @ApiParam({ name: 'continente', type: String, required: false })
  async getActividadesPais(
    @Query('pais') pais?: string,
    @Query('temporada', QueryValidationPipe) temporada?: string,
    @Query('continente', QueryValidationPipe) continente?: string,
  ) {
    return this.actividadService.getActividades(pais, temporada, continente);
  }

  @Get(':id/')
  @ApiOperation({ summary: 'Obtener actividad' })
  @ApiParam({ name: 'id', type: Number, required: true })
  async getActividad(@Param('id', ParseIntPipe) id: number) {
    return this.actividadService.getActividad(id);
  }

  @Get('pais/:pais')
  @ApiOperation({ summary: 'Obtener actividades por pais' })
  @ApiParam({ name: 'pais', type: Number, required: true })
  async getActividadesByPais(@Param('pais', ParseIntPipe) pais: number) {
    return this.actividadService.getActividadesByPais(pais);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las actividades' })
  async getActividades() {
    return this.actividadService.getAllActividades();
  }

  @Post(':pais')
  @ApiOperation({ summary: 'Crear actividad' })
  @ApiParam({ name: 'pais', type: Number, required: true })
  async createActividad(
    @Param('pais', ParseIntPipe) pais: number,
    @Body() actividad: CreateActividadDto,
  ) {
    return this.actividadService.create(pais, actividad);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar actividad' })
  @ApiParam({ name: 'id', type: Number, required: true })
  async updateActividad(
    @Param('id', ParseIntPipe) id: number,
    @Body() actividad: UpdateActividadDto,
  ) {
    return this.actividadService.update(id, actividad);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar actividad' })
  @ApiParam({ name: 'id', type: Number, required: true })
  async deleteActividad(@Param('id', ParseIntPipe) id: number) {
    return this.actividadService.delete(id);
  }
}
