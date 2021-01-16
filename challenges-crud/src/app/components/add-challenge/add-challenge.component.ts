import { Component, OnInit} from '@angular/core';
import { ChallengeService } from 'src/app/services/challenge.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Challenge } from 'src/app/interfaces/challenge';
import { CATEGORIES } from 'src/app/interfaces/categories';

@Component({
  selector: 'app-add-challenge',
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.css']
})
export class AddChallengeComponent implements OnInit {
  categories = CATEGORIES;
  levels = [1, 2, 3];

  challenge: Challenge = {
    title: "",
    description: "",
    category: "",
    level: null,
    author: "",
    public: false
  }

  submitted = false;
  
  constructor(private challengeService: ChallengeService, private authentication : AuthenticationService) { }

  ngOnInit(): void {
  }

  saveChallenge(): void {
    if(this.userLoggedIn() == true){
      const data = {
        title: this.challenge.title,
        description: this.challenge.description,
        category: this.challenge.category,
        level: this.challenge.level,
        author: this.authentication.user.username,
        public: this.challenge.public
      };
  
      this.challengeService.create(data)
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

  newChallenge(): void {
    this.submitted = false;
    this.challenge = {
      title: '',
      description: '',
      category: "",
      level: null,
      author: "",
      public: false
    };
  }

  userLoggedIn(){
    return this.authentication.getStoredUser();
  }

}
