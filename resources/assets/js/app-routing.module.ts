import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { UsersComponent } from './users/users.component';

// User
import { SignUpComponent } from './user/sign-up.component';
import { SignInComponent } from './user/sign-in.component';
import { ConfirmComponent } from './user/confirm.component';
import { ForgotPasswordComponent } from './user/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password.component';
import { AuthGuard, IfLoggedInGuard } from './api/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },

  // User
  {
    path: 'user/sign_up',
    component: SignUpComponent,
    canActivate: [IfLoggedInGuard]
  },
  {
    path: 'user/sign_in',
    component: SignInComponent,
    canActivate: [IfLoggedInGuard]
  },
  {
    path: 'user/confirm/:confirmation_code',
    component: ConfirmComponent,
    canActivate: [IfLoggedInGuard]
  },
  {
    path: 'user/forgot_password',
    component: ForgotPasswordComponent,
    canActivate: [IfLoggedInGuard]
  },
  {
    path: 'user/reset_password/:reset_password_code',
    component: ResetPasswordComponent,
    canActivate: [IfLoggedInGuard]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
