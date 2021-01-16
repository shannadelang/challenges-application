import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChallengesListComponent } from './components/challenges-list/challenges-list.component';
import { CompletedchallengesListComponent } from './components/completedchallenges-list/completedchallenges-list.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AddChallengeComponent } from './components/add-challenge/add-challenge.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActiveChallengesComponent } from './components/active-challenges/active-challenges.component';
import { ChallengeEditComponent } from './components/challenge-edit/challenge-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengesListComponent,
    CompletedchallengesListComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    AddChallengeComponent,
    ActiveChallengesComponent,
    ChallengeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
