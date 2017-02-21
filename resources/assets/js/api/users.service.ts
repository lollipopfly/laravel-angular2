import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class UsersService {

  constructor(public authHttp: AuthHttp) {  }

  getUsers():any {

    return this.authHttp.get('api/authenticate')
    .toPromise()
      .then(function(response) {
        let data = response.json();

        return data;
      }).catch(function(error) {
        console.log(error);
      });
  }
}
