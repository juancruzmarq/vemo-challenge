import { Injectable, Logger } from '@nestjs/common';
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
  private logger = new Logger('PaisServiceJob');
  constructor(private readonly paisService: PaisService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Se ejecuta todos los dias a la medianoche
  async getPaises() {
    try {
      this.logger.log('Obteniendo paises de la API');
      const response = await axios.get<Paises>(URL_API); // Se obtiene la data de la API
      const paises = response.data;
      const paisesFormateados = await this.formatPaises(paises); // Se formatea la data

      // Se llama al servicio de pais para crear los paises en la base de datos
      Promise.all(
        paisesFormateados.map(async (pais) => {
          await this.paisService.create(pais);
        }),
      );
      this.logger.log('Paises creados');
    } catch (error) {
      this.logger.error('Error al obtener los paises', error);
      return error;
    }
  }

  async formatPaises(paises: Paises): Promise<CreatePaisDto[]> {
    try {
      const paisesFormateados: CreatePaisDto[] = [];

      paises.forEach((pais: Pais) => {
        const nombre = pais.name.common;
        const capital = pais.capital
          ? this.getCapitales(pais.capital)
          : this.noTiene('capital');

        const moneda = pais.currencies
          ? this.getMonedas(pais.currencies)
          : this.noTiene('moneda');

        const lenguaje = pais.languages
          ? this.getLanguages(pais.languages)
          : this.noTiene('lenguaje');

        const continente = pais.continents
          ? this.getContinentes(pais.continents)
          : this.noTiene('continente');

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
      this.logger.error('Error al formatear los paises', error);
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
      this.logger.error('Error al formatear las monedas', error);
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
      this.logger.error('Error al formatear los lenguajes', error);
      return error;
    }
  }

  private getContinentes(continentes: string[]) {
    try {
      const continentsFormateados = continentes.map((continente) => {
        return {
          nombre: continente,
        };
      });
      return continentsFormateados;
    } catch (error) {
      this.logger.error('Error al formatear los continentes', error);
      return error;
    }
  }

  private getCapitales(capitales: string[]) {
    try {
      const capitalesFormateadas = capitales.map((capital) => {
        return {
          nombre: capital,
        };
      });
      return capitalesFormateadas;
    } catch (error) {
      this.logger.error('Error al obtener las capitales', error);
      return error;
    }
  }

  private getBandera(bandera: string[]) {
    try {
      const banderaFormateada = bandera.map((bandera) => {
        return {
          nombre: bandera,
        };
      });
      return banderaFormateada;
    } catch (error) {
      this.logger.error('Error al obtener las banderas', error);
      return error;
    }
  }

  private noTiene(propiedad: string) {
    return [
      {
        nombre: `No tiene ${propiedad}`,
      },
    ];
  }
}
