import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableauBordService {

  private apiUrl = 'http://localhost:9095/api/dashbord'; // Utilisez HTTP pour les tests locaux

  constructor(private http: HttpClient) { }

  public countEvents(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/events/count`);
  }
}
