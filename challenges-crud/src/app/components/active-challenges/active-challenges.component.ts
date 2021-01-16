import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserChallengesService } from 'src/app/services/user-challenges.service';
import { ChallengeService } from 'src/app/services/challenge.service';
import { CATEGORIES } from 'src/app/interfaces/categories';

@Component({
  selector: 'app-active-challenges',
  templateUrl: './active-challenges.component.html',
  styleUrls: ['./active-challenges.component.css']
})
export class ActiveChallengesComponent implements OnInit {
  loggedIn = new AuthenticationService().getStoredUser();

  bridgeData: any;
  challengesIds = [];
  challenges = [];
  currentChallenge = null;
  currentIndex = -1;
  title = '';
  category = '';
  categories = CATEGORIES;
  stepCompleted = false;

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [3, 6, 9];

  constructor(private userChallenges: UserChallengesService, private authentication: AuthenticationService, private challengeService: ChallengeService) { }

  //pagination
  handlePageChange(event): void {
    this.page = event;
    this.getAllActive();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllActive();
  }

  //refresh
  refreshList(): void {
    this.getAllActive();
    this.currentChallenge = null;
    this.currentIndex = -1;
  }

  //selection details
  setSelectedChallenge(challenge, index): void {
    this.currentChallenge = challenge;
    this.currentIndex = index;
  }

  ngOnInit(): void {
    this.getAllActive();
  }

  getAllActive(){
    this.userChallenges.getActiveChallenges(this.authentication.user.id)
      .subscribe(
        data => {
          this.bridgeData = data;
          console.log(data);
          //this.getChallengeIds();
          this.getChallengesContent();
        },
        error => {
          console.log(error);
        }
      );
  }

  getChallengesContent(){
    if(this.bridgeData.length !== 0 && this.challenges.length == 0){ //or set this.challenges.lenght 0 at beginning of method?
      this.bridgeData.forEach(item => {
        this.challengeService.get(item.challenge_id)
        .subscribe(
          data => {
            this.challenges.push(data);
          },
          error => {
            console.log(error);
          }
        );
      });
      console.log(this.challenges);
    }
    else{
      console.log("bridgeData is empty");
    }
  }

  getCategoryByName(categoryName){
    for(let category of this.categories){
      if(category.name == categoryName){
        return category;
      }
    }
    console.log(this.categories[this.categories.length-1]);
    return this.categories[this.categories.length-1];
  }

  updateChallenge(state): void {
    console.log(this.currentChallenge);
    var userChallenge;
    this.userChallenges.getItem(this.authentication.user.id, this.currentChallenge.id)
      .subscribe(
        data => {
          userChallenge = data;
          console.log(userChallenge);
          this.updateUserChallengeItem(state);
        },
        error => {
          console.log(error);
        });
     
  }

  updateUserChallengeItem(state){
    const data = {
      challenge_id: this.currentChallenge.id,
      user_id: this.authentication.user.id,
      active: false,
      completed: state
    };

    this.userChallenges.update(this.authentication.user.id, this.currentChallenge.id, data)
      .subscribe(
        response => {
          this.currentChallenge.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
