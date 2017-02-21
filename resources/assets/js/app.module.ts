import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent }  from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { UsersComponent } from './users/users.component';

// User
import { SignUpComponent } from './user/sign-up.component';
import { SignInComponent } from './user/sign-in.component';
import { ConfirmComponent } from './user/confirm.component';
import { ResetPasswordComponent } from './user/reset-password.component';
import { ForgotPasswordComponent } from './user/forgot-password.component';

// Services
import { Auth } from './api/user.service';
import { AuthGuard, IfLoggedInGuard } from './api/auth-guard.service';
import { UsersService } from './api/users.service';
import { SharedService } from './api/shared.service';

// Route
import { AppRoutingModule } from './app-routing.module';

function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({tokenName: 'user_token'}), http, options);
}

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContactComponent,
    UsersComponent,
    SignUpComponent,
    SignInComponent,
    ConfirmComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
  ],
  providers: [
    Auth,
    UsersService,
    SharedService,
    AuthGuard,
    IfLoggedInGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
    ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
