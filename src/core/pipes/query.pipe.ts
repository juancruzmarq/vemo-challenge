import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class QueryValidationPipe implements PipeTransform {
  readonly temporadas = ['Verano', 'Invierno', 'Otoño', 'Primavera'];
  readonly continentes = [
    'Africa',
    'Asia',
    'Europe',
    'Oceania',
    'South America',
    'North America',
    'Antarctica',
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    const { type, data } = metadata;

    // Se valida que el valor no sea vacío y se formatea
    if (type === 'query') {
      switch (data) {
        case 'nombre':
          if (!value) return value;
          value = this.capitalize(value);
          break;
        case 'capital':
          if (!value) return value;
          value = this.capitalize(value);
          break;
        case 'continente':
          if (!value) return value;
          value = this.capitalize(value);
          if (!this.continentes.includes(value)) {
            throw new BadRequestException(
              `El continente debe ser uno de los siguientes: ${this.continentes}`,
            );
          }
          break;
        case 'temporada':
          console.log(value);
          if (!value) return value;
          value = this.capitalize(value);
          if (!this.temporadas.includes(value)) {
            throw new BadRequestException(
              `La temporada debe ser una de las siguientes: ${this.temporadas}`,
            );
          }
          break;
        default:
          throw new BadRequestException('Query no valida');
      }
    }

    return value;
  }

  private capitalize(value: string) {
    if (!value) {
      return value;
    }
    const arr = value.split(' ');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(' ');
  }
}
