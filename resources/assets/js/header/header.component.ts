import { Component, OnInit } from '@angular/core';

import { Auth } from '../api/user.service';
import { SharedService } from '../api/shared.service';

@Component({
  selector: 'header-component',
  templateUrl: `public/views/partials/header.html`,
})

export class HeaderComponent implements OnInit {
  constructor(
    public auth: Auth,
    public sharedService: SharedService,
  ) {}

  ngOnInit() {}

  // Logout
  logOut(event): void {
    event.preventDefault();

    this.auth.logOut();
  }
}
