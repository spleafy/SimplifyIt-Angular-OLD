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

  checkEmailTimeout = null;

  checkEmailAvailability(caller: string) {
    return (control: AbstractControl) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(control.value)) {
        return new Promise((resolve, reject) => {
          try {
            if (this.checkEmailTimeout != null) {
              clearTimeout(this.checkEmailTimeout);
            }
            this.checkEmailTimeout = setTimeout(() => {
              const params = new HttpParams()
                .set('validateEmail', 'validateEmail')
                .set('email', control.value.toLowerCase());
              this.http
                .get(requestPrefix + 'actions.php', { params })
                .subscribe((data) => {
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
        const params = new HttpParams()
          .set('loginUser', 'loginUser')
          .set('user_email', user.email)
          .set('user_password', user.password);
        this.http
          .get(requestPrefix + 'actions.php', { params })
          .subscribe((data) => {
            console.log(data);
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
        const params = new HttpParams()
          .set('registerUser', 'registerUser')
          .set('user_name', user.name)
          .set('user_email', user.email)
          .set('user_password', user.password);
        this.http
          .get(requestPrefix + 'actions.php', { params })
          .subscribe((data) => {
            resolve(data);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}
