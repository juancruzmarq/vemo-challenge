import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  IsObject,
} from 'class-validator';
import { Flags } from 'src/interfaces/pais.response';

interface Nombre {
  nombre: string;
}

export class CreatePaisDto {
  @IsNotEmpty({
    message: 'El nombre no puede estar vacio',
  })
  @IsString({
    message: 'El nombre debe ser un string',
  })
  nombre: string;

  @IsNotEmpty({
    message: 'La capital no puede estar vacia',
  })
  @IsArray({
    message: 'La capital debe ser un array',
  })
  capital: Nombre[];

  @IsNotEmpty({
    message: 'La moneda no puede estar vacia',
  })
  @IsArray({
    message: 'La moneda debe ser un array',
  })
  moneda: Nombre[];

  @IsNotEmpty({
    message: 'La bandera no puede estar vacia',
  })
  @IsObject({
    message: 'La bandera debe ser un objeto, con los campos png, svg y alt',
  })
  bandera: Flags;

  @IsNotEmpty({
    message: 'El lenguaje no puede estar vacio',
  })
  @IsArray({
    message: 'El lenguaje debe ser un array',
  })
  lenguaje: Nombre[];

  @IsNotEmpty({
    message: 'El continente no puede estar vacio',
  })
  @IsArray({
    message: 'El continente debe ser un array',
  })
  continente: Nombre[];

  @IsNotEmpty({
    message: 'La poblacion no puede estar vacia',
  })
  @IsNumber(
    {},
    {
      message: 'La poblacion debe ser un numero',
    },
  )
  poblacion: number;
}
