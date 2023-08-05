import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'formatEquipment'
})
export class FormatEquipmentPipe implements PipeTransform {

  transform(values: string[], ...args: unknown[]): SafeHtml {
    let [ designation, special , number ] = values;
    designation = designation.replaceAll("\'", "&apos;");
    special = special || "";
    let numberOf = parseInt(number) || 0;
    let equipment = "";
    if (special === "") {
      equipment = designation;
    } else {
      equipment = special.replaceAll("\'", "&apos;");
      if (equipment.startsWith("(") && equipment.endsWith(")")) {
        equipment = designation + "<br>" + equipment;
      } else if (equipment.indexOf(" (") !== -1) {
        equipment = equipment.replaceAll(" (", "<br>(");
      }
    }
    if (numberOf > 1) equipment = `${numberOf}x ${equipment}`;
    return equipment;
  }

}
