import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from 'src/app/services/challenge.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Challenge } from 'src/app/interfaces/challenge';
import { CATEGORIES } from 'src/app/interfaces/categories';

@Component({
  selector: 'app-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.css']
})
export class ChallengeEditComponent implements OnInit {
  @Input() currentChallenge;

  challenge: Challenge = { //FIXME: binding met html niet goed (aanpassingen lijken ge-update, maar is niet zo)
    title: "",
    description: "",
    category: "",
    level: null,
    author: "",
    public: false
  };
  categories = CATEGORIES;
  levels = [1, 2, 3];

  message = '';
  edited = false;

  constructor(
      private challengeService: ChallengeService,  
      private authentication : AuthenticationService,
      private route: ActivatedRoute,
      private router: Router) { }

      ngOnInit(): void {
        this.message = '';
        this.getChallenge(this.currentChallenge.id);
      }
    
      getChallenge(id): void { 
        this.challengeService.get(id)
          .subscribe(
            data => { //FIXME: dit defineer ik wel maar gebruik ik volgens mij niet goed. Ook binding met html niet goed (aanpassingen lijken ge-update, maar is niet zo).
              console.log(data, "data");
              this.challenge.title = data.title;
              this.challenge.description = data.description;
              this.challenge.category = data.category;
              this.challenge.level = data.level;
              this.challenge.author = data.author;
              this.challenge.public = data.public;
            },
            error => {
              console.log(error);
            });
      }

      updatePublic(status): void {
            this.currentChallenge.public = status;
            this.updateChallenge();
      }

      updateChallenge(): void {
        this.challengeService.update(this.currentChallenge.id, this.currentChallenge)
          .subscribe(
            response => {
              console.log(response);
              this.message = 'The Challenge was updated successfully!';
            },
            error => {
              console.log(error);
            });
      }

}
