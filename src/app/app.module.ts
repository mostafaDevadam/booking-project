import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServerModule } from '@angular/platform-server';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicServerModule } from '@ionic/angular-server';
import { AuthService } from './auth/auth.service';
import { HotelService } from './services/hotel.service';
import { RoomService } from './services/room.service';
import { BookingService } from './services/booking.service';
import { GuestService } from './services/guest.service';
import { UserService } from './services/user.service';
import { CallApiService } from './services/callAPI/call-api.service';
import { AddHeaderInterceptor } from './auth/interceptors/add-header.interceptor';
import { MessageDialogModalComponent } from './shared/components/message-dialog-modal/message-dialog-modal.component';

@NgModule({
  declarations: [AppComponent, MessageDialogModalComponent],
  imports: [
    BrowserModule,
     HttpClientModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     //ServerModule,
     IonicServerModule,
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor , multi: true},
    CallApiService,
    AuthService,HotelService,RoomService,BookingService,GuestService,UserService,


  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
