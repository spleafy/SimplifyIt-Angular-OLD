import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService } from '../forms.service';

@Component({
  selector: 'si-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
