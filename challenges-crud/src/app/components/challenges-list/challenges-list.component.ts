import { Component, OnInit} from '@angular/core';
import { ChallengeService } from 'src/app/services/challenge.service'
import { CATEGORIES } from 'src/app/interfaces/categories'
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-challenges-list',
  templateUrl: './challenges-list.component.html',
  styleUrls: ['./challenges-list.component.css']
})
export class ChallengesListComponent implements OnInit {

  challenges: any;
  currentChallenge = null;
  currentIndex = -1;
  title = '';
  category = '';
  categories = CATEGORIES;

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [3, 6, 9];

  authentic = new AuthenticationService(); //FIXME: deze gebruiken of de private authentication in constructor //COMMENT: wat is het verschil/voor- en nadelen van deze en injection?

  loggedIn = this.authentic.getStoredUser();
  //FIXME: bij app-edit blijft staan na edit. Dit is niet zo bij app-add. Waarom??
  addState = false;
  editState = false;
  stepActivated = false;

  constructor(private challengeService: ChallengeService, private authentication : AuthenticationService) {
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveChallenges();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveChallenges();
  }

  ngOnInit(): void {
    this.retrieveChallenges();
  }

  retrieveChallenges(): void {
   if(this.loggedIn == true){
    this.getPublicChallenges();
   }
   else{
     this.getDefaultChallenges();
   }
   
  }

  getAllChallenges(){
    this.challengeService.getAll()
      .subscribe(
        data => {
          this.challenges = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  
  getPublicChallenges(){
    this.challengeService.getAllPublic()
    .subscribe(
      data => {
        this.challenges = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  getDefaultChallenges(){
    this.challengeService.getDefaultChallenges()
    .subscribe(
      data => {
        this.challenges = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  refreshList(): void {
    this.retrieveChallenges();
    this.currentChallenge = null;
    this.currentIndex = -1;
  }

  setSelectedChallenge(challenge, index): void {
    this.currentChallenge = challenge;
    this.currentIndex = index;
  }

  removeAllChallenges(): void {
    this.challengeService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveChallenges();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void { //FIXME: search title laat ook de niet-public challenges zien
    this.page = 1;
    this.challengeService.findByTitle(this.title)
      .subscribe(
        data => {
          this.challenges = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  searchCategory(category): void { //FIXME: check of deze ook de niet-public challenges laat zien
    this.page = 1; //pagination
    this.category = category;
    //TODO: if user is not logged in
    let filteredCategory: any=[];
    this.challengeService.findByCategory(this.category)
      .subscribe(
        data => {
          //if user is not logged in:
          for(let d of data){
            if(d.public == true){
              filteredCategory.push(d);
            }
          }
          this.challenges = filteredCategory;
          console.log(filteredCategory);
          /*else
          this.challenges = data;
          console.log(data); */
        },
        error => {
          console.log(error);
        });
  }

  searchAuthor(){ //FIXME: deze gebruik ik volgens mij niet
    if(this.loggedIn = true){
      this.challengeService.findByAuthor(this.authentication.user.username).subscribe(
        data => {
          this.challenges = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
    } else{
      console.log("user is not logged in");
    }
  }

  activateChallenge(){ //FIXME: maakt een challenge actief door create, kan niet als deze bridge als bestaat. Check voor bestaand.
    if(this.loggedIn == true){
      const data = {
        challenge_id: this.currentChallenge.id,
        user_id: this.authentic.user.id,
        active: true
      };
  
      this.challengeService.createUserChallenge(data)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
    } else{
      console.log("No user logged in!")
    }
  }

  getCategoryByName(categoryName){ //COMMENT: deze gebruik ik ook in andere components, zou dit beter een service kunnen zijn?
    for(let category of this.categories){
      if(category.name == categoryName){
        return category;
      }
    }
    console.log(this.categories[this.categories.length-1]);
    return this.categories[this.categories.length-1];
  }

  canEdit(){
    if(this.currentChallenge.author == this.authentic.user.username){
      return true;
    } else {
      return false;
    }
  }

}
