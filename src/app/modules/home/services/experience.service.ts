import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private URL = environment.api;
  private _itemsFormGroup$ = new BehaviorSubject(null);
  itemsFormGroup$ = this._itemsFormGroup$.asObservable();

  constructor(private httpClient: HttpClient) {}

  setFormGroup(data: any): void {
    this._itemsFormGroup$.next(data);
  }

  /******** Save ******* */
  saveExperience(data: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/experience/`, data);
  }

  /******** Delete ******* */
  deleteExperience(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/experience/` + id);
  }

  /******** Reload ******* */
  private _reloadExperience$ = new BehaviorSubject<any>(null);
  reloadExperience$ = this._reloadExperience$.asObservable();

  reloadExperience(): void {
    this.httpClient
      .get(`${this.URL}/experience/`)
      .subscribe((response) => this._reloadExperience$.next(response));
  }

  /******** update ******* */
  updateExperience(data: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/experience/`, data);
  }

  /********* Edit *********** */
  private _idData$ = new BehaviorSubject(0);
  idData$ = this._idData$.asObservable();

  setdataId(id: number) {
    this._idData$.next(id);
  }

    /******** Get Experience ******* */
    getExperience(id: number): Observable<any> {
      return this.httpClient.get(`${this.URL}/experience/` + id);
    }
}
