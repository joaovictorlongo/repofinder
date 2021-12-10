import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { GithubApi } from 'src/app/models/Repository.model';
import { SearchService } from 'src/app/services/search/search.service';
import { HomeComponent } from 'src/app/views/home/home.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  handleSearch(query: string, page: number = 1) {
    this.searchService.searchQueryObserver.emit(query);
    this.searchService.find(query, page);
  }


}
