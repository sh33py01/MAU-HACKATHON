import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import { AuthService} from "../../services/authentication/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userData = {
    username: '',
    email: '',
    password: '',
    rewritepassword:''
  };

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.signup(this.userData.email, this.userData.username, this.userData.password)
        .subscribe(
          response => {
            console.log('Signup successful:', response);
            location.reload();
          },
          error => {
            console.error('Error in signup:', error);
          }
        );
    }
  }
}
