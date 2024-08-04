import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:9095/api/event/getAll';

  constructor(private http: HttpClient) { }

  public getEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }
}
