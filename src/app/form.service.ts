import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './app.component';
// import { User } from './store/models/user.model';
import { requestPrefix } from './app.component';
import { responseMessage } from './app.component';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private http: HttpClient) {}

  createFormData = (obj: any) => {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
      formData.append(key, obj[key]);
    });
    return formData;
  };

  login(user: User) {
    return new Promise((resolve, reject) => {
      try {
        const requestBody = this.createFormData(user);

        // Making The Request To The Backend
        this.http
          .post(requestPrefix + 'api/user/login', requestBody)
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  register(user: User) {
    return new Promise((resolve, reject) => {
      try {
        delete user.repassword;

        const requestBody = this.createFormData(user);

        // Making The Request To The Backend
        this.http
          .post(requestPrefix + 'api/user/register', requestBody)
          .subscribe((data?: responseMessage) => {
            resolve(data);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  getControlFieldName(control: AbstractControl) {
    let controlName = '';
    Object.keys(control.parent.controls).forEach((name) => {
      if (control === control.parent.controls[name]) {
        controlName = name;
      }
    });
    return controlName;
  }
}
