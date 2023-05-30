import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateActividadDto {
  @IsNotEmpty({
    message: 'El nombre es requerido',
  })
  @IsString({
    message: 'El nombre debe ser un string',
  })
  nombre: string;

  @IsNotEmpty({ message: 'El precio es requerido' })
  @IsString({
    message: 'El lugar debe ser un string',
  })
  lugar: string;

  @IsOptional()
  @IsString({
    message: 'La descripción debe ser un string',
  })
  descripcion: string;

  @IsNotEmpty({
    message: 'La temporada es requerida',
  })
  @IsEnum(['Verano', 'Invierno', 'Otoño', 'Primavera'], {
    message: 'La temporada debe ser Verano, Invierno, Otoño o Primavera',
  })
  temporada: string;

  @IsNotEmpty({
    message: 'la propiedad gratis es requerida',
  })
  @IsBoolean({
    message: 'El campo gratis debe ser un booleano',
  })
  gratis: boolean;
}

export class UpdateActividadDto {
  @IsOptional()
  @IsString({
    message: 'El nombre debe ser un string',
  })
  nombre: string;

  @IsOptional()
  @IsString({
    message: 'El lugar debe ser un string',
  })
  lugar: string;

  @IsOptional()
  @IsString({
    message: 'La descripción debe ser un string',
  })
  descripcion: string;

  @IsOptional()
  @IsEnum(['Verano', 'Invierno', 'Otoño', 'Primavera'], {
    message: 'La temporada debe ser Verano, Invierno, Otoño o Primavera',
  })
  temporada: string;

  @IsOptional()
  @IsBoolean({
    message: 'El campo gratis debe ser un booleano',
  })
  gratis: boolean;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'El pais_id debe ser un número',
    },
  )
  pais_id: number;
}
