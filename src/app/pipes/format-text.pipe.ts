import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText'
})
export class FormatTextPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    // Split the input value into words
    const words = value.split(' ');

    // Capitalize the first letter of each word and join them back together
    const titleCaseWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    // Join the title case words with spaces
    return titleCaseWords.join(' ');
  }
}
