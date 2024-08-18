import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'formatEquipNotes'
})
export class FormatEquipNotesPipe implements PipeTransform {

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

  transform(value?: string, args?: any): SafeHtml {
    let notes = '';
    
    if (value) {
      const lines = value.split('\n');
      for (let line of lines) {
        let title = '';
        if (line.indexOf(':') !== -1) {
          [ title, line ] = line.split(':');
          title = `<strong>${title}:</strong>`;
        }
        const ionIcon = this.getIonIcon(line);
        line = line.replaceAll('&#39;', '\'');
        notes += `<p>${title}${ionIcon}${line}</p>`;
      }
    }

    return this.sanitizer.bypassSecurityTrustHtml(notes);
  }

}
