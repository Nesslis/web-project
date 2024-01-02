import { Component } from '@angular/core';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent {
  reservationData = {
    id: 0,
    customerId: 0,
    roomType: '',
    room: '',
    dateArrival: new Date().toISOString(), // Default value for arrival date
    dateDeparture: new Date().toISOString(), // Default value for departure date
    notes: '',
    source: '',
    paymentAmount: 0,
    dateUpdated: new Date().toISOString(),
    status: ''
  };

  constructor(private reservationService: ReservationService) {}

  createReservation(): void {
    this.reservationService.createReservation(this.reservationData)
      .subscribe(
        (response) => {
          console.log('Success')
                },
        (error) => {
          console.error('Error while creating reservation:', error);
        }
      );
  }
}
