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
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  capital: Nombre[];

  @IsNotEmpty()
  @IsArray()
  moneda: Nombre[];

  @IsNotEmpty()
  @IsObject()
  bandera: Flags;

  @IsNotEmpty()
  @IsArray()
  lenguaje: Nombre[];

  @IsNotEmpty()
  @IsArray()
  continente: Nombre[];

  @IsNotEmpty()
  @IsNumber()
  poblacion: number;
}

export class CreateContinenteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
