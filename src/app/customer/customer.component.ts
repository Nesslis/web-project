import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Duplicate } from '../common/duplicate';
import { AppError } from '../common/apperror';

@Component({
  selector: 'app-customer-register-form',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  customerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {
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

  async onSubmit(): Promise<void> {
    if (this.customerForm.valid) {
      const tcNo = this.customerForm.value.tcNo;
      const email = this.customerForm.value.email;

      this.errorMessage = null;

        const existingCustomer = await this.customerService.getCustomerByTcNoEmail(tcNo, email)
        .catch((error) => {
          if(error instanceof AppError){
            this.errorMessage='Customer control failed';
            console.error('Customer control failed',error)
          }
        });

        if (!existingCustomer) {
          this.errorMessage = "Customer already exists";
        } else {
          const customerData = this.customerForm.value;
          const createdCustomer = await this.customerService.createCustomer(customerData).toPromise()
          .catch((createError)=> {
            if(createError instanceof Duplicate){
              this.errorMessage= "Customer already exists";
            }else if(createError instanceof AppError){
              console.error("There is an error ",createError)
            }
          });

          if (createdCustomer) {
            console.log("Customer added")
          }
        }

    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
