import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CardModule } from "primeng/card";
import { FloatLabelModule } from "primeng/floatlabel";
import { ChipsModule } from "primeng/chips";
import { ButtonModule } from "primeng/button";
import { FormsModule , ReactiveFormsModule} from "@angular/forms";
import { ToolbarModule } from "primeng/toolbar";
import { ChallangeHandlerComponent } from './components/challange-handler/challange-handler.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PasswordModule } from "primeng/password";
import { CategoriesComponent } from './components/categories/categories.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import {ChipModule} from "primeng/chip";
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import {ChartModule} from "primeng/chart";
import {DataViewModule} from "primeng/dataview";
import {FlexLayoutModule} from "@angular/flex-layout";

import {ChallangeCreationComponent} from "./components/challange-creation/challange-creation.component";
import {StepsModule} from "primeng/steps";
import {DialogModule} from "primeng/dialog";
import {StepperModule} from "primeng/stepper";
import {PickListModule} from "primeng/picklist";
import {ListboxModule} from "primeng/listbox";
import {PanelModule} from "primeng/panel";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FieldsetModule} from "primeng/fieldset";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SpeedDialModule} from "primeng/speeddial";
import { DynamicDialogModule} from "primeng/dynamicdialog";
import {MonacoEditorModule} from "ngx-monaco-editor-v2";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChallangeHandlerComponent,
    NavbarComponent,
    CategoriesComponent,
    ChallengesComponent,
    LeaderboardComponent,
    ChallangeHandlerComponent,
    NavbarComponent,
    CategoriesComponent,
    ChallangeCreationComponent,
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
    ChipModule,
    ChartModule,
    StepsModule,
    DialogModule,
    StepperModule,
    PickListModule,
    ReactiveFormsModule,
    ListboxModule,
    FormsModule,
    PanelModule,
    BrowserAnimationsModule,
    FieldsetModule,
    InputTextareaModule,
    SpeedDialModule,
    DynamicDialogModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
