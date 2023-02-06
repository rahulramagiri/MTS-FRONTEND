import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  constructor(private authS: AuthService) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authS.getIsAuth();
    this.authStatusSub = this.authS
      .getAuthStatus()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authS.logout();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}