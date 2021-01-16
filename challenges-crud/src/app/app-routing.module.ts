import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengesListComponent } from './components/challenges-list/challenges-list.component'
import { CompletedchallengesListComponent } from './components/completedchallenges-list/completedchallenges-list.component'
import { ActiveChallengesComponent } from './components/active-challenges/active-challenges.component'

const routes: Routes = [
  { path: '', redirectTo: 'challenges', pathMatch: 'full' }, //redirect to list of challenges
  { path: 'challenges', component: ChallengesListComponent }, //path to list of challenges
  { path: 'completedchallenges', component: CompletedchallengesListComponent }, //path to list of completed challenges
  { path: 'activechallenges', component: ActiveChallengesComponent }, //path to list of completed challenges
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
