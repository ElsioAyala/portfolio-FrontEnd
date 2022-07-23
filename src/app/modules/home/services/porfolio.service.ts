import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  constructor(private httpClient: HttpClient) { }


  getFullData():Observable<any> {
    return this.httpClient.get('./assets/data.json')
    .pipe(
      catchError(() => of([]))
    )
  }
  
  get experience(){
    return this.getFullData()
    .pipe(
      map(response => response.experience)
    )
  }
  get profile(){
    return this.getFullData()
    .pipe(
      map(response => response.profile)
    )
  }
}
