import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userData = {
    username: '',
    email: '',
    password: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Perform signup logic here
      console.log(this.userData);
    }
  }
}
