import { Component, EventEmitter, OnInit , Output} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user'
import * as hash from 'hash.js';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  user : User = {
    id: 0,
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  };

  submitted = false;

  @Output() login = new EventEmitter<boolean>();

  constructor(private userService : UserService) {}

  ngOnInit(): void {
  }

  saveUser(): void {
    const data = {
      username: this.user.username,
      password: hash.sha256().update(this.user.password).digest('hex'),
      firstname: this.user.firstname,
      lastname: this.user.lastname
    };

    this.userService.getThisUser(data.username)
      .subscribe(
        response => {
          console.log(response);
          if(response.length == 0){
            this.createUser(data);  
          }
          else {
            let message = "Oops! This username already exists."
            console.log(message);
            return message;
          }
        }
      );
  }

  createUser(data){
     this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
     });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      id: 0,
      username: '',
      password: '',
      firstname: '',
      lastname: ''
    };
  }

  toLogin(){
    this.login.emit(true);
  }

}
