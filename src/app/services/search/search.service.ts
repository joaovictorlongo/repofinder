import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, EMPTY, map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { GithubApi } from 'src/app/models/Repository.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseURL= 'http://api.github.com';

  searchQuery: string = '';

  constructor(private snackBar: MatSnackBar, private _httpClient: HttpClient)  { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  find(search: string, page: number = 1): Observable<GithubApi> {
    return this._httpClient.get<GithubApi>(`${this.baseURL}/search/repositories?q=${search}&&page=${page}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: HttpErrorResponse): Observable<any> {
    const messageError = e.status === 404 ? 'Repositório não encontrado/inválido' : 'Ocorreu um erro ao pesquisar';
    this.showMessage(messageError, true);
    return EMPTY;
  }
}



