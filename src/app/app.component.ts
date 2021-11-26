import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
}

export type User = {
  email: string;
  username: string;
  password: string;
  repassword: string;
  name: string;
};

export type responseMessage = {
  status?: number;
  data?: any;
  err?: string;
};

export const requestPrefix: string = 'http://localhost:4000/';
