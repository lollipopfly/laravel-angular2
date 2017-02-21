import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { tokenNotExpired } from 'angular2-jwt';

import { SharedService } from '../api/shared.service';


@Injectable()
export class Credentials {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}
}

@Injectable()
export class Auth {
  tokenName: string = 'user_token';

  constructor(
    public router: Router,
    public sharedService: SharedService
  ) {}

  // If logged
  loggedIn(): boolean {
    return tokenNotExpired(this.tokenName);
  }

  initCurrentUser(user:any) {
    this.sharedService.authenticated = true;
    this.sharedService.currentUser = user;
  }

  logOut(): void {
    localStorage.removeItem(this.tokenName);
    localStorage.removeItem('user');
    this.sharedService.authenticated = false;
    this.sharedService.currentUser = null;

    this.router.navigate(['user/sign_in']);
  }
}
