import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }
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
}
