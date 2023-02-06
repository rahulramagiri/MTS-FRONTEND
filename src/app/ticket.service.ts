import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TicketModel } from './ticket.model';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private tickets: TicketModel[] = [];
  private ticketUpdated = new Subject<TicketModel[]>();
  private backendUrl = environment.apiUrl;

  constructor(private http: HttpClient, public router: Router) {}

  getTickets() {
    this.http
      .get<{ message: string; tickets: TicketModel[] }>(this.backendUrl)
      .subscribe((data) => {
        this.tickets = data.tickets;
        this.ticketUpdated.next([...this.tickets]);
      });
  }

  getUpdatedTickets() {
    return this.ticketUpdated.asObservable();
  }

  getTicket(id: string) {
    return this.http.get<TicketModel>(this.backendUrl + id);
  }

  addTicket(title: string, content: string, getNotified: boolean) {
    const ticket: TicketModel = {
      _id: '',
      title: title,
      content: content,
      getNotified: getNotified,
    };
    this.http
      .post<{ message: string; ticketId: string }>(this.backendUrl, ticket)
      .subscribe((data) => {
        const id = data.ticketId;
        ticket._id = id;
        this.tickets.push(ticket);
        this.ticketUpdated.next([...this.tickets]);
        this.router.navigate(['/tickets']);
      });
  }

  updateTicket(
    id: string,
    title: string,
    content: string,
    getNotified: boolean
  ) {
    const ticket: TicketModel = {
      _id: id,
      title: title,
      content: content,
      getNotified: getNotified,
    };
    this.http.put(this.backendUrl + id, ticket).subscribe((data) => {
      const updatedTicket = [...this.tickets];
      const oldTIcketIndex = updatedTicket.findIndex(
        (t) => t._id === ticket._id
      );
      updatedTicket[oldTIcketIndex] = ticket;
      this.tickets = updatedTicket;
      this.ticketUpdated.next([...this.tickets]);
      this.router.navigate(['/']);
    });
  }

  deleteTicket(ticketId: string) {
    this.http.delete(this.backendUrl + ticketId).subscribe(() => {
      this.tickets = this.tickets.filter((item) => item._id !== ticketId);
      this.ticketUpdated.next([...this.tickets]);
    });
  }
}
