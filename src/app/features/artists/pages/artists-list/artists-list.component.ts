import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ArtistService } from '../../../../core/services/artist.service';
import { Artist } from '../../../../models/artist.model';
import { PageInfo } from '../../../../models/pagination.model';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.scss'],
})
export class ArtistsListComponent implements OnInit {
  public artists: Artist[] = [];
  public pageInfo: PageInfo<Artist>;
  public currentPage = 0;
  public pageSize = 10;
  public searchControl = new FormControl('');
  public loading = false;
  public error: string | null = null;

  constructor(private artistService: ArtistService, private router: Router) {}

  ngOnInit(): void {
    this.setupSearch();
    this.loadArtists();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.currentPage = 0;
        this.loadArtists();
      });
  }

  loadArtists(): void {
    this.loading = true;
    this.error = null;
    const searchTerm = this.searchControl.value;

    this.artistService
      .getArtists(this.currentPage, this.pageSize, searchTerm)
      .subscribe({
        next: (response) => {
          this.artists = response.content;
          this.pageInfo = response;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading artists:', error);
          this.error = 'Failed to load artists';
          this.loading = false;
        },
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadArtists();
  }

  viewArtistDetails(id: string): void {
    this.router.navigate(['/artists', id]);
  }
}