import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../shared/item'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ItemCreateComponent } from '../item-create/item-create.component';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  // Define API
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch employees list
  getItems(): Observable<Item> {
    let list = this.http.get<Item>(this.apiURL + '/employees')
    .pipe(
      retry(1),
      catchError(this.handleError)
    ); 
    console.log(list);
    return list;
  }

  // Error handling 
  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
