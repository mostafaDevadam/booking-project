import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomsPageRoutingModule } from './rooms-routing.module';

import { RoomsPage } from './rooms.page';
import { RoomModalComponent } from './components/room-modal/room-modal.component';
import { RoomFormComponent } from './components/room-form/room-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RoomsPageRoutingModule
  ],
  providers: [
   // {provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor , multi: true},
  ],
  declarations: [RoomsPage, RoomModalComponent, RoomFormComponent, ],

})
export class RoomsPageModule {}
