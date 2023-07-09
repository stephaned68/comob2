import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AbilitiesPageRoutingModule } from './abilities-routing.module';
import { AbilitiesPage } from './abilities.page';
import { FormatNotesPipe } from '../../pipes/format-notes.pipe';
import { FormatDescriptionPipe } from '../../pipes/format-description.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbilitiesPageRoutingModule
  ],
  providers: [
    FormatNotesPipe,
    FormatDescriptionPipe
  ],
  declarations: [
    AbilitiesPage,
    FormatNotesPipe,
    FormatDescriptionPipe
  ]
})
export class AbilitiesPageModule {}
