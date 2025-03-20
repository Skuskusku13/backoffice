import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date-group-label',
  standalone: true,
})
export class DateGroupLabelPipe implements PipeTransform {
  transform(value: string): string {
    if (value.includes('Q')) {
      console.log('value', value + ' ' + value.split('Q')[1]);

      const year = value.split('-')[0];
      const quarterNumber = Math.ceil(parseInt(value.split('Q')[1], 10) / 3);
      return `${year}-Q${quarterNumber}`;
    } else {
      return value;
    }
  }
}
