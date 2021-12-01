import { Component } from '@angular/core';
import { GithubRepository, GithubApi } from './models/Repository.model';
import { SearchService } from './services/search/search.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  query: string = '';
  length: number = 0;

  repositories: GithubRepository[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.searchQueryObserver.subscribe(data => this.query = data);

    this.searchService.dataChangeObserver.subscribe(data => {
      this.repositories = data.items;
      this.length = data.total_count;
    });
  }

  reciverRepositories(event: any) {
    console.log(event);
  }

}
