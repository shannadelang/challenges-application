import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User = {
    id: 0,
    username: '',
    password: '', //FIXME: wachtwoord niet opslaan
    firstname: '',
    lastname: ''
  }

  constructor() { }

  saveUser(user:User){
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
    JSON.parse(localStorage.getItem('user'));
  }

  removeUser(){
    localStorage.removeItem('user');
    this.user = {
      id: 0,
      username: '',
      password: '',
      firstname: '',
      lastname: ''
    }
  }

  getStoredUser(){
    this.user = JSON.parse(localStorage.getItem('user'));
    //console.log(this.user);
    if (this.user === null || this.user.id ==0){
      return false;
    } else {
      return true;
    }
  }

}
