import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html',
  styleUrls: ['./root-page.component.scss'],
})
export class RootPageComponent implements OnInit {
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
