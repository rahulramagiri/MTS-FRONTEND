import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketModel } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
})
export class TicketListComponent implements OnInit, OnDestroy {
  tickets: TicketModel[] = [];
  private ticketSub: Subscription;

  constructor(public tService: TicketService) {}

  ngOnInit() {
    this.tService.getTickets();
    this.ticketSub = this.tService
      .getUpdatedTickets()
      .subscribe((data: TicketModel[]) => {
        this.tickets = data;
      });
  }

  onDelete(id: string) {
    this.tService.deleteTicket(id);
  }

  ngOnDestroy(): void {
    this.ticketSub.unsubscribe();
  }
}
