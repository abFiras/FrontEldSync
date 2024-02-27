import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import { EventStatus } from '../model/event-status';
//import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events';
  private userApiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  public retrieveAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  public addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  public retrieveEvent(idEvent: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${idEvent}`);
  }

  public removeEvent(idEvent: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idEvent}`);
  }

  public suggestNewEvent(event: Event): Observable<Event> {
    event.status = EventStatus.PENDING;
    return this.http.post<Event>(this.apiUrl, event);
  }

  public getEventDetails(idEvent: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/details/${idEvent}`);
  }

  public filterEventsByCategory(category: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/category/${category}`);
  }

  public registerUserForEvent(idUser: number, eventId: number): Observable<void> {
    return this.http.post<void>(`${this.userApiUrl}/events/${idUser}/${eventId}`, {});
  }
/*
  public getUserWithMostEventsAttended(): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/most-events`);
  }
*/
  public getEventsByDonationDateRange(fromDate: Date, toDate: Date): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/date-range`, {
      params: {
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString()
      }
    });
  }

  public getUpcomingEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/upcoming`);
  }

  public getPastEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/past`);
  }
}
