import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Credentials } from '../api/user.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'sign-up-component',
  templateUrl: 'public/views/user/sign_up.html',
})

export class SignUpComponent implements OnInit {
  constructor(private http: Http) {}

  showSuccessMessage: boolean = false;
  credentials: Credentials = {
    name: '',
    email: '',
    password: '',
  }

  error: Credentials = {
    name: '',
    email: '',
    password: ''
  }

  ngOnInit() {}

  register(event) {
    event.preventDefault();

    this.http.post('/api/authenticate/register', this.credentials)
        .toPromise()
        .then(response => {
          let data = response.json();

          this.showSuccessMessage = true;
        })
        .catch(error => {
          this.error = error.json();

          console.log(this.error)
        });
  }
}
