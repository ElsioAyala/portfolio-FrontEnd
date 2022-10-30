import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private URL = environment.api;
  
  constructor(private httpClient: HttpClient) {}

  /******** Get Skill ******* */
  getProfile(): Observable<any> {
    return this.httpClient.get(`${this.URL}/public/profile/1`);
  }

  /******** update ******* */
  updateProfile(data: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/profile/`, data);
  }

  /******** Reload ******* */
  private _reloadProfile$ = new BehaviorSubject<any>(null);
  reloadProfile$ = this._reloadProfile$.asObservable();

  reloadProfile(): void {
    this.httpClient
      .get(`${this.URL}/public/profile/1/`)
      .subscribe((response) => this._reloadProfile$.next(response));
  }
}
