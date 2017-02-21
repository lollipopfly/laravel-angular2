import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { AuthHttp } from 'angular2-jwt';

import { Auth } from '../api/user.service';

import 'rxjs/add/operator/toPromise';

interface Icredendials {
  email: string,
  password: string,
}

@Component({
  selector: 'sign-in-component',
  templateUrl: 'public/views/user/sign_in.html',
})

export class SignInComponent implements OnInit {
  email:string;
  password: string;
  userString: string;
  error: any;

  constructor(
    public auth: Auth,
    private http: Http,
    private router: Router,
    public authHttp: AuthHttp
  ) {}

  ngOnInit() {}

  login(event): void {
    event.preventDefault();

    let credentials: Icredendials = {
      email: this.email,
      password: this.password,
    }

    // Get token
    this.http.post('/api/authenticate', credentials)
        .toPromise()
        .then(response => {
          let data = response.json();
          let token = data.token;

          localStorage.setItem('user_token', token);

          // Get user if token provided
          this.authHttp.get('/api/authenticate/get_user', credentials)
            .subscribe(
              response => {
                let data = response.json();

                // Save user
                this.userString = JSON.stringify(data.user);
                localStorage.setItem('user', this.userString);

                // Save to global scope
                this.auth.initCurrentUser(data.user);

                this.router.navigate(['users/']);
              },
              error => console.log(error)
            );
        })
        .catch(error => {
          this.error = error.json();

          console.log(this.error)
        });
  }
}
