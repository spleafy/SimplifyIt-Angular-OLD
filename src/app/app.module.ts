import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ApplicationPageComponent } from './application-page/application-page.component';
import { ForgotFormComponent } from './forgot-form/forgot-form.component';
import { RootPageComponent } from './root-page/root-page.component';
import { AccountPageComponent } from './account-page/account-page.component';

// Store
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';

// Icons
import { NgIconsModule } from '@ng-icons/core';
import {
  HeroUsers,
  HeroPlus,
  HeroSun,
  HeroHome,
  HeroBriefcase,
  HeroChat,
  HeroCog,
  HeroMoon,
  HeroCalendar,
  HeroViewGrid,
  HeroPresentationChartBar,
  HeroQuestionMarkCircle,
  HeroPaperAirplane,
} from '@ng-icons/heroicons';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SeparatorComponent } from './separator/separator.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ApplicationPageComponent,
    ForgotFormComponent,
    RootPageComponent,
    AccountPageComponent,
    SidebarComponent,
    SeparatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: userReducer,
    }),
    NgIconsModule.withIcons({
      HeroUsers,
      HeroPlus,
      HeroSun,
      HeroHome,
      HeroBriefcase,
      HeroChat,
      HeroCog,
      HeroMoon,
      HeroCalendar,
      HeroViewGrid,
      HeroPresentationChartBar,
      HeroQuestionMarkCircle,
      HeroPaperAirplane,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
