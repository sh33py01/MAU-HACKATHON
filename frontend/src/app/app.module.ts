import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {CardModule} from "primeng/card";
import {FloatLabelModule} from "primeng/floatlabel";
import {ChipsModule} from "primeng/chips";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {ToolbarModule} from "primeng/toolbar";
import { ChallangeHandlerComponent } from './components/challange-handler/challange-handler.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {PasswordModule} from "primeng/password";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChallangeHandlerComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    FloatLabelModule,
    ChipsModule,
    ButtonModule,
    FormsModule,
    ToolbarModule,
    PasswordModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
