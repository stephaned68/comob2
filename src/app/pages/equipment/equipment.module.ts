import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipmentPageRoutingModule } from './equipment-routing.module';

import { FormatEquipNotesPipe } from 'src/app/pipes/format-equip-notes.pipe';
import { EquipmentPage } from './equipment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipmentPageRoutingModule
  ],
  providers: [
    FormatEquipNotesPipe
  ],
  declarations: [
    EquipmentPage,
    FormatEquipNotesPipe
  ]
})
export class EquipmentPageModule {}
