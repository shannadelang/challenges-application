import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/challenges';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getAllPublic(): Observable<any> {
    return this.http.get(`${baseUrl}/public`);
  }

  getDefaultChallenges(): Observable<any> {
    return this.http.get(`${baseUrl}/default`); 
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
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

  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}/title/?title=${title}`);
  }

  findByCategory(category): Observable<any> {
    return this.http.get(`${baseUrl}?category=${category}`);
  }

  findByAuthor(userName): Observable<any> {
    return this.http.get(`${baseUrl}/author?author=${userName}`);
  }

  createUserChallenge(data){
    console.log(data);
    return this.http.post('http://localhost:8080/api/user/challenge', data);
  }
}
