import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { tokenNotExpired } from 'angular2-jwt';

import { Auth } from './api/user.service';
import { SharedService } from './api/shared.service';

@Component({
  selector: 'my-app',
  templateUrl: 'public/views/index.html'
})

export class AppComponent implements OnInit {
  constructor(
    public auth: Auth,
    private route: ActivatedRoute,
    public router: Router,
    public sharedService: SharedService
  ) {
    // On state chagne (every route chagne)
    router.events.subscribe(event => {
      let user = JSON.parse(localStorage.getItem('user'))

      // Save to global scope
      if(user && auth.loggedIn()) {
        auth.initCurrentUser(user);
      }
    });
  }

  ngOnInit() {}
}
