import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'si-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApplicationPageComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const response = await this.accountService.getUserState();

    console.log(response);

    if (response[0].iat != undefined) {
      this.router.navigate(['/app']);
    } else {
      this.router.navigate(['/account']);
    }
  }
}
