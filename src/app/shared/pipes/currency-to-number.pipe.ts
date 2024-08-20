import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyToNumber',
})
export class CurrencyToNumberPipe implements PipeTransform {
  transform(value: string): number {
    return Number(value.replace(/[^0-9.-]+/g, ''));
  }
}
