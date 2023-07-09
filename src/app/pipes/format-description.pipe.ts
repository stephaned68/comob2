import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'formatDescription'
})
export class FormatDescriptionPipe implements PipeTransform {

  transform(value: string, args?: any): SafeHtml {
    let cleanedUp = value
      .replaceAll('&#39;', '\'')
      .replaceAll('\r\n', '\n')
      .replaceAll('&#13;&#10;', '\n');

    let transformed = '';
    for (let line of cleanedUp.split('\n')) {
      if (line.trim().endsWith(':')) {
        line = `<strong>${line}</strong>`
      }
      transformed += '<br>' + line;
    }
    transformed = transformed.slice(4);
  
    return transformed;
  }

}
