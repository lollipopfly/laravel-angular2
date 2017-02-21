import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'reset-password-component',
  templateUrl: 'public/views/user/reset_password.html',
})

export class ResetPasswordComponent implements OnInit {
  error: any;
  password: string;
  confirmPassword: string;
  showSuccessMessage: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private http: Http) {}

  ngOnInit() {}

  restorePassword(event): void {
    event.preventDefault();

    this.activatedRoute.params.subscribe((params:any) => {
      let data = {
        reset_password_code: params['reset_password_code'],
        password: this.password,
      }

      if (this.password != this.confirmPassword) {
        this.error = 'Password is invalid! Password doesn\'t match confirmation';

        return false;
      }

      this.http.post('api/authenticate/reset_password', data)
          .toPromise()
          .then(response => {
            // Show success message
            if(response.json()) {
              this.showSuccessMessage = true;
            }
          })
          .catch(error => {
            console.log(error)

            this.error = error.json().error;
          });
    });
  }
}
