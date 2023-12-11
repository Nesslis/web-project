import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReservationsComponent} from '../app/reservations/reservations.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { CheckComponent } from './check/check.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  {path: 'reservations', component: ReservationsComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'check' , component: CheckComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
