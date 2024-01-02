import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReservationsComponent} from '../app/reservations/reservations.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { CheckComponent } from './check/check.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { SelectCustomerComponent } from './select-customer/select-customer.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  {path: 'reservations', component: ReservationsComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'check' , component: CheckComponent},
  {path:'search', component: SearchCustomerComponent},
  {path:'select', component: SelectCustomerComponent},
  {path:'create', component: CreateReservationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
