import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthData } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private path = environment.apiUrl + 'user/';
  private token: string;
  private authStatus = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: NodeJS.Timer;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  createUser(email: string, password: string) {
    const user: AuthData = { email: email, password: password };
    this.http.post(this.path + 'signup', user).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/login']);
    });
  }

  loginUser(email: string, password: string) {
    const user: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number }>(this.path + 'login', user)
      .subscribe((tokenData) => {
        const token = tokenData.token;
        this.token = token;
        if (token) {
          const expiresInTime = tokenData.expiresIn;
          this.setAuthTimer(expiresInTime);
          this.isAuthenticated = true;
          this.authStatus.next(true);
          const now = new Date();
          const expiresDate = new Date(now.getTime() + expiresInTime * 1000);
          console.log(expiresDate);
          this.saveAuthData(token, expiresDate);
          this.router.navigate(['/tickets']);
        }
      });
  }

  adminLogin(email: string, password: string) {
    const admin = { email: email, password: password };
    this.http.post<{}>(this.path + 'admin', admin);
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expiration.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.setAuthTimer(expiresIn / 1000);
      this.isAuthenticated = true;
      this.authStatus.next(true);
    }
  }

  logout() {
    this.token = null;
    this.authStatus.next(false);
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expiresIn: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiresIn.toISOString());
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return;
    }
    return {
      token: token,
      expiration: new Date(expiration),
    };
  }
}
