import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:9095/api/v1/auth/authenticate-admin';

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(this.apiUrl, body);
  }
}
