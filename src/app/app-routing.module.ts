import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ApplicationPageComponent } from './application-page/application-page.component';
import { AccountsPageComponent } from './accounts-page/accounts-page.component';
import { ForgotFormComponent } from './forgot-form/forgot-form.component';
import { RootPageComponent } from './root-page/root-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

const routes: Routes = [
  { path: '', component: RootPageComponent },
  {
    path: 'accounts',
    component: AccountsPageComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent,
        pathMatch: 'full',
      },
      { path: 'register', component: RegisterFormComponent, pathMatch: 'full' },
      {
        path: 'account-recovery',
        component: ForgotFormComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'app',
    component: ApplicationPageComponent,
    children: [{ path: 'dashboard', component: DashboardPageComponent }],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
