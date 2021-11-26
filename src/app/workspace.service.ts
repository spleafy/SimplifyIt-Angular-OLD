import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { requestPrefix, responseMessage } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private http: HttpClient) {}

  getAllWorkspaces() {
    return new Promise((resolve, reject) => {
      try {
        const token = localStorage.getItem('token');

        this.http
          .get(requestPrefix + 'api/user/workspace', {
            headers: { Authorization: 'Bearer ' + token },
          })
          .subscribe((data: responseMessage) => {
            resolve(data);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  getWorkspace(workspaceId: string) {
    return new Promise((resolve, reject) => {
      try {
        const token = localStorage.getItem('token');

        this.http
          .get(requestPrefix + 'api/user/workspace/' + workspaceId, {
            headers: { Authorization: 'Bearer ' + token },
          })
          .subscribe((data: responseMessage) => {
            resolve(data);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}
