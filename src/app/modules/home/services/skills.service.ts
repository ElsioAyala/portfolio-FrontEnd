import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private URL = environment.api;

  constructor(private httpClient: HttpClient) { }

  /******** Save ******* */
  saveSkills(data: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/skills/`, data);
  }

   /******** Reload ******* */
   private _reloadSkills$ = new BehaviorSubject<any>(null);
   reloadSkills$ = this._reloadSkills$.asObservable();
 
   reloadSkills(): void {
     this.httpClient
       .get(`${this.URL}/skills/`)
       .subscribe((response) => this._reloadSkills$.next(response));
   }

   /******** Delete ******* */
   deleteSkills(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/skills/` + id);
  }

  /********* Edit *********** */
  private _idData$ = new BehaviorSubject(0);
  idData$ = this._idData$.asObservable();

  setdataId(id: number) {
    this._idData$.next(id);
  }

   /******** Get Skill ******* */
  getSkill(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/skills/` + id);
  }

  /******** update ******* */
  updateSkill(data: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/skills/`, data);
  }

}
