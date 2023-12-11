import { Component } from '@angular/core';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {
  title = 'Reservations';
  Reservations: any[] = [];
  
  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getLastReservations().then(
      (data) => {
        this.Reservations = data.map((reservation: any) => ({
          ...reservation,
          noteInput: '',
          note: '', // Initialize note property for each reservation
          isNoteExist: false // Optionally initialize isNoteExist property
        }));
      }
    );
  }

  addNoteToReservation(reservation: any): void {
    if (reservation.noteInput && reservation.noteInput.length > 0) {
        reservation.note = reservation.noteInput;
        reservation.isNoteExist = true;
        reservation.noteInput = ''; // Clear noteInput after adding the note
      }
  }
}
