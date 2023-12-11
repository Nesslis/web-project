import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  checkForm!: FormGroup;
  existingCustomer: any; 

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.checkForm = this.formBuilder.group({
      tcNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.checkForm.valid) {
      const data = this.checkForm.value;
      
      // Make API call to check existing customer based on TC No or Email
      this.http.post<any>('http://213.248.166.144:7070/customer/getCustomerByTcNoEmail', data)
        .subscribe(
          (response) => {
            console.log('Customer check response:', response);
            // Check if an existing customer is found
            if (response && response.length > 0) {
              this.existingCustomer = response[0]; // Assuming response contains customer data
            } else {
              this.existingCustomer = null; // Reset existingCustomer if no customer found
            }
          },
          (error) => {
            console.error('Error while checking customer:', error);
            // Handle the error response (e.g., 409 conflict, server error, etc.)
          }
        );
    } else {
      // Form is invalid, handle accordingly (show validation messages, etc.)
      console.log('Form is invalid');
    }
  }
  
}