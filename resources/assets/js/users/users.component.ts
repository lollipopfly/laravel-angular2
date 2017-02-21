import { Component, OnInit } from '@angular/core';

import { UsersService } from '../api/users.service';
import { SharedService } from '../api/shared.service';

@Component({
  selector: 'my-users',
  templateUrl: 'public/views/users/users.html',
})

export class UsersComponent implements OnInit {
  users: any;
  error: string;

  constructor(
    private usersService: UsersService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {}

  getUsers() {
    this.usersService.getUsers().then(data => {
      this.users = data;
    }).catch(function(error) {
      console.log(error);
    });
  }
}
