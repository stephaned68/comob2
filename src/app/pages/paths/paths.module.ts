import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PathsPageRoutingModule } from './paths-routing.module';

import { PathsPage } from './paths.page';

import { FormatEquipmentPipe } from '../../pipes/format-equipment.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PathsPageRoutingModule
  ],
  declarations: [
    PathsPage,
    FormatEquipmentPipe
  ]
})
export class PathsPageModule {}
