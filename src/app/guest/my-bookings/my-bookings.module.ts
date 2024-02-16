import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBookingsPageRoutingModule } from './my-bookings-routing.module';

import { MyBookingsPage } from './my-bookings.page';
import { MyBookingModalComponent } from './components/my-booking-modal/my-booking-modal.component';
import { MyBookingFormComponent } from './components/my-booking-form/my-booking-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MyBookingsPageRoutingModule
  ],
  declarations: [MyBookingsPage, MyBookingModalComponent, MyBookingFormComponent]
})
export class MyBookingsPageModule {}
