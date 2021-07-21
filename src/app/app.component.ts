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
  name?: string;
  email?: string;
  password?: string;
};

export const requestPrefix: string = 'http://localhost/src/assets/php/';
