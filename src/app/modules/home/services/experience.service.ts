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

  /********* Edit *********** */
  private _itemData$ = new BehaviorSubject(null);
  itemData$ = this._itemData$.asObservable();

  setdataItem(data: any) {
    this._itemData$.next(data);
  }

  /******** update ******* */
  updateExperience(data: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/experience/`, data);
  }
}
