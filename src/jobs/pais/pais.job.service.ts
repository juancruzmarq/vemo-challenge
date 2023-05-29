import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { URL_API } from 'src/constants';
import {
  Currencies,
  Languages,
  Pais,
  Paises,
} from 'src/interfaces/pais.response';
import { CreatePaisDto } from 'src/pais/dto/pais.dto';
import { PaisService } from 'src/pais/pais.service';

@Injectable()
export class PaisServiceJob {
  constructor(private readonly paisService: PaisService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Se ejecuta todos los dias a la medianoche
  async getPaises() {
    try {
      console.log('Ejecutando cron job');
      const response = await axios.get<Paises>(URL_API); // Se obtiene la data de la API
      const paises = response.data;
      const paisesFormateados = await this.formatPaises(paises); // Se formatea la data
      // Se llama al servicio de pais para crear los paises en la base de datos
      Promise.all(
        paisesFormateados.map(async (pais) => {
          await this.paisService.create(pais);
        }),
      );
    } catch (error) {
      console.log('Error al ejecutar el cron job', error);
      return error;
    }
  }

  async formatPaises(paises: Paises): Promise<CreatePaisDto[]> {
    try {
      const paisesFormateados: CreatePaisDto[] = [];
      paises.forEach((pais: Pais) => {
        const nombre = pais.name.common;
        const capital = pais.capital
          ? pais.capital.map((capital) => {
              return {
                nombre: capital,
              };
            })
          : [
              {
                nombre: 'No tiene capital',
              },
            ];

        const moneda = pais.currencies
          ? this.getMonedas(pais.currencies)
          : [
              {
                nombre: 'No tiene moneda',
              },
            ];
        const lenguaje = pais.languages
          ? this.getLanguages(pais.languages)
          : [
              {
                nombre: 'No tiene lenguaje',
              },
            ];
        const continente = pais.continents.map((continente) => {
          return {
            nombre: continente,
          };
        });
        const bandera = pais.flags;
        const poblacion = pais.population;

        paisesFormateados.push({
          nombre,
          capital,
          moneda,
          lenguaje,
          continente,
          bandera,
          poblacion,
        });
      });
      return paisesFormateados;
    } catch (error) {
      console.log('Error al formatear los paises', error);
      return error;
    }
  }

  private getMonedas(monedas: Currencies) {
    try {
      const monedasFormateadas = [];
      Object.keys(monedas).forEach((moneda) => {
        monedasFormateadas.push({ nombre: monedas[moneda].name });
      });
      return monedasFormateadas;
    } catch (error) {
      console.log('Error al formatear las monedas', error);
      return error;
    }
  }

  private getLanguages(languages: Languages) {
    try {
      const languagesFormateados = [];
      Object.keys(languages).forEach((language) => {
        languagesFormateados.push({ nombre: languages[language] });
      });
      return languagesFormateados;
    } catch (error) {
      console.log('Error al formatear los lenguajes', error);
      return error;
    }
  }
}
