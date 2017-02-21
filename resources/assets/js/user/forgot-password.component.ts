import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'forgot-password-component',
  templateUrl: 'public/views/user/forgot_password.html',
})

export class ForgotPasswordComponent implements OnInit {
  email: string;
  showSuccessMessage: boolean = false;
  error: any;

  constructor(private http: Http) {}

  ngOnInit() {}

  restorePassword(event) {
    event.preventDefault();

    let data = {
      email: this.email
    }

    this.http.post('api/authenticate/send_reset_code', data)
        .toPromise()
        .then(response => {
          // Show message
          this.showSuccessMessage = true;
        })
        .catch(error => {
          this.error = error.json().error;
          console.log(this.error)
        });
  }
}
