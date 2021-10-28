import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AccountsPageComponent } from './accounts-page/accounts-page.component';
import { ApplicationPageComponent } from './application-page/application-page.component';
import { ForgotFormComponent } from './forgot-form/forgot-form.component';
import { RootPageComponent } from './root-page/root-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AccountsPageComponent,
    ApplicationPageComponent,
    ForgotFormComponent,
    RootPageComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
