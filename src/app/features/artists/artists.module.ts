import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistsListComponent } from './pages/artists-list/artists-list.component';
import { ArtistDetailsComponent } from './pages/artist-details/artist-details.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ArtistsListComponent, ArtistDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArtistsRoutingModule,
    SharedModule,
  ],
})
export class ArtistsModule {}
