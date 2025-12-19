import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css']
})

export class TripCard implements OnInit {

  @Input('trip') trip!: Trip;
  
  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }
  
}
