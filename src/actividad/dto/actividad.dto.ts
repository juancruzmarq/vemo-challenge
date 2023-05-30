import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateActividadDto {
  @IsNotEmpty()
  @IsString({
    message: 'El nombre debe ser un string',
  })
  nombre: string;

  @IsNotEmpty()
  @IsString({
    message: 'El lugar debe ser un string',
  })
  lugar: string;

  @IsOptional()
  @IsString({
    message: 'La descripción debe ser un string',
  })
  descripcion: string;

  @IsNotEmpty()
  @IsEnum(['Verano', 'Invierno', 'Otoño', 'Primavera'], {
    message: 'La temporada debe ser Verano, Invierno, Otoño o Primavera',
  })
  temporada: string;

  @IsNotEmpty()
  @IsBoolean({
    message: 'El campo gratis debe ser un booleano',
  })
  gratis: boolean;
}
