import { Artist } from './artist.model';

export interface Event {
  id?: string;
  label: string;
  startDate: string;
  endDate: string;
  artists?: Artist[];
}
