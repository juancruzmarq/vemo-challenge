import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateActividadDto {
  @ApiProperty({
    description: 'Nombre de la actividad',
    example: 'Caminata',
    type: String,
    required: true,
  })
  @IsNotEmpty({
    message: 'El nombre es requerido',
  })
  @IsString({
    message: 'El nombre debe ser un string',
  })
  nombre: string;

  @ApiProperty({
    description: 'Lugar de la actividad',
    example: 'Cerro San Cristobal',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'El precio es requerido' })
  @IsString({
    message: 'El lugar debe ser un string',
  })
  lugar: string;

  @ApiProperty({
    description: 'Descripción de la actividad',
    example: 'Caminata por el cerro San Cristobal',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'La descripción debe ser un string',
  })
  descripcion: string;

  @ApiProperty({
    description: 'Temporada de la actividad',
    example: 'Verano',
    type: String,
    required: true,
  })
  @IsNotEmpty({
    message: 'La temporada es requerida',
  })
  @IsEnum(['Verano', 'Invierno', 'Otoño', 'Primavera'], {
    message: 'La temporada debe ser Verano, Invierno, Otoño o Primavera',
  })
  temporada: string;

  @ApiProperty({
    description: 'Si la actividad es gratis o no',
    example: true,
    type: Boolean,
    required: true,
  })
  @IsNotEmpty({
    message: 'la propiedad gratis es requerida',
  })
  @IsBoolean({
    message: 'El campo gratis debe ser un booleano',
  })
  gratis: boolean;
}

export class UpdateActividadDto {
  @ApiProperty({
    description: 'Nombre de la actividad',
    example: 'Caminata',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'El nombre debe ser un string',
  })
  nombre: string;

  @ApiProperty({
    description: 'Lugar de la actividad',
    example: 'Cerro San Cristobal',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'El lugar debe ser un string',
  })
  lugar: string;

  @ApiProperty({
    description: 'Descripción de la actividad',
    example: 'Caminata por el cerro San Cristobal',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({
    message: 'La descripción debe ser un string',
  })
  descripcion: string;

  @ApiProperty({
    description: 'Temporada de la actividad',
    example: 'Verano',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsEnum(['Verano', 'Invierno', 'Otoño', 'Primavera'], {
    message: 'La temporada debe ser Verano, Invierno, Otoño o Primavera',
  })
  temporada: string;

  @ApiProperty({
    description: 'Si la actividad es gratis o no',
    example: true,
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean({
    message: 'El campo gratis debe ser un booleano',
  })
  gratis: boolean;

  @ApiProperty({
    description: 'Id del pais',
    example: 1,
    type: Number,
    required: true,
  })
  @IsNotEmpty({
    message: 'El pais_id es requerido',
  })
  @IsNumber(
    {},
    {
      message: 'El pais_id debe ser un número',
    },
  )
  pais_id: number;
}
