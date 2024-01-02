import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CheckComponent } from './check/check.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { SelectCustomerComponent } from './select-customer/select-customer.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservationsComponent,
    NavbarComponent,
    CustomerComponent,
    HomeComponent,
    CheckComponent,
    SearchCustomerComponent,
    SelectCustomerComponent,
    CreateReservationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [FormsModule],
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
