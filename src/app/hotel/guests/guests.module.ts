import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestsPageRoutingModule } from './guests-routing.module';

import { GuestsPage } from './guests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestsPageRoutingModule
  ],
  declarations: [GuestsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class GuestsPageModule {}
