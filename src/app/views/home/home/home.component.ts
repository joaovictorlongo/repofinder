import { Component, Injectable, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from 'src/app/services/search/search.service';
import { GithubRepository } from '../../../models/Repository.model';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  breakpoint: number = 10;

  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 0,
    length: 0
  };

  length: number = 0;
  pageSize: number = 30;

  _repositories: GithubRepository[] = [];

  constructor(private searchService: SearchService) {}

  trackByRepository (index: number, repository: GithubRepository) {
    console.log(repository.id)
    return repository.id;
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 10;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 10;
  }

  handleRepositories(items: GithubRepository[], length: number) {
    this._repositories = items;
    console.log(this._repositories);
    this.length = length;
  }

  OnPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }

    const query = this.searchService.searchQuery;
    this.searchService.find(query, event.pageIndex+1).subscribe(
      response => this.handleRepositories(response.items, response.total_count)
    );
  }
}
