import { Component, Injectable, OnInit, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from 'src/app/services/search/search.service';
import { GithubRepository } from '../../models/Repository.model';

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

  @Input() query : string = '';

  @Input() length: number = 0;

  @Input() receiveRepositories: GithubRepository[] = [];

  startIndex: number = 0;

  endIndex: number = 0;

  pageSize: number = 30;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 10;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 10;
  }

  OnPageChange(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if(this.endIndex > this.length){
      this.endIndex = this.length;
    }

    this.searchService.find(this.query, event.pageIndex+1);
  }
}
