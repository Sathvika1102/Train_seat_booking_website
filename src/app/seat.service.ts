import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  // Flat array representing seat identifiers (12 rows, 11 with 7 seats, 1 with 3 seats)
  seats = [
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
    'A6',
    'A7', // Row A
    'B1',
    'B2',
    'B3',
    'B4',
    'B5',
    'B6',
    'B7', // Row B
    'C1',
    'C2',
    'C3',
    'C4',
    'C5',
    'C6',
    'C7', // Row C
    'D1',
    'D2',
    'D3',
    'D4',
    'D5',
    'D6',
    'D7', // Row D
    'E1',
    'E2',
    'E3',
    'E4',
    'E5',
    'E6',
    'E7', // Row E
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7', // Row F
    'G1',
    'G2',
    'G3',
    'G4',
    'G5',
    'G6',
    'G7', // Row G
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'H7', // Row H
    'I1',
    'I2',
    'I3',
    'I4',
    'I5',
    'I6',
    'I7', // Row I
    'J1',
    'J2',
    'J3',
    'J4',
    'J5',
    'J6',
    'J7', // Row J
    'K1',
    'K2',
    'K3',
    'K4',
    'K5',
    'K6',
    'K7', // Row K
    'L1',
    'L2',
    'L3', // Row L (only 3 seats)
  ];

  // Array representing the availability of each seat (1: available, 0: booked)
  availability = new Array(this.seats.length).fill(1);

 //Prepare rows for display
  rows = [];
  constructor() {
    this.prepareRows();
  }

  prepareRows() {
    const totalRows = 12;
    const seatsPerRow = 7; // 7 seats per row for A-K and 3 for L

    for (let i = 0; i < totalRows; i++) {
      let row: string[];
      if (i === totalRows - 1) {
        // Last row L has only 3 seats
        row = this.seats.slice(i * seatsPerRow, i * seatsPerRow + 3);
      } else {
        row = this.seats.slice(i * seatsPerRow, (i + 1) * seatsPerRow);
      }
      this.rows.push(row);
    }
  }

  // Method to book seats based on user request
  bookSeats(seatCount: number): string[] {
    let bookedSeats: string[] = [];
    let remainingSeats = seatCount;

    for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
      let rowSeats = this.rows[rowIndex];
      let count = 0;
      let startIndex = -1;

      for (let seatIndex = 0; seatIndex < rowSeats.length; seatIndex++) {
        const globalIndex = rowIndex * 7 + seatIndex;

        // Check if the seat is available
        if (this.availability[globalIndex] === 1) {
          // First available seat found
          if (count === 0) startIndex = globalIndex;
          count++;
        } else {
          // Reset count if a booked seat is found
          count = 0;
          startIndex = -1;
        }

        // Check if we've found enough consecutive seats
        if (count === remainingSeats) {
          for (let j = startIndex; j < startIndex + remainingSeats; j++) {
            this.availability[j] = 0; // Mark seat as booked
            bookedSeats.push(this.seats[j]);
          }
          return bookedSeats;
        }
      }
    }

    // If not enough seats could be booked
    if (bookedSeats.length < seatCount) {
      alert(
        `Sorry, only ${bookedSeats.length} seats could be booked. Not enough adjacent seats available.`
      );
    }

    return bookedSeats;
  }
}
