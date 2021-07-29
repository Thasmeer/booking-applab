import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: BookingsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
