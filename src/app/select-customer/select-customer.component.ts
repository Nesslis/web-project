import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.css']
})
export class SelectCustomerComponent {
  @Input() selectedCustomer: any; 
}
