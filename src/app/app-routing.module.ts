import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'events',
    loadChildren: () =>
      import('./features/events/events.module').then((m) => m.EventsModule),
  },
  {
    path: 'artists',
    loadChildren: () =>
      import('./features/artists/artists.module').then((m) => m.ArtistsModule),
  },
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
