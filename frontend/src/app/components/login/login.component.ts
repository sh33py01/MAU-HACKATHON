import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
// import { AuthService } from "../../services/auth.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {//implements OnInit {
  username: string | undefined;
  password: string | undefined;
  // constructor(private location: Location, private router: Router, private authService: AuthService) { }

  // ngOnInit() {
  //   if (this.authService.isLoggedIn) {
  //     this.router.navigate(['dashboard']);
  //   }
  // }
  //
  // GoogleAuth() {
  //   this.authService.GoogleAuth();
  // }
}
