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
import { CategoriesComponent } from './components/categories/categories.component';
import {PanelModule} from "primeng/panel";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DataViewModule} from "primeng/dataview";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PanelModule} from "primeng/panel";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FieldsetModule} from "primeng/fieldset";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SpeedDialModule} from "primeng/speeddial";


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
    FormsModule,
    ToolbarModule,
    PasswordModule,
    PanelModule,
    BrowserAnimationsModule,
    DataViewModule,
    FlexLayoutModule,
    FormsModule,
    PanelModule,
    BrowserAnimationsModule,
    FieldsetModule,
    InputTextareaModule,
    SpeedDialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
