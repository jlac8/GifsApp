import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'SD9hEue9k7Y2O8MmHhq9scks0FlQS7nP';
  private giphyUrl: string = 'https://api.giphy.com/v1/gifs'
  private _searchHistory: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._searchHistory];
  }

  constructor( private http: HttpClient ) {
    this._searchHistory = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }
  
  searchGifs(query: string = '') {
    
    query = query.trim().toLowerCase();

    if( !this._searchHistory.includes(query)) {
      this._searchHistory.unshift( query );
      console.log(this._searchHistory);
      this._searchHistory = this._searchHistory.splice(0,10);

      localStorage.setItem('history', JSON.stringify( this._searchHistory));
    }    

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.giphyUrl}/search`, {params})
      .subscribe( resp => {
        console.log(resp.data);
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results))
      })
  }
}
