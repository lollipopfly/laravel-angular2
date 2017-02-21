import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { Auth } from './user.service';

import { Observable } from "rxjs";

// Protect admin routes
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate() {
    if(this.auth.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['user/sign_in']);
      return false;
    }
  }
}

// Deactivate auth routes when logged in
@Injectable()
export class IfLoggedInGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate() {
    if(this.auth.loggedIn()) {
      this.router.navigate(['/']);

      return false;
   } else {
      return true;
   }
  }
}
