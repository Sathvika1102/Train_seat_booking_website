import { Component } from '@angular/core';
import { SeatService } from './seat.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  seatCount: number = 1;
  bookedSeats: string[] = [];
  constructor(public seatService: SeatService) {}

  bookSeats() {
    if (this.seatCount < 1 || this.seatCount > 7) {
      alert('Please enter a number between 1 and 7.');
      return;
    }

    this.bookedSeats = []; // Reset current booked seats

    const newBookedSeats = this.seatService.bookSeats(this.seatCount);
    if (newBookedSeats.length > 0) {
      this.bookedSeats.push(...newBookedSeats);
      alert(`Booked seats: ${newBookedSeats.join(', ')}`);
    } else {
      alert('No seats could be booked. Please try again.');
    }
  }
  //Calling the bookSeats() function when the user clicks "enter"
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.bookSeats();
    }
  }
}