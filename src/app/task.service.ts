import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { requestPrefix } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(workspaceId: string) {
    return new Promise((resolve, reject) => {
      try {
        const token = localStorage.getItem('token');
        this.http
          .get(requestPrefix + 'api/user/workspace/' + workspaceId + '/task', {
            headers: { Authorization: 'Bearer ' + token },
          })
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}
