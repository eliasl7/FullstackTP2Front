import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../../../core/services/artist.service';
import { Artist } from '../../../../models/artist.model';
import { PageInfo } from '../../../../models/pagination.model';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.scss'],
})
export class ArtistsListComponent implements OnInit {
  artists: Artist[] = [];
  pageInfo: PageInfo<Artist>;

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(page: number = 0): void {
    this.artistService.getArtists(page).subscribe({
      next: (response) => {
        this.pageInfo = response;
        this.artists = response.content;
      },
      error: (error) => {
        console.error('Error loading artists:', error);
      },
    });
  }
}
