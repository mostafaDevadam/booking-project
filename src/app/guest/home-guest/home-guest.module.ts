import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeGuestPageRoutingModule } from './home-guest-routing.module';

import { HomeGuestPage } from './home-guest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeGuestPageRoutingModule
  ],
  declarations: [HomeGuestPage]
})
export class HomeGuestPageModule {}
