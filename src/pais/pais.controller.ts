import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  HttpStatus,
  Res,
  HttpException,
  UsePipes,
} from '@nestjs/common';
import { PaisService } from './pais.service';
import { QueryValidationPipe } from 'src/core/pipes/query.pipe';
import { ApiQuery, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Pais')
@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}

  @Get('find')
  @ApiOperation({ summary: 'Obtener un país por nombre, capital o continente' })
  @ApiQuery({ name: 'nombre', required: false })
  @ApiQuery({ name: 'capital', required: false })
  @ApiQuery({ name: 'continente', required: false })
  @UsePipes(QueryValidationPipe)
  async findBy(
    @Query('nombre') nombre?: string,
    @Query('capital') capital?: string,
    @Query('continente') continente?: string,
  ) {
    return await this.paisService.getBy(nombre, capital, continente);
  }

  @Get('/')
  @ApiOperation({ summary: 'Obtener todos los países' })
  async findAll() {
    return await this.paisService.getPaises();
  }

  @Get('/excel')
  @ApiOperation({ summary: 'Obtener un excel con todos los países' })
  async getExcel(@Res() res: Response) {
    try {
      const workbook = await this.paisService.getExcel();

      if (workbook instanceof HttpException) {
        throw workbook; // Pasamos la excepción para manejarla en el middleware de error
      }

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=paises.xlsx');

      await workbook.xlsx.write(res);

      res.end();
    } catch (error) {
      return error;
    }
  }

  @Get('/order/:order')
  @ApiOperation({
    summary: 'Ordenar los países por nombre, capital o continente',
  })
  @ApiParam({ name: 'order', required: true })
  async orderBy(@Param('order') order: string) {
    return await this.paisService.orderBy(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un país por id' })
  @ApiParam({ name: 'id', required: true })
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.paisService.getPais(id);
  }
}
