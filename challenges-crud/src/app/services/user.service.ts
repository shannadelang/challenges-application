import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

const baseUrl = 'http://localhost:8080/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {
    id: 0,
    username: '',
    password: '', //FIXME: wachtwoord niet opslaan
    firstname: '',
    lastname: ''
  }

  constructor(private http: HttpClient) {
   }

//user-database
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  //FIXME #1 en #2 met url ?id= en ?username= 
  getThisUser(username): Observable<any>{   //#1
    return this.http.get(`${baseUrl}/${username}`);
  }

  getUserByID(id): Observable<any>{   //#2
    return this.http.get(`${baseUrl}/id/${id}`);
  }

  create(data): Observable<any> {
    console.log(data);
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  createUserChallenge(data){
    console.log(data);
    return this.http.get(baseUrl+'/challenge', data);
  }

//store logged in user locally
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
