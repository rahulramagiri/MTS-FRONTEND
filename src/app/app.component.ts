import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Mind Techno Systems';
  constructor(private authS: AuthService) {}
  ngOnInit() {
    this.authS.autoAuthUser();
  }
}
