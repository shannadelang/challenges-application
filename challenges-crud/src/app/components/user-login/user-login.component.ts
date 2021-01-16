import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/interfaces/user';
import * as hash from 'hash.js';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user: User = {
    id: 0,
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  }

  @Output() registration = new EventEmitter<boolean>();
  loggedIn = false; //FIXME: toevoegen dat bij refresh deze afhangelijk is van of 'user' aanwezig is in localStorage
  message;

  constructor(private userService : UserService, private authentication:AuthenticationService) { 
    this.getStoredUser();
  }

  ngOnInit(): void {
  }

  toRegistering(){
    this.registration.emit(true);
  }

  logIn(){
    this.message = "";
    const data = {
      username: this.user.username,
      password: hash.sha256().update(this.user.password).digest('hex')
    };

    this.userService.getThisUser(data.username)
      .subscribe(
        response => {
          let message;
          console.log(response);
          if(response.length == 0){
            this.message = "Oops! This username does not exist. Try again."
            console.log(this.message); 
          }
          else { //FIXME: request api aanpassen met username en password parameters.
            message = "user(s) found";
            console.log(data.password, "input password");
            for(let user of response){
              if(user.username == data.username){
                console.log("username correct")
                if(user.password == data.password){
                  console.log("passwords match");
                  this.saveUser(response[0]);
                  location.reload();
                }
                else{
                  this.message = "Wrong password. Try again."
                }
              } else {
                this.message = "Oops! This username does not exist. Try again."
              }
            }
          }
        }
      );
  }

  saveUser(userData){
    this.authentication.saveUser(userData);
    this.loggedIn = true;
  }

  getStoredUser(){
    this.loggedIn = this.authentication.getStoredUser();
    if(this.loggedIn == true){
      this.user = this.authentication.user;
    }
  }

  removeStoredUser(){
    this.authentication.removeUser();
    this.user = this.authentication.user;
    this.loggedIn = false;
    location.reload();
  }

}
