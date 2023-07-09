import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'formatNotes'
})
export class FormatNotesPipe implements PipeTransform {

  transform(value: string, args?: any): SafeHtml {
    let notes = '';
    for (let line of value.split('\n')) {
      let title = '';
      if (line.indexOf(':') !== -1) {
        title = `<strong>${line.split(':')[0]}:</strong>`;
        line = line.split(':')[1];
      }
      line = line.replaceAll('&#39;', '\'');
      notes += `<p>${title}${line}</p>`;
    }
    return notes;
  }

}
