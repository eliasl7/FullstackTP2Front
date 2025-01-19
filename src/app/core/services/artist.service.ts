import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../../models/artist.model';
import { PageInfo } from '../../models/pagination.model';
import { Event } from '../../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private apiUrl = 'http://localhost:8080/artists';

  constructor(private http: HttpClient) {}

  getArtists(
    page = 0,
    size = 10,
    searchTerm?: string
  ): Observable<PageInfo<Artist>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (searchTerm) {
      params = params.set('label', searchTerm);
    }

    return this.http.get<PageInfo<Artist>>(this.apiUrl, { params });
  }

  getArtistById(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/${id}`);
  }

  createArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.apiUrl, artist);
  }

  updateArtist(id: string, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiUrl}/${id}`, artist);
  }

  deleteArtist(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getArtistEvents(id: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/${id}/events`);
  }
}
