import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../api/shared.service';
import { Auth } from '../api/user.service';

@Component({
  selector: 'header-component',
  templateUrl: `public/views/partials/header.html`,
})

export class HeaderComponent implements OnInit{
  constructor(
    public auth: Auth,
    public router: Router,
    public sharedService: SharedService,
  ) {}

  ngOnInit() {}

  // Logout
  logOut(event): void {
    event.preventDefault();

    this.auth.logOut();
  }
}
