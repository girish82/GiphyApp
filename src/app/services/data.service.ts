import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Filter from 'bad-words';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  filter;

  constructor(private http: HttpClient) { }

  getImages(searchWord?: string) {

    if (searchWord === undefined) {
      searchWord = 'puppies';
    } else {
      this.filter = new Filter();
      searchWord = this.filter.clean(searchWord);
    }

    let params = new HttpParams();
    params = params.append('q', searchWord);
    return this.http.get('http://api.giphy.com/v1/gifs/search?api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6&limit=24', {
      params
    })
    .pipe(map((res: any) => {
        return res.data.map((val) =>  val.images.original.url);
    }));
  }
}
