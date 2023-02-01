import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { LoginComponent } from './login/login.component';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { AdminComponent } from './admin/admin.component';
import { SingupComponent } from './singup/singup.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTicketComponent,
    TicketListComponent,
    LoginComponent,
    SingupComponent,
    NavbarComponent,
    HomeComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
