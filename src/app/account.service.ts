import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { requestPrefix } from './app.component';
import { responseMessage } from './app.component';
import { FormService } from './form.service';

// Store
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import * as UserActions from './store/actions/user.action';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private formService: FormService,
    private store: Store<AppState>
  ) {}

  // A Function To Create Form Data From An Object
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
    // Describing The Request Function
    let request = () => {
      // Return A Promise To Make It Async
      return new Promise((resolve, reject) => {
        // Wrap In Try Catch Block For Error Handling
        try {
          // If The Timeout Isn't finished, Clear It On The Next Function Call
          if (this.requestTimeout != null) {
            clearTimeout(this.requestTimeout);
          }
          // Set A Timeout So The Request Isn't Called On Every Keydown Event
          this.requestTimeout = setTimeout(() => {
            // Request Params
            // Create The HttpParams For The Request
            const params = new HttpParams().set(
              fieldName,
              fieldValue.toLowerCase()
            );
            // Making The Request To The Backend
            this.http
              .get(requestPrefix + path, { params })
              .subscribe((data?: responseMessage) => {
                // Resolving The Data
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
    // Return The Abstract Control Function For Angular Custom Validators
    return (control: AbstractControl) => {
      // Return A Promise, To Make It Async
      return new Promise(async (resolve, reject) => {
        // Wrap In Try Catch Block For Error Handling
        try {
          // Get The Name Of The Control, That Calls This Validator
          const controlName = this.formService.getControlFieldName(control);
          // Check The Database Existence
          const response: responseMessage = await this.checkDatabaseExistence(
            controlName.toString(),
            control.value,
            'api/user/verifyEmail',
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
          if (caller == 'login') {
            // Resolve A Different Result Based On The Caller
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
    // Return The Abstract Control Function For Angular Custom Validators
    return (control: AbstractControl) => {
      // Return A Promise To Make It Async
      return new Promise(async (resolve, reject) => {
        // Wrap In Try Catch Block For Error Handling
        try {
          // Get The Control Name Of The Control
          const controlName = this.formService.getControlFieldName(control);
          // Check The Database Existence
          const response: responseMessage = await this.checkDatabaseExistence(
            controlName.toString(),
            control.value,
            'api/user/verifyUsername',
            /^[a-zA-Z0-9_]*$/
          );

          // Resolve The Data
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
  setUserState() {
    // Return A Promise To Make The Function Async, Because We Are Making A Request Which We Will Have To await
    return new Promise((resolve, reject) => {
      // Wrap In Try Catch Block For Error Handling
      try {
        // Get The Token From The LocalStorage
        const token = localStorage.getItem('token');
        // Making The Request To The Backend
        this.http
          .get(requestPrefix + 'api/user/getUserState', {
            headers: { Authorization: 'Bearer ' + token },
          })
          .subscribe((data?: responseMessage) => {
            // If The User Is Logged In Set The User In The NgRx Store
            if (data.status == 200) {
              this.store.dispatch(UserActions.setUser({ payload: data.data }));
            }
            // Return The User
            resolve(data);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  getUserState() {
    // Return A Promise To Make It Async
    return new Promise((resolve, reject) => {
      // Wrap In Try Catch Block For Error Handling
      try {
        // Select The User From The NgRx Store
        this.store.select('user').subscribe(async (data) => {
          // If The User Is An Empty Object(The Initial Value)
          if (Object.keys(data[0]).length <= 0) {
            // Then Get The User From The Backend And Set It
            await this.setUserState();

            try {
              // Select The User From The Store After Setting It
              this.store.select('user').subscribe((data) => {
                // Return The User
                resolve(data);
              });
            } catch (err) {
              reject(err);
            }
          } else {
            resolve(data);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
