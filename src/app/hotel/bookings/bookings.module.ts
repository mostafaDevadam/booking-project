import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

import { BookingsPage } from './bookings.page';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BookingsPageRoutingModule
  ],
  declarations: [BookingsPage, BookingModalComponent, BookingFormComponent]
})
export class BookingsPageModule {}
