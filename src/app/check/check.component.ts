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
      
      this.http.post<any>('http://213.248.166.144:7070/customer/getCustomerByTcNoEmail', data)
        .subscribe(
          (response) => {
            console.log('Customer check response:', response);
            if (response && response.length > 0) {
              this.existingCustomer = response[0]; 
            } else {
              this.existingCustomer = null; 
            }
          },
          (error) => {
            console.error('Error while checking customer:', error);
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }
  
}