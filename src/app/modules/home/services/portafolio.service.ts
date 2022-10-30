import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  private URL = environment.api;

  constructor(private httpClient: HttpClient) { }
  
  getData():Observable<any> {
    return this.httpClient.get(`${this.URL}/public/profile/1`)
    .pipe(
      map((response:any) => {
        return response;
      }),
      catchError(() => of([]))
    )
  }
  
}
