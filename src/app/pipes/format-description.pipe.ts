import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'formatDescription'
})
export class FormatDescriptionPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  private getIonIcon(line: string) {
    let ionIcon = "";
    
    if (line.startsWith('Défense ')) 
      ionIcon = 'shield-half-outline';
    if (line.startsWith('Points de vigueur ')) 
      ionIcon = 'heart';
    if (line.startsWith('Initiative ')) 
      ionIcon = 'flash';
    
    return ionIcon !== '' ? `<ion-icon name="${ionIcon}"></ion-icon> ` : '';
  }

  transform(value: string, args?: any): SafeHtml {
    let cleanedUp = value
      .replaceAll('&#39;', '\'')
      .replaceAll('\r\n', '\n')
      .replaceAll('&#13;&#10;', '\n');

    let transformed = '';
    for (let line of cleanedUp.split('\n')) {
      if (line.trim().endsWith(':')) {
        line = `<strong>${line}</strong>`;
      }
      transformed += '<br>' + this.getIonIcon(line) + line;
    }
    transformed = transformed.slice(4);
  
    return this.sanitizer.bypassSecurityTrustHtml(transformed);
  }

}
