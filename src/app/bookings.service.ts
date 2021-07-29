import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from './Booking';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private BASE_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.BASE_URL}/bookings`);
  }

  createBooking(
    name: string,
    email: string,
    bookingDate: Date,
    seat: number
  ): Observable<Booking> {
    return this.http.post<Booking>(`${this.BASE_URL}/bookings`, {
      name,
      email,
      bookingDate,
      seat,
    });
  }

  deleteBooking(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/bookings/${id}`);
  }
}
