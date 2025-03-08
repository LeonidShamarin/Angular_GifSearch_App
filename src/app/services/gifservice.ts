import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Gif } from '../models/gif.model';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private apiKey = environment.giphyApiKey;
  private apiUrl = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  searchGifs(
    query: string,
    limit: number = 25,
    offset: number = 0
  ): Observable<{ data: Gif[] }> {
    return this.http.get<{ data: Gif[] }>(`${this.apiUrl}/search`, {
      params: {
        api_key: this.apiKey,
        q: query,
        limit: limit.toString(),
        offset: offset.toString(),
      },
    });
  }

  getGifById(id: string): Observable<{ data: Gif }> {
    return this.http.get<{ data: Gif }>(`${this.apiUrl}/${id}`, {
      params: {
        api_key: this.apiKey,
      },
    });
  }
}
