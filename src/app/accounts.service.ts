import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { requestPrefix } from './app.component';
import { responseMessage } from './app.component';
import { FormsService } from './forms.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private http: HttpClient, private formsService: FormsService) {}

  createFormData = (obj: any) => {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
      formData.append(key, obj[key]);
    });
    return formData;
  };

  // Email Request Timeout Variable
  requestTimeout = null;

  async checkDatabaseExistence(
    fieldName: string,
    fieldValue: string,
    path: string,
    regex?: any
  ) {
    let request = () => {
      return new Promise((resolve, reject) => {
        try {
          if (this.requestTimeout != null) {
            clearTimeout(this.requestTimeout);
          }
          this.requestTimeout = setTimeout(() => {
            // Request Params
            const params = new HttpParams().set(
              fieldName,
              fieldValue.toLowerCase()
            );
            // Making The Request To The Backend
            this.http
              .get(requestPrefix + path, { params })
              .subscribe((data?: responseMessage) => {
                resolve(data);
              });
          }, 500);
        } catch (err) {
          reject(err);
        }
      });
    };

    if (regex != undefined) {
      if (regex.test(fieldValue)) {
        return await request();
      } else {
        return null;
      }
    } else {
      return await request();
    }
  }

  // Function To Check Email Availability
  checkEmailAvailability(caller: string) {
    return (control: AbstractControl) => {
      return new Promise(async (resolve, reject) => {
        try {
          const controlName = this.formsService.getControlFieldName(control);
          const response: responseMessage = await this.checkDatabaseExistence(
            controlName.toString(),
            control.value,
            'api/user/verifyEmail',
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
          if (caller == 'login') {
            resolve(
              response.data?.registered ? null : { emailNotRegistered: true }
            );
          } else {
            resolve(
              response.data?.registered ? { emailRegistered: true } : null
            );
          }
        } catch (err) {
          reject(err);
        }
      });
    };
  }

  // Check Username Availability
  checkUsernameAvailability() {
    return (control: AbstractControl) => {
      return new Promise(async (resolve, reject) => {
        try {
          const controlName = this.formsService.getControlFieldName(control);
          const response: responseMessage = await this.checkDatabaseExistence(
            controlName.toString(),
            control.value,
            'api/user/verifyUsername',
            /^[a-zA-Z0-9_]*$/
          );

          resolve(
            response.data.registered ? { usernameRegistered: true } : null
          );
        } catch (err) {
          reject(err);
        }
      });
    };
  }

  // Send Email Function
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

  // Check User State
  checkUserState() {
    return new Promise((resolve, reject) => {
      try {
        const token = localStorage.getItem('token');
        // Making The Request To The Backend
        this.http
          .get(requestPrefix + 'api/user/checkUserState', {
            headers: { Authorization: 'Bearer ' + token },
          })
          .subscribe((data?: responseMessage) => {
            resolve(data);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}
