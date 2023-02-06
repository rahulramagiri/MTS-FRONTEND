import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-nav',
  templateUrl: './new-nav.component.html',
  styleUrls: ['./new-nav.component.css'],
})
export class NewNavComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  isSideNavHidden: boolean = false;
  isNavHidden: boolean = true;
  private authStatusSub: Subscription;

  constructor(private authS: AuthService) {}
  ngOnInit(): void {
    this.userIsAuthenticated = this.authS.getIsAuth();
    this.authStatusSub = this.authS.getAuthStatus().subscribe((data) => {
      this.userIsAuthenticated = data;
    });
  }

  onSideNavToggle = () => {
    this.isSideNavHidden = !this.isSideNavHidden;
  };
  onNavToggle = () => {
    this.isNavHidden = !this.isNavHidden;
    this.isSideNavHidden = true;
  };
  onLogout() {
    this.authS.logout();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
