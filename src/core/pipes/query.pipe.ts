import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class QueryValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type, data } = metadata;

    // Se valida que el valor no sea vacío y se formatea
    if (type === 'query') {
      switch (data) {
        case 'nombre':
          value = this.capitalize(value);
          break;
        case 'capital':
          value = this.capitalize(value);
          break;
        case 'continente':
          value = this.capitalize(value);
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
