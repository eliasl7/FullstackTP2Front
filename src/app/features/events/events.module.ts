import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { SharedModule } from '../../shared/shared.module';
import { EventFormComponent } from './components/event-form/event-form.component';

@NgModule({
  declarations: [EventsListComponent, EventCardComponent, EventFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventsRoutingModule,
    SharedModule,
  ],
})
export class EventsModule {}
