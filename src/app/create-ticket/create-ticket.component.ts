import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TicketModel } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent implements OnInit {
  private mode = 'create';
  private ticketId: string;
  ticket: TicketModel;
  form: FormGroup;
  constructor(public tService: TicketService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
    });
    this.route.paramMap.subscribe((param: ParamMap) => {
      //  tickedId is the identifier we defined in routing
      if (param.has('ticketId')) {
        this.mode = 'edit';
        this.ticketId = param.get('ticketId');
        this.tService.getTicket(this.ticketId).subscribe((data) => {
          this.ticket = {
            _id: data._id,
            title: data.title,
            content: data.content,
          };
          this.form.setValue({
            title: this.ticket.title,
            content: this.ticket.content,
          });
        });
      } else {
        this.mode = 'create';
        this.ticketId = null;
      }
    });
  }

  onAddTicket() {
    if (this.form.invalid) return;
    if (this.mode === 'create')
      this.tService.addTicket(this.form.value.title, this.form.value.content);
    else
      this.tService.updateTicket(
        this.ticketId,
        this.form.value.title,
        this.form.value.content
      );
    this.form.reset();
  }
}
