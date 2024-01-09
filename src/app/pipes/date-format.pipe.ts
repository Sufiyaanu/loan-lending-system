import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const [day, month, year] = value.split('-');
    const date = new Date(`${year}-${month}-${day}`);

    if (isNaN(date.getTime())) {
      console.error('Invalid date:', value);
      return value; // Return the original value for invalid dates
    }

    return new DatePipe('en-US').transform(date, 'dd MMM, yyyy') || '';
  }
}
