import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, debounceTime, EMPTY, map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { GithubApi, GithubRepository } from 'src/app/models/Repository.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseURL= 'http://api.github.com';

  @Output() searchQueryObserver : EventEmitter<string> = new EventEmitter();

  @Output() dataChangeObserver: EventEmitter<GithubApi> = new EventEmitter();

  constructor(private snackBar: MatSnackBar, private _httpClient: HttpClient)  { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  find(search: string, page: number = 1) {
    this._httpClient.get<GithubApi>(`${this.baseURL}/search/repositories?q=${search}&&page=${page}`)
      .subscribe(response => this.dataChangeObserver.emit(response));
  }

  errorHandler(e: HttpErrorResponse): Observable<any> {
    const messageError = e.status === 404 ? 'Repositório não encontrado/inválido' : 'Ocorreu um erro ao pesquisar';
    this.showMessage(messageError, true);
    return EMPTY;
  }
}



