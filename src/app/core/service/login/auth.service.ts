import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../../interfaces/login-user';
import { RegisterUser } from '../../interfaces/register-user';
import { Observable } from 'rxjs';
import { JwtToken } from '../../interfaces/jwt-token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(userDetails: LoginUser): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.baseUrl}/api/auth/login`, userDetails);
  }

  register(userDetails: RegisterUser): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/api/auth/register`, userDetails);
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}