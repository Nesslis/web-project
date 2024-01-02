import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://213.248.166.144:7070';

  constructor(private http: HttpClient) { }
  async getLastReservations(): Promise<any> {
    const currentDate = new Date();
    const lastWeek = new Date(currentDate);
    lastWeek.setDate(currentDate.getDate() - 7);

    try {
      const response = await fetch("http://213.248.166.144:7070/customer/lastReservations");
      const data = await response.json();

      const filteredData = data.filter((e: any) => {
        const dateUpdated = new Date(e.dateUpdated);
        return dateUpdated >= lastWeek && dateUpdated <= currentDate;
      });

      return filteredData;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }

  searchCustomers(searchQuery: { customerId?: number, firstName?: string, lastName?: string }):Observable<any>{
    let apiUrl = `${this.baseUrl}/customer/search?`;

    if (searchQuery.customerId) {
      apiUrl += `customerId=${searchQuery.customerId}&`;
    }
    if (searchQuery.firstName) {
      apiUrl += `firstName=${searchQuery.firstName}&`;
    }
    if (searchQuery.lastName) {
      apiUrl += `lastName=${searchQuery.lastName}&`;
    }

    if (!(searchQuery.customerId || searchQuery.firstName || searchQuery.lastName)) {
      return this.http.get<any>(`${this.baseUrl}/customer/search`)
        .pipe(
          catchError(this.handleError)
        );
    }

    return this.http.get<any>(apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
  loadCustomer(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/customer/loadCustomerById/${customerId}`)
      .pipe(
        catchError(this.handleError) 
      );
  }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/customer/createReservation`, reservationData)
      .pipe(
        catchError(this.handleError) 
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    let errorMessage = 'An error occurred in the API. Please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.error.message || error.message}`;
    }
    return throwError(errorMessage);
  }

}