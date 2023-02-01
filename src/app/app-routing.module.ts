import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'create',
    component: CreateTicketComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:ticketId',
    component: CreateTicketComponent,
    canActivate: [AuthGuard],
  },
  { path: 'tickets', component: TicketListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingupComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
