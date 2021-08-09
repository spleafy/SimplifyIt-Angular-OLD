import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { User } from './app.component';
import { requestPrefix } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private http: HttpClient) {}

  // Email Request Timeout Variable
  checkEmailTimeout = null;

  // Function To Check Email Availability
  checkEmailAvailability(caller: string) {
    return (control: AbstractControl) => {
      // Email Regex Variable
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      // Sending The Request Only If The Email Is Valid By Regex
      if (re.test(control.value)) {
        return new Promise((resolve, reject) => {
          try {
            if (this.checkEmailTimeout != null) {
              clearTimeout(this.checkEmailTimeout);
            }
            this.checkEmailTimeout = setTimeout(() => {
              // Request Params
              const params = new HttpParams()
                .set('q', 'validateEmail')
                .set('userEmail', control.value.toLowerCase());
              // Making The Request To The Backend
              this.http.get(requestPrefix, { params }).subscribe((data) => {
                console.log(data);
                // Making The Function Work For Login & Register
                if (caller == 'login') {
                  resolve(data ? null : { emailNotRegistered: true });
                } else {
                  resolve(data ? { emailRegistered: true } : null);
                }
              });
            }, 500);
          } catch (err) {
            reject(err);
          }
        });
      }

      return of(null);
    };
  }

  login(user: User) {
    return new Promise((resolve, reject) => {
      try {
        // Request Params
        const params = new HttpParams()
          .set('q', 'loginUser')
          .set('userEmail', user.email)
          .set('userPassword', user.password);
        // Making The Request To The Backend
        this.http.get(requestPrefix, { params }).subscribe((data) => {
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
        // Request Params
        const params = new HttpParams()
          .set('q', 'registerUser')
          .set('userName', user.name)
          .set('userEmail', user.email)
          .set('userPassword', user.password);
        // Making The Request To The Backend
        this.http.get(requestPrefix, { params }).subscribe((data) => {
          resolve(data);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
