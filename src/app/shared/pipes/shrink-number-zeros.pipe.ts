import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shrinkNumberZeros',
})
export class ShrinkNumberZerosPipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof value === 'string') {
      const numberValue: number = parseInt(value);
      return isNaN(numberValue) ? value : this.transform(numberValue);
    } else if (isNaN(value)) {
      return 'NaN';
    }

    const absValue: number = Math.abs(value);

    if (absValue < 1000) {
      return value.toString();
    }

    const numTrailingZeros: number = (absValue.toString().match(/000/g) || [])
      .length;
    const suffix: string = 'k'.repeat(numTrailingZeros);
    const roundedValue: number = Math.floor(
      absValue / Math.pow(1000, numTrailingZeros)
    );

    return (value < 0 ? '-' : '') + roundedValue + suffix;
  }
}
