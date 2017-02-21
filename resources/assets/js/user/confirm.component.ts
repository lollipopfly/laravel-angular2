import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';

import { Auth } from '../api/user.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'confirm-component',
  template: ''
})

export class ConfirmComponent implements OnInit {
  userString: string;

  constructor(
    private auth: Auth,
    private activatedRoute: ActivatedRoute,
    private http: Http,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params:any) => {
      let data = {
        confirmation_code: params['confirmation_code']
      }

      this.http.post('/api/authenticate/confirm', data)
          .toPromise()
          .then(response => {
            let user = response.json();

            // Save token
            localStorage.setItem('user_token', user.token)
            delete user.token;

            // Save user
            this.userString = JSON.stringify(user);
            localStorage.setItem('user', this.userString);

            // Save to global scope
            this.auth.initCurrentUser(user);

            this.router.navigate(['users']);
          })
          .catch(error => {
            console.log(error)

            this.router.navigate(['/user/sign_in']);
          });
    });
  }
}
