import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GifService } from '../../services/gifservice';

@Component({
  selector: 'app-gif-detail',
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.scss'],
})
export class GifDetailComponent implements OnInit {
  gif: any;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private gifService: GifService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this.gifService.getGifById(id).subscribe({
        next: (response: any) => {
          this.gif = response.data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching GIF details:', error);
          this.isLoading = false;
        },
      });
    }
  }

  copyLink(url: string): void {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy link:', error);
      });
  }

  downloadGif(url: string): void {
    window.open(url, '_blank');
  }
}
