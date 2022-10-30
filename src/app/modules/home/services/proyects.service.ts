import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectsService {
  private URL = environment.api;


  constructor(private httpClient: HttpClient) { }
  

  /******** Save ******* */
  saveProject(data: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/project/`, data);
  }

   /******** Reload ******* */
   private _reloadProjects$ = new BehaviorSubject<any>(null);
   reloadProjects$ = this._reloadProjects$.asObservable();
 
   reloadProjects(): void {
     this.httpClient
       .get(`${this.URL}/project/`)
       .subscribe((response) => this._reloadProjects$.next(response));
   }

   /******** Delete ******* */
   deleteProject(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/project/` + id);
  }

  /********* Edit *********** */
  private _idData$ = new BehaviorSubject(0);
  idData$ = this._idData$.asObservable();

  setdataId(id: number) {
    this._idData$.next(id);
  }

  
   /******** Get Skill ******* */
   getProject(id: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/project/` + id);
  }

  /******** update ******* */
  updateProject(data: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/project/`, data);
  }

}
