import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../core/services/event.service';
import { ArtistService } from '../../../core/services/artist.service';
import { Event } from '../../../models/event.model';
import { Artist } from '../../../models/artist.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  event: Event;
  availableArtists: Artist[] = [];
  editMode = false;
  eventForm: FormGroup;
  loading = true;
  error: string = null;
  successMessage: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private artistService: ArtistService,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group(
      {
        label: ['', [Validators.required, Validators.minLength(3)]],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      },
      { validator: this.dateRangeValidator }
    );
  }

  ngOnInit(): void {
    this.loadEvent();
    this.loadAvailableArtists();
  }

  private loadEvent(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.navigateToList();
      return;
    }

    this.eventService.getEventById(id).subscribe({
      next: (event) => {
        this.event = event;
        this.loading = false;
        this.patchForm();
      },
      error: (error) => {
        this.error = 'Failed to load event details';
        this.loading = false;
      },
    });
  }

  private loadAvailableArtists(): void {
    this.artistService.getArtists(0, 100).subscribe({
      next: (response) => {
        this.availableArtists = response.content;
      },
    });
  }

  private patchForm(): void {
    this.eventForm.patchValue({
      label: this.event.label,
      startDate: this.event.startDate,
      endDate: this.event.endDate,
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid && this.event) {
      const updatedEvent = {
        ...this.eventForm.value,
      };

      this.eventService.updateEvent(this.event.id, updatedEvent).subscribe({
        next: (event) => {
          this.event = event;
          this.editMode = false;
          this.successMessage = 'Event updated successfully!';
          setTimeout(() => (this.successMessage = null), 3000);
        },
        error: () => {
          this.error = 'Failed to update event';
        },
      });
    }
  }
  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  isArtistInEvent(artistId: string): boolean {
    return this.event?.artists?.some((a) => a.id === artistId) || false;
  }

  addArtist(artistId: string): void {
    if (!artistId) return;

    this.eventService.addArtistToEvent(this.event.id, artistId).subscribe({
      next: () => {
        this.loadEvent();
        this.successMessage = 'Artist added successfully!';
        setTimeout(() => (this.successMessage = null), 3000);
      },
      error: () => {
        this.error = 'Failed to add artist to event';
      },
    });
  }

  removeArtist(artistId: string): void {
    this.eventService.removeArtistFromEvent(this.event.id, artistId).subscribe({
      next: () => {
        this.loadEvent();
        this.successMessage = 'Artist removed successfully!';
        setTimeout(() => (this.successMessage = null), 3000);
      },
      error: () => {
        this.error = 'Failed to remove artist from event';
      },
    });
  }

  private dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;

    if (!start || !end) return null;

    return start > end ? { dateRange: true } : null;
  }

  private navigateToList(): void {
    this.router.navigate(['/events']);
  }
}
