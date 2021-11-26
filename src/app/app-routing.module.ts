import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ApplicationPageComponent } from './application-page/application-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { ForgotFormComponent } from './forgot-form/forgot-form.component';
import { RootPageComponent } from './root-page/root-page.component';

const routes: Routes = [
  { path: '', component: RootPageComponent },
  {
    path: 'account',
    component: AccountPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginFormComponent,
        pathMatch: 'full',
      },
      { path: 'register', component: RegisterFormComponent, pathMatch: 'full' },
      {
        path: 'forgot',
        component: ForgotFormComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'app',
    component: ApplicationPageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: 'dashboard', component: '', pathMatch: 'full' },
      // {
      //   path: 'workspace/:workspaceId',
      //   component: '',
      //   pathMatch: 'full',
      // },
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
