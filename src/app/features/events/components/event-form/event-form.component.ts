import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Event } from '../../../../models/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  @Input() event?: Event;
  @Output() save = new EventEmitter<Event>();
  @Output() cancel = new EventEmitter<void>();

  eventForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group(
      {
        label: ['', [Validators.required, Validators.minLength(3)]],
        startDate: ['', [Validators.required, this.futureDateValidator()]],
        endDate: ['', [Validators.required, this.futureDateValidator()]],
      },
      { validators: this.dateRangeValidator }
    );
  }

  ngOnInit(): void {
    if (this.event) {
      this.eventForm.patchValue(this.event);
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.save.emit(this.eventForm.value);
    }
  }

  private futureDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const date = new Date(control.value);
      const today = new Date();
      return date < today ? { pastDate: true } : null;
    };
  }

  private dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;

    if (!start || !end) return null;

    return new Date(start) > new Date(end)
      ? { dateRange: 'End date must be after start date' }
      : null;
  }
}
