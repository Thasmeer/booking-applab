import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from '../Booking';
import { BookingsService } from '../bookings.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css'],
})
export class BookingsListComponent implements OnInit {
  isLoading = true;
  errMsg = '';
  bookings: Booking[];
  columns = ['bookingDate', 'name', 'email', 'seat', 'cancelButton'];

  constructor(
    private bookingService: BookingsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe(
      (res) => {
        this.bookings = res;
        console.log(res);

        this.isLoading = false;
      },
      (error: ErrorEvent) => {
        this.errMsg = error.error.message;
        this.isLoading = false;
      }
    );
  }
  openSnackBar(message: string) {
    this.snackBar.open(message);
  }
  deleteBooking(id: string) {
    this.bookingService.deleteBooking(id).subscribe(
      (res) => {
        this.openSnackBar('Booking successfully deleted')
        this.ngOnInit();
      },
      (error: ErrorEvent) => {
        this.openSnackBar(error.error.message)
        this.errMsg = error.error.message;
      }
    );
  }
}
