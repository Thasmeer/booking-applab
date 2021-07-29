import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from '../Booking';
import { BookingsService } from '../bookings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoading = true;
  bookings: Booking[];
  bookingDate: Date;
  minDate = new Date();
  name: string;
  email: string;
  seat: number;
  seats = [
    { no: 1, available: true },
    { no: 2, available: true },
    { no: 3, available: true },
    { no: 4, available: true },
    { no: 5, available: true },
    { no: 6, available: true },
    { no: 7, available: true },
    { no: 8, available: true },
    { no: 9, available: true },
    { no: 10, available: true },
    { no: 11, available: true },
    { no: 12, available: true },
    { no: 13, available: true },
    { no: 14, available: true },
    { no: 15, available: true },
    { no: 16, available: true },
  ];
  public mainForm;
  filter: number;
  bookedSeats = [];
  missing: number[];

  constructor(
    private bookingService: BookingsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe((res) => {
      this.bookings = res;
      let itemsProcessed = 0;
      res.forEach((booking) => {
        this.bookedSeats.push(booking?.seat);
        itemsProcessed++;
        if (itemsProcessed === this.bookings.length) {
          this.compareSeats();
        }
      });
    });
  }

  compareSeats(): void {
    this.seats.forEach((seat) => {
      this.bookedSeats.forEach((item) => {
        if (item === seat.no) {
          seat.available = false;
        }
      });
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
  }

  setSeat(number: number): void {
    this.filter = number;
    console.log(this.filter);
  }

  createBooking(): void {
    if (!this.bookingDate) {
      this.openSnackBar('Please Enter Booking Date');
      return;
    }
    if (!this.name) {
      this.openSnackBar('Please Enter Name');
      return;
    }
    if (!this.email) {
      this.openSnackBar('Please Enter Email');
      return;
    }
    if (!this.filter) {
      this.openSnackBar('Please Select a seat');
      return;
    }

    this.bookingService
      .createBooking(this.name, this.email, this.bookingDate, this.filter)
      .subscribe(
        (res) => {
          this.name = '';
          this.email = '';
          this.bookingDate = undefined;
          this.filter = 0;
          this.openSnackBar('Booking made successfully');
          this.ngOnInit();
        },
        (error: ErrorEvent) => {
          this.openSnackBar(error.error.message);
        }
      );
  }
}
