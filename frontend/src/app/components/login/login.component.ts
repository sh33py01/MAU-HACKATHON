import { Component } from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, HttpClient]
})
export class LoginComponent {//implements OnInit {
  email: string | undefined;
  password: string | undefined;
  // constructor(private location: Location, private router: Router, private authService: AuthService) { }
  constructor(private authService: AuthService) {
    this.authService = authService;
  }
  loginHandler() {
    if(this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe((res) => {
        console.log(res);
      });
    }
  }

  protected readonly location = location;
}
