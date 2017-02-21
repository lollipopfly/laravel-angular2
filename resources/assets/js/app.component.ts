import { Component, OnInit } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router, ActivatedRoute } from '@angular/router';

import { Auth } from './api/user.service';
import { SharedService } from './api/shared.service';

@Component({
  selector: 'my-app',
  templateUrl: 'public/views/index.html'
})

export class AppComponent implements OnInit {
  publicRoutes = [
    'user/sign_up',
    'user/confirm',
    'user/forgot_password',
    'user/reset_password',
  ]

  constructor(
    public auth: Auth,
    private route: ActivatedRoute,
    public router: Router,
    public sharedService: SharedService
  ) {
    // On state chagne (every route chagne)
    router.events.subscribe(event => {
      // console.log(this.route);
      let user = JSON.parse(localStorage.getItem('user'))

      if(user && auth.loggedIn()) {
        // Save to global scope
        auth.initCurrentUser(user);
      }
    });
  }

  ngOnInit() {}
}
