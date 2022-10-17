import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  private URL = environment.api;
  private exper:any

  constructor(private httpClient: HttpClient) { }


  /*getFullData():Observable<any> {
    return this.httpClient.get('./assets/data.json')
    .pipe(
      catchError(() => of([]))
    )
  }*/

  getFullData():Observable<any> {
    return this.httpClient.get(`${this.URL}/public/profile/1`)
    .pipe(
      /*map((response:any) => {
        
        const {experiences} = response;
        this.exper = experiences;
        console.log("resdsdsdsdsdsdsdsd", experiences)
        return response;
      }),*/
      catchError(() => of([]))
    )
  }

  
  
  get experience(){
    return this.exper;
    /*.pipe(
      map(response => response.experience)
    )*/
  }
  get profile(){
    return this.getFullData()
    .pipe(
      map(response => response.profile)
    )
  }
}
