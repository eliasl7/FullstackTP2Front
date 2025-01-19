import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsListComponent } from './pages/artists-list/artists-list.component';
import { ArtistDetailsComponent } from './pages/artist-details/artist-details.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistsListComponent,
  },
  {
    path: ':id',
    component: ArtistDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistsRoutingModule {}
