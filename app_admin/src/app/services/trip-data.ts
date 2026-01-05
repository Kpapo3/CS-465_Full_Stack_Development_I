import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trip';

@Injectable({providedIn: 'root'})

export class TripData {
  
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  baseUrl = 'http://localhost:3000/api';

  // Method to retrieve all trips
  getTrips() : Observable<Trip[]> {
    // console.log('Inside TripData::getTrips');
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`);
  }

  // Method to add new trip
  addTrip(formData: Trip) : Observable<Trip> {
    // console.log('Inside TripData::addTrips');
    return this.http.post<Trip>(`${this.baseUrl}/trips`, formData);
  }

  // Method to retrieve a single trip by tripCode
  getTrip(tripCode: string) : Observable<Trip> {
    // console.log('Inside TripData::addTrips');
    return this.http.get<Trip>(`${this.baseUrl}/trips/${tripCode}`);
  }

  // Method to update an existing trip
  updateTrip(formData: Trip) : Observable<Trip> {
    // console.log('Inside TripData::addTrips');
    return this.http.put<Trip>(`${this.baseUrl}/trips/${formData.code}`, formData);
  }

  // Method to delete an existing trip
  deleteTrip(tripCode: string): Observable<Trip> {
    // console.log('Inside TripData::deleteTrips');
    return this.http.delete<Trip>(`${this.baseUrl}/trips/${tripCode}`);
  }


  // Auth
  // Method to handle user login
  login(user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside TripData::login');
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Method to handle user registration
  register(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripData::register');
    return this.handleAuthAPICall('register', user, passwd);
  }

  // Helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside TripData::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }
}