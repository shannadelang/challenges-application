import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/user';
const baseTwo = 'http://localhost:8080/api/userchallenge'

@Injectable({
  providedIn: 'root'
})
export class UserChallengesService {

  constructor(private http: HttpClient){}

  getActiveChallenges(id): Observable<any> {
    return this.http.get(`${baseUrl}/activechallenges/${id}`);
  }

  getCompletedChallenges(id): Observable<any> {
    return this.http.get(`${baseUrl}/completedchallenges/${id}`);
  }

  getItem(userId, challengeId){
    return this.http.get(`${baseTwo}/?user=${userId}&challenge=${challengeId}`);
  }

  update(userId, challengeId, data){
    return this.http.put(`${baseTwo}/?user=${userId}&challenge=${challengeId}`, data);
  }
}
