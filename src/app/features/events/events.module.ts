import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventCardComponent } from './components/event-card/event-card.component';

@NgModule({
  declarations: [EventsListComponent, EventCardComponent],
  imports: [CommonModule, EventsRoutingModule],
})
export class EventsModule {}
