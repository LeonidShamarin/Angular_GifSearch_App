import { Component } from '@angular/core';
import { GifService } from '../../services/gifservice';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-gif-search',
  templateUrl: './gif-search.component.html',
  styleUrls: ['./gif-search.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class GifSearchComponent {
  searchQuery: string = '';
  gifs: any[] = [];
  isLoading: boolean = false;
  offset: number = 0; 
  limit: number = 25; 

  constructor(private gifService: GifService, private router: Router) {}

  searchGifs(): void {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.offset = 0; 
      this.gifService
        .searchGifs(this.searchQuery, this.limit, this.offset)
        .subscribe({
          next: (response: any) => {
            this.gifs = response.data;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching GIFs:', error);
            this.isLoading = false;
          },
        });
    }
  }

  loadMore(): void {
    if (this.searchQuery.trim()) {
      this.offset += this.limit; 
      this.gifService
        .searchGifs(this.searchQuery, this.limit, this.offset)
        .subscribe({
          next: (response: any) => {
            this.gifs = [...this.gifs, ...response.data]; 
          },
          error: (error) => {
            console.error('Error fetching more GIFs:', error);
          },
        });
    }
  }

  viewDetail(gifId: string): void {
    this.router.navigate(['/detail', gifId]);
  }

  copyLink(url: string): void {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    });
  }

  downloadGif(url: string): void {
    window.open(url, '_blank');
  }
}
