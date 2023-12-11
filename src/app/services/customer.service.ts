import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  addCustomer = async (
    id: number,
    tcNo: string | null,
    passportNo: string | null,
    nationality: string | null,
    firstName: string,
    lastName: string,
    middleName: string | null,
    gender: number | null,
    streetAddress: string | null,
    city: string | null,
    country: string | null,
    email: string,
    phone: string,
    notes: string | null,
  ) => {
    try {
      const apiUrl = 'http://213.248.166.144:7070'; 
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      const body = {
        id,
        tcNo,
        passportNo,
        nationality,
        firstName,
        lastName,
        middleName,
        gender,
        streetAddress,
        city,
        country,
        email,
        phone,
        notes
      };
      let body1 = {
        id : 0,
        tcNo : "string",
        passportNo : "string",
        nationality: "string",
        firstName: "string",
        lastName: "string",
        middleName: "string",
        gender : 0,
        streetAddress: "string",
        city : "string",
        country: "string",
        email: "string@gmail.com",
        phone: "string",
        notes: "string"

      }
      

      const result = await this.http.post(`${apiUrl}/customer/createCustomer`,body , { headers }).toPromise();
      return result;
    } catch (e) {
      return { error: true, msg: (e as any).error };
    }
  }
}
