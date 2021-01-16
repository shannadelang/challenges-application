import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { UserChallengesService } from 'src/app/services/user-challenges.service';
import { ChallengeService } from 'src/app/services/challenge.service';
import { CATEGORIES } from 'src/app/interfaces/categories';

@Component({
  selector: 'app-completedchallenges-list',
  templateUrl: './completedchallenges-list.component.html',
  styleUrls: ['./completedchallenges-list.component.css']
})
export class CompletedchallengesListComponent implements OnInit {
  loggedIn;

  bridgeData: any;
  challengesIds = [];
  challenges = [];
  currentChallenge = null;
  currentIndex = -1;
  categories = CATEGORIES;
  stepCompleted = false;
  score = 0;
  hero;
  heroImg;

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [3, 6, 9];

  constructor(private userChallenges: UserChallengesService, private userService: UserService, private challengeService: ChallengeService) { 
    this.loggedIn = this.userService.getStoredUser();
  }

  //pagination
  handlePageChange(event): void {
    this.page = event;
    this.getAllCompleted();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllCompleted();
  }

  //refresh
  refreshList(): void {
    this.getAllCompleted();
    this.currentChallenge = null;
    this.currentIndex = -1;
  }

  //selection details
  setSelectedChallenge(challenge, index): void {
    this.currentChallenge = challenge;
    this.currentIndex = index;
  }

  ngOnInit(): void {
    this.getAllCompleted();
  }

  getAllCompleted(){
    this.userChallenges.getCompletedChallenges(this.userService.user.id)
      .subscribe(
        data => {
          this.bridgeData = data;
          console.log(data);
          this.getChallengesContent();
          this.getHero();
        },
        error => {
          console.log(error);
        }
      );
  }

  getChallengesContent(){
    if(this.bridgeData.length !== 0 && this.challenges.length == 0){
      this.bridgeData.forEach(item => {
        this.challengeService.get(item.challenge_id)
        .subscribe(
          data => {
            this.challenges.push(data);
            this.score += data.level;
            this.getHero();
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

  getHero(){
    if(this.score < 8){ //0 - 7
      this.hero = "Concerned Citizen";
      this.heroImg = "man.svg";
    }
    else if(this.score > 7 && this.score < 16){ //8 - 15
      this.hero = "Climate advocate";
      this.heroImg = "woman.svg";
    }
    else{
      this.hero = "Eco-warrior";
      this.heroImg = "spartan.svg";
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

  userLoggedIn(){
    return this.userService.getStoredUser;
  }

}
