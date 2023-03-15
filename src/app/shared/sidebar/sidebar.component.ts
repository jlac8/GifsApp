import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor( private gifsService: GifsService) {}

  search(name: string) {
    
    this.gifsService.searchGifs(name);

  }

  get history() {
    return this.gifsService.history;
  }
}
