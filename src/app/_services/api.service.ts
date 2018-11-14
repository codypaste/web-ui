import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GroupModel } from 'src/app/_models/GroupModel';
import { GroupPostResponseModel } from 'src/app/_models/GroupPostResponseModel';
import { SnippetModel } from 'src/app/_models/SnippetModel';
import { SnippetResponseModel } from 'src/app/_models/SnippetResponseModel';
import { ProjectViewModel } from 'src/app/_models/ProjectViewModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  createGroup(payload: GroupModel): Promise<GroupPostResponseModel> {
    return this.http.post<GroupPostResponseModel>(environment.groupsEndpoint, payload).toPromise();
  }

  createSnippet(payload: SnippetModel): Promise<SnippetResponseModel> {
    return this.http.post<SnippetResponseModel>(environment.snippetsEndpoint, payload).toPromise();
  }

  retrieveProject(id: string, password: string): Promise<ProjectViewModel> {
    const payload = password.length > 0 ? {
      groupId: id,
      password
    } : {
      groupId: id
    };
    return this.http.post<ProjectViewModel>(environment.retrieveProjectEndpoint, payload).toPromise();
  }
}
