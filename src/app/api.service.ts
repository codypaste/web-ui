import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { GroupModel } from './_models/GroupModel';
import { GroupPostResponseModel } from './_models/GroupPostResponseModel';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  createGroup(payload: GroupModel): Observable<GroupPostResponseModel> {
    return this.http.post<GroupModel>(environment.groupsEndpoint, payload).pipe(
      tap(_ => console.log('create')),
      catchError(this.handleError<any>('post', payload))
    );
  }

  createSnippets(payload: GroupModel): Observable<GroupPostResponseModel> {
    return this.http.post<GroupModel>(environment.groupsEndpoint, payload).pipe(
      tap(_ => console.log('create')),
      catchError(this.handleError<any>('post', payload))
    );
  }
}
