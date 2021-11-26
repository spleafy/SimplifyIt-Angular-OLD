import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'si-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  darkTheme: boolean;

  ngOnInit(): void {
    this.darkTheme =
      Boolean(JSON.parse(localStorage.getItem('dark-theme'))) || false;

    const body = document.querySelector('body');

    if (this.darkTheme) {
      body.classList.remove('si-light-theme');
      body.classList.add('si-dark-theme');
    } else {
      body.classList.remove('si-dark-theme');
      body.classList.add('si-light-theme');
    }
  }

  iconSize: number = 20;

  toggleTheme() {
    const body = document.querySelector('body');

    this.darkTheme = !this.darkTheme;

    if (this.darkTheme) {
      body.classList.remove('si-light-theme');
      body.classList.add('si-dark-theme');
    } else {
      body.classList.remove('si-dark-theme');
      body.classList.add('si-light-theme');
    }

    localStorage.setItem('dark-theme', JSON.stringify(this.darkTheme));
  }
}
