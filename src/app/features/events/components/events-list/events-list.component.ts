import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../core/services/event.service';
import { Event } from '../../../../models/event.model';
import { PageInfo } from '../../../../models/pagination.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  events: Event[] = [];
  pageInfo: PageInfo<Event>;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(page: number = 0): void {
    this.eventService.getEvents(page).subscribe({
      next: (response) => {
        this.pageInfo = response;
        this.events = response.content;
      },
      error: (error) => {
        console.error('Error loading events:', error);
      },
    });
  }
}
