import { Component } from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";
import {HttpClient} from "@angular/common/http";
import {ChallangeHandlerComponent} from "../challange-handler/challange-handler.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {SignupComponent} from "../signup/signup.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, HttpClient, DialogService]
})
export class LoginComponent {//implements OnInit {
  email: string | undefined;
  password: string | undefined;
  dialogRef: DynamicDialogRef | undefined;
  // constructor(private location: Location, private router: Router, private authService: AuthService) { }
  constructor(private authService: AuthService, public dialogService: DialogService) {
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

  openSignUpDialog() {
    this.dialogRef  = this.dialogService.open(SignupComponent, {
      header: 'Sign Up',
    });
  }
}
