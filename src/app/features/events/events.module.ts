import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './pages/events-list.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { SharedModule } from '../../shared/shared.module';
import { EventDetailsComponent } from './pages/event-details.component';

@NgModule({
  declarations: [EventsListComponent, EventCardComponent, EventDetailsComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class EventsModule {}
