import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeGuestPage } from './home-guest.page';

const routes: Routes = [
  {
    path: '',
    component: HomeGuestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeGuestPageRoutingModule {}
