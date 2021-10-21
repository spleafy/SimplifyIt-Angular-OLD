import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { User } from './app.component';
import { requestPrefix } from './app.component';
import { responseMessage } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private http: HttpClient) {}

  createFormData = (obj: any) => {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
      formData.append(key, obj[key]);
    });
    return formData;
  };

  // Email Request Timeout Variable
  requestTimeout = null;

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
            if (this.requestTimeout != null) {
              clearTimeout(this.requestTimeout);
            }
            this.requestTimeout = setTimeout(() => {
              // Request Params
              const params = new HttpParams().set(
                'userEmail',
                control.value.toLowerCase()
              );
              // Making The Request To The Backend
              this.http
                .get(requestPrefix + 'api/user/verifyEmail', { params })
                .subscribe((data?: responseMessage) => {
                  // Making The Function Work For Login & Register
                  if (caller == 'login') {
                    resolve(
                      data.data?.registered
                        ? null
                        : { emailNotRegistered: true }
                    );
                  } else {
                    resolve(
                      data.data?.registered ? { emailRegistered: true } : null
                    );
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

  // Check Username Availability
  checkUsernameAvailability() {
    return (control: AbstractControl) => {
      // Email Regex Variable
      const re = /^[a-zA-Z0-9_]*$/;

      // Sending The Request Only If The Email Is Valid By Regex
      if (
        re.test(control.value) &&
        control.value.length >= 4 &&
        control.value.length <= 25
      ) {
        return new Promise((resolve, reject) => {
          try {
            if (this.requestTimeout != null) {
              clearTimeout(this.requestTimeout);
            }

            this.requestTimeout = setTimeout(() => {
              // Request Params
              const params = new HttpParams().set(
                'userUsername',
                control.value.toLowerCase()
              );
              // Making The Request To The Backend
              this.http
                .get(requestPrefix + 'api/user/verifyUsername', { params })
                .subscribe((data?: responseMessage) => {
                  resolve(
                    data.data.registered ? { usernameRegistered: true } : null
                  );
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

  sendEmail(email: String) {
    return new Promise((resolve, reject) => {
      try {
        const requestBody = this.createFormData(email);

        // Making the request to the backend
        this.http
          .post(requestPrefix + 'api/user/sendEmail', requestBody)
          .subscribe((data?: responseMessage) => {
            resolve(data);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}
