import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GroupModel } from 'src/app/_models/GroupModel';
import { GroupPostResponseModel } from 'src/app/_models/GroupPostResponseModel';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SnippetModel } from 'src/app/_models/SnippetModel';
import { SnippetResponseModel } from '../_models/SnippetResponseModel';

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

  createGroup(payload: GroupModel): Promise<GroupPostResponseModel> {
    return this.http.post<GroupPostResponseModel>(environment.groupsEndpoint, payload).toPromise();
  }

  createSnippet(payload: SnippetModel): Promise<SnippetResponseModel> {
    return this.http.post<SnippetResponseModel>(environment.snippetsEndpoint, payload).toPromise();
  }
}
