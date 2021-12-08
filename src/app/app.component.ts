import { Component } from '@angular/core';
import { GithubRepository, GithubApi } from './models/Repository.model';
import { SearchService } from './services/search/search.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  query: string = '';
  pageIndex: number = 0;
  length: number = 0;

  repositories: GithubRepository[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.searchQueryObserver.subscribe(data => this.query = data);

    this.searchService.dataChangeObserver.subscribe(data => {
      this.pageIndex = 0;
      this.length = data.total_count;
      this.repositories = data.items;
    });
  }

  reciverRepositories(event: any) {
    console.log(event);
  }

}
