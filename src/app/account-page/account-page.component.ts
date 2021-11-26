import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
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
