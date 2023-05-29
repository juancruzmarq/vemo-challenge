import { Capital, Continente, Lenguaje, Moneda } from '@prisma/client';

export interface IPais {
  nombre: string;
  png: string;
  svg: string;
  alt: string;
  capitales: Capital[];
  poblacion: number;
  monedas: Moneda[];
  continentes: Continente[];
  lenguajes: Lenguaje[];
}

export interface PaisFormated {
  nombre: string;
  capital: string[];
  bandera: {
    png: string;
    svg: string;
    alt: string;
  };
  poblacion: number;
  moneda: string[];
  continente: string[];
  lenguaje: string[];
}
