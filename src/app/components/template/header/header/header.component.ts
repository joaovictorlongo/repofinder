import { Component, Injectable, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { SearchService } from 'src/app/services/search/search.service';
import { HomeComponent } from 'src/app/views/home/home/home.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private searchService: SearchService, private homeComponent: HomeComponent) { }

  ngOnInit(): void {
  }

  handleSearch(query: string, page: number = 1) {
    this.searchService.searchQuery = query;
    this.searchService.find(query, page).pipe(debounceTime(1000)).subscribe(
      response => this.homeComponent.handleRepositories(response.items, response.total_count)
    );
  }


}
