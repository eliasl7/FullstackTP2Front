import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../../../core/services/artist.service';
import { EventService } from '../../../../core/services/event.service';
import { Artist } from '../../../../models/artist.model';
import { Event } from '../../../../models/event.model';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
})
export class ArtistDetailsComponent implements OnInit {
  public artist: Artist;
  public availableEvents: Event[] = [];
  public editMode = false;
  public artistForm: FormGroup;
  public loading = true;
  public error: string | null = null;
  public successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService,
    private eventService: EventService,
    private fb: FormBuilder
  ) {
    this.artistForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.loadArtist();
    this.loadAvailableEvents();
  }

  private loadArtist(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.navigateToList();
      return;
    }

    this.artistService.getArtistById(id).subscribe({
      next: (artist) => {
        this.artist = artist;
        this.loading = false;
        this.artistForm.patchValue({ label: artist.label });
      },
      error: () => {
        this.error = 'Failed to load artist details';
        this.loading = false;
      },
    });
  }

  private loadAvailableEvents(): void {
    this.eventService.getEvents(0, 100).subscribe({
      next: (response) => {
        this.availableEvents = response.content;
      },
    });
  }

  onSubmit(): void {
    if (this.artistForm.valid && this.artist) {
      const updatedArtist = {
        ...this.artist,
        label: this.artistForm.get('label').value,
      };

      this.artistService.updateArtist(this.artist.id, updatedArtist).subscribe({
        next: (artist) => {
          this.artist = artist;
          this.editMode = false;
          this.showSuccess('Artist updated successfully!');
        },
        error: () => {
          this.error = 'Failed to update artist';
        },
      });
    }
  }

  isEventLinked(eventId: string): boolean {
    return this.artist?.events?.some((e) => e.id === eventId) || false;
  }

  navigateToList(): void {
    this.router.navigate(['/artists']);
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => (this.successMessage = null), 3000);
  }

  joinEvent(eventId: string): void {
    if (!eventId) return;

    this.eventService.addArtistToEvent(eventId, this.artist.id).subscribe({
      next: () => {
        this.loadArtist();
        this.showSuccess('Event added successfully!');
      },
      error: () => {
        this.error = 'Failed to add event';
      },
    });
  }

  leaveEvent(eventId: string): void {
    this.eventService.removeArtistFromEvent(eventId, this.artist.id).subscribe({
      next: () => {
        this.loadArtist();
        this.showSuccess('Event removed successfully!');
      },
      error: () => {
        this.error = 'Failed to remove event';
      },
    });
  }
}
