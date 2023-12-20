import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Duplicate } from '../common/duplicate';
import { AppError } from '../common/apperror';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://213.248.166.144:7070/customer/lastReservations';
  private apiUrlCreate = 'http://213.248.166.144:7070/customer/createCustomer';
  private apiUrlGetCustomer = 'http://213.248.166.144:7070/customer/getCustomerByTcNoEmail';

  constructor(private http: HttpClient) {}

  createCustomer(customerData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlCreate, customerData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Duplicate());
          console.error("aaaaaaaaaaaaaaa")
        } else {
          return throwError(() => new AppError());
        }
      })
    );
  }

  getCustomerByTcNoEmail(tcNo: string, email: string): Promise<any> {
    let params = new HttpParams();
    if (tcNo) params = params.append('tcNo', tcNo);
    if (email) params = params.append('email', email);

    return this.http.get<any>(this.apiUrlGetCustomer, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          return throwError(() => new Duplicate());
        } else {
          return throwError(() => new AppError());
        }
      })
    ).toPromise();
  }

  async getAllReservations(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      let reservationlist: any[] = [];
      this.http.get<any>(this.apiUrl).subscribe(
        (response) => {
          if (!response) {
            reject();
          } else {
            const oneWeekInSeconds = 7 * 24 * 60 * 60 * 1000;
            const oneWeekAgo = new Date();
            oneWeekAgo.setTime(oneWeekAgo.getTime() - oneWeekInSeconds);

            Object.values(response).forEach((value: any) => {
              const reservationDate = new Date(value['dateArrival']);
              if (reservationDate.getTime() > oneWeekAgo.getTime()) {
                reservationlist.push(value); 
              }
            });
            resolve(reservationlist);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
