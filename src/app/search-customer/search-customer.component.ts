import { Customer } from './../customer/customer';
import { Component } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent {
  customerId: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  searchResults: Customer[] = [];

  constructor(private reservationService: ReservationService, private router: Router) {}

  searchCustomers(): void {
    const searchQuery: { customerId?: number, firstName?: string, lastName?: string } = {};

    if (this.customerId) {
      searchQuery.customerId = this.customerId;
    }
    if (this.firstName) {
      searchQuery.firstName = this.firstName;
    }
    if (this.lastName) {
      searchQuery.lastName = this.lastName;
    }

    this.reservationService.searchCustomers(searchQuery)
      .subscribe(
        (data: Customer[]) => {
          this.searchResults = data;
        },
        (error) => {
          console.error('Error while searching: ', error);
        }
      );
  }


  selectCustomer(customer:any):void{
    this.router.navigate(['/loadCustomerById', customer.id])
  }
}
