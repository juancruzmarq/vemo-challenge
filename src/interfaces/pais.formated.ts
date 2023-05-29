export interface PaisFormated {
  nombre: string;
  capital: string[];
  bandera: {
    png: string;
    svg: string;
    alt: string;
  };
  poblacion: number;
  continente: string[];
  lenguaje: string[];
}
