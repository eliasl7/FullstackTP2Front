import { Event } from './event.model';

export interface Artist {
  id?: string;
  label: string;
  events?: Event[];
}
