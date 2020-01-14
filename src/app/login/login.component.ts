import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: FormControl;
    password: FormControl;
    // loginForm = new FormGroup({

    submitMessage: string;
    constructor(private authservice: AuthenticationService, private routerservice: RouterService) {
      this.username = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
      this.password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
    }

    loginSubmit() {
      this.authservice.authenticateUser({username: this.username.value, password: this.password.value}).subscribe(
        data => {
          this.authservice.setBearerToken(data['token']);
          this.routerservice.routeToDashboard();
        },
        err => {
          if (err.status === 404) {
            this.submitMessage = err.message;
            console.log(err.message);
          }
          if (err.status === 403) {
            this.submitMessage = err.error.message;
            console.log(err.message);
          }  else   {
            this.submitMessage = err.message;
            console.log(err.message);
          }
        }
      );
    }
}
