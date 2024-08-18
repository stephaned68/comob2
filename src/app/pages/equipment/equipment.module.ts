import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipmentPageRoutingModule } from './equipment-routing.module';

import { FormatNotesPipe } from 'src/app/pipes/format-notes.pipe';
import { EquipmentPage } from './equipment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipmentPageRoutingModule
  ],
  providers: [
    FormatNotesPipe
  ],
  declarations: [
    EquipmentPage,
    FormatNotesPipe
  ]
})
export class EquipmentPageModule {}
