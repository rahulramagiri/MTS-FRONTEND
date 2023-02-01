import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent implements OnInit {
  constructor(private authS: AuthService) {}

  ngOnInit(): void {}
  onSignup(form: NgForm) {
    if (form.invalid) return;
    this.authS.createUser(form.value.email, form.value.password);
  }
}
