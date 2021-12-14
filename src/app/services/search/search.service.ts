import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubApi } from 'src/app/models/Repository.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseURL= 'http://api.github.com';

  @Output() searchQueryObserver : EventEmitter<string> = new EventEmitter();
  @Output() dataChangeObserver: EventEmitter<GithubApi> = new EventEmitter();

  constructor(private _httpClient: HttpClient)  { }

  find(search: string, page: number = 1) {
    this._httpClient.get<GithubApi>(`${this.baseURL}/search/repositories?q=${search}&&page=${page}`)
      .subscribe(response => this.dataChangeObserver.emit(response));
  }
}



