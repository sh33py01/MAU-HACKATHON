import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  gatewayUrl = 'http://172.20.10.3:8000/v1/';
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log('login called the service');
    return this.http.post<any>(this.gatewayUrl + 'users/login', { email, password }).pipe(
      tap((tokens) => {
        console.log(tokens)
        if (tokens.access_token) {
          localStorage.setItem(this.accessTokenKey, tokens.access_token);
          localStorage.setItem(this.refreshTokenKey, tokens.refresh_token);
          this.authStatus.next(true); // update authStatus
          location.replace('/');
        }
      }),
      catchError(error => {
        console.error('Error in login request:', error); // Debugging line
        throw error;
      })
    );
  }

  logout() {
    // Perform your logout logic here
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.authStatus.next(false); // update authStatus
    location.replace('/login');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.accessTokenKey);
  }
}
