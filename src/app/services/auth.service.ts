import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Appliances } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  private tokenKey = 'token'; // Key for localStorage where the token is stored
  private apiUrlAuth = "http://localhost:8080/auth";
  private apiUrlApp = "http://localhost:8080/api/addAppl";
   // Base URL for API endpoints in the environment.ts

  constructor(private http: HttpClient, private router: Router) {}

  // Method to handle user registration
  register(data: { email: string, password: string, confirmPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrlAuth}/signup`, data);
  }

  //Method to handle user login
  login(credentials?: { email: string, password: string }): Observable<{ token: string }> {
    if (credentials) {
      return this.http.post<{ token: string }>(`${this.apiUrlAuth}/login`, credentials);
    } else {
      window.location.href = 'http://localhost:8080/auth/login';
      return of(); // Return an empty observable for OAuth login
     }
  }

  addAppliance(addApp: Appliances,userId:any):Observable<any>{
    return this.http.post(`${this.apiUrlApp}/addApp`,addApp);
  }

  // Method to save JWT token to localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Method to retrieve JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Method to remove JWT token from localStorage
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Method to extract user ID from JWT token payload
  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      return this.extractUserIdFromToken(token);
    }
    return null;
  }
private extractUserIdFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || null; // Assuming the user ID is stored in the "id" field of the payload
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Method to check if user is logged in by checking the presence of JWT token
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Method to logout user by removing JWT token from localStorage and navigating to signin page
  logout(): void {
    this.clearToken();
    window.location.href = '/';
  }

  // Method to handle OAuth callback and save token
  handleOAuthCallback(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      this.saveToken(token);
      this.router.navigate(['/']); // Navigate to home or dashboard
    } else {
      console.error('No token found in the OAuth callback URL');
    }
  }

}
