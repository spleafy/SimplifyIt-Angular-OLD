import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';
import { responseMessage } from '../app.component';

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html',
  styleUrls: ['./root-page.component.scss'],
})
export class RootPageComponent implements OnInit {
  constructor(
    private accountsService: AccountsService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const response: responseMessage =
      await this.accountsService.checkUserState();
    if (response.status == 403) {
      this.router.navigate(['/accounts/login']);
    } else {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      this.router.navigate(['/app/']);
    }
  }
}
