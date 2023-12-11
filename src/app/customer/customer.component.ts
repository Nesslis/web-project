import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-register-form',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  customerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.customerForm = this.formBuilder.group({
      id: ['', Validators.required],
      tcNo: ['', Validators.required],
      passportNo: [''],
      nationality: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      gender: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }

  checkExistingCustomer() {
    const customerData = this.customerForm.value;
    const { tcNo, email } = customerData;
  
    let payload = {};
    if (tcNo && email) {
      payload = { tcNo, email };
    } else if (tcNo) {
      payload = { tcNo };
    } else if (email) {
      payload = { email };
    } else {
      return;
    }
  
    this.http.post('http://213.248.166.144:7070/customer/getCustomerByTcNoEmail', payload)
      .subscribe(
        (response) => {
          console.log('Existing customer found:', response);
        },
        (error) => {
          console.error('Error while checking existing customer:', error);
          if (error.status === 409) {
            // Show an error message to the user about the existing customer
          }
        }
      );
  }
  

  onSubmit() {
    this.checkExistingCustomer();

    const customerData = this.customerForm.value;

    this.http.post('http://213.248.166.144:7070/customer/createCustomer', customerData)
      .subscribe(
        (response) => {
          console.log('Customer created successfully:', response);
        },
      );
  }
  
  
}