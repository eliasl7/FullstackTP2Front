import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './pages/events-list.component';
import { EventDetailsComponent } from './pages/event-details.component';

const routes: Routes = [
  {
    path: '',
    component: EventsListComponent,
  },
  {
    path: ':id',
    component: EventDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
