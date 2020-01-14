import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private authURL: string;

  constructor(private httpclient: HttpClient) {
    this.authURL = 'http://localhost:3000/auth/v1';
  }

  authenticateUser(data) {
    return this.httpclient.post(this.authURL, data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.httpclient.post('http://localhost:3000/auth/v1/isAuthenticated', {}, {
        headers: {'Authorization': `Bearer ${token}`}
      }).subscribe(res => {
        resolve(res['isAuthenticated']);
      },
      err => {
        reject(err);
      } );
    } );
  }
}
