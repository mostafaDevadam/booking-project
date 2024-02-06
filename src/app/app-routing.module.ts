import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { HotelGuard } from './auth/guards/hotel.guard';
import { DataResolver } from './auth/resolvers/data.resolver';
import { RoomResolver, roomResolver } from './auth/resolvers/room.resolver';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canLoad: [HotelGuard],
    resolve: [DataResolver],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',

  },
  {
    path: 'dashboard',
    loadChildren: () => import('./hotel/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [HotelGuard]
  },
  {
    path: 'bookings',
    loadChildren: () => import('./hotel/bookings/bookings.module').then(m => m.BookingsPageModule),
    canLoad: [HotelGuard]
  },
  {
    path: 'rooms',
    loadChildren: () => import('./hotel/rooms/rooms.module').then(m => m.RoomsPageModule),
    canLoad: [HotelGuard],
    resolve: [ new RoomResolver().resolver],

  },
  {
    path: 'guests',
    loadChildren: () => import('./hotel/guests/guests.module').then(m => m.GuestsPageModule),
    canLoad: [HotelGuard]
  },
  {
    path: 'new-booking',
    loadChildren: () => import('./hotel/new-booking/new-booking.module').then(m => m.NewBookingPageModule),
    canLoad: [HotelGuard]
  },
  {
    path: 'new-room',
    loadChildren: () => import('./hotel/new-room/new-room.module').then(m => m.NewRoomPageModule),
    canLoad: [HotelGuard]
  },


  // for guest
  {
    path: 'my-bookings',
    loadChildren: () => import('./guest/my-bookings/my-bookings.module').then(m => m.MyBookingsPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'home-guest',
    loadChildren: () => import('./guest/home-guest/home-guest.module').then(m => m.HomeGuestPageModule),
   // canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
