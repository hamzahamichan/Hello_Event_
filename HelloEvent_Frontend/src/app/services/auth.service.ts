import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {jwtDecode} from "jwt-decode";


interface AuthResponse {
  'access-Token': string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles: any;
  email: any;
  accessToken!: string;

  private apiUrl = 'http://localhost:9095/api/v1/auth/authenticate-admin';

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<AuthResponse> {
    const body = { email, password };
    return this.http.post<AuthResponse>(this.apiUrl, body);
  }

  loadProfile(data: AuthResponse): void {
    if (data && typeof data['access-Token'] === 'string') {
      this.isAuthenticated = true;
      this.accessToken = data['access-Token'];
      try {
        const jwtDecoded: any = jwtDecode(this.accessToken);
        this.email = jwtDecoded.sub;
        this.roles = jwtDecoded.scope;
      } catch (error) {
        console.error('Error decoding token:', error);
        this.isAuthenticated = false;
      }
    } else {
      console.error('Invalid token format');
      this.isAuthenticated = false;
    }
  }
}
