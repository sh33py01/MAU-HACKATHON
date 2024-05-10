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
import { ChallangeHandlerComponent } from './components/challange-handler/challange-handler.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChallangeHandlerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    FloatLabelModule,
    ChipsModule,
    ButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
