import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, OnDestroy {

  images: any = [];
  page = 1;
  datalimit = 8;
  dataSubsciption: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.SearchImages('');
  }

  SearchImages(srch) {
    console.log(srch.value);
    this.dataSubsciption = this.dataService.getImages(srch.value)
    .subscribe((res) => {
      this.page = 1;
      this.images = res;
    },
    (err) => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    if ( this.dataSubsciption) {
    this.dataSubsciption.unsubscribe();
    }
  }


}
