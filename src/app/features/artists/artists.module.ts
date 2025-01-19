import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistsListComponent } from './components/artists-list/artists-list.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ArtistsListComponent, ArtistCardComponent],
  imports: [CommonModule, ArtistsRoutingModule, SharedModule],
})
export class ArtistsModule {}
