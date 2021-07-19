import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { StringDecoder } from 'string_decoder';

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
                .get(
                  'http://localhost/Projects%20Under%20Development/EasifyIt/src/assets/php/actions.php',
                  { params }
                )
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

  checkUsernameTimeout = null;

  checkUsernameAvailability(minlength: number) {
    return (control: AbstractControl) => {
      if (control.value.length > minlength) {
        return new Promise((resolve, reject) => {
          try {
            if (this.checkUsernameTimeout != null) {
              clearTimeout(this.checkUsernameTimeout);
            }
            this.checkUsernameTimeout = setTimeout(() => {
              const params = new HttpParams()
                .set('validateUsername', 'validateUsername')
                .set('username', control.value.toLowerCase());
              this.http
                .get(
                  'http://localhost/Projects%20Under%20Development/EasifyIt/src/assets/php/actions.php',
                  { params }
                )
                .subscribe((data) => {
                  resolve(data ? { usernameRegistered: true } : null);
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

  comparePasswords(password: any) {
    return (control: AbstractControl) => {
      return new Promise((resolve, reject) => {
        control.value == password
          ? resolve(null)
          : resolve({ passwordsAreDifferent: true });
      });
    };
  }
}
