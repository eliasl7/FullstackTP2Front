import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../core/services/event.service';
import { Event } from '../../../models/event.model';
import { PageInfo } from '../../../models/pagination.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  events: Event[] = [];
  pageInfo: PageInfo<Event>;
  showCreateModal = false;
  currentPage = 0;
  pageSize = 10;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(page: number = 0): void {
    this.eventService.getEvents(page, this.pageSize).subscribe({
      next: (response) => {
        this.pageInfo = response;
        this.events = response.content;
      },
      error: (error) => {
        console.error('Error loading events:', error);
        // Gérer l'erreur plus tard
      },
    });
  }

  onEventSave(event: Event): void {
    this.eventService.createEvent(event).subscribe({
      next: () => {
        this.showCreateModal = false;
        this.loadEvents(); // Rafraîchir la liste
      },
      error: (error) => {
        console.error('Error creating event:', error);
        // Gérer l'erreur plus tard
      },
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadEvents(page);
  }
}
