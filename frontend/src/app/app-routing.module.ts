import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {ChallengesComponent} from "./components/challenges/challenges.component";
import {LeaderboardComponent} from "./components/leaderboard/leaderboard.component";

const routes: Routes = [
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'challenges', component: ChallengesComponent },
  { path: 'leaderboard', component: LeaderboardComponent},
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
