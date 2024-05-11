import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { ChallengesComponent } from "./components/challenges/challenges.component";
import { LeaderboardComponent } from "./components/leaderboard/leaderboard.component";
import { ChallangeCreationComponent } from "./components/challange-creation/challange-creation.component";
import { GuestComponent } from "./components/guest/guest.component";
import { AuthGuard } from "./services/authentication/auth-guard.service";
import {SignupComponent} from "./components/signup/signup.component";

const routes: Routes = [
  { path: '', redirectTo: '/challenges', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'challenges', component: ChallengesComponent, canActivate: [AuthGuard] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard] },
  { path: 'challenge-creation', component:ChallangeCreationComponent, canActivate: [AuthGuard] },
  { path: 'guest', component: GuestComponent },
  { path: 'signup', component: SignupComponent }
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
