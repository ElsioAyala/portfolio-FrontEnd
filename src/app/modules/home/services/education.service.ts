import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private URL = environment.api;

  private _itemsFormGroup$ = new BehaviorSubject(null);
  itemsFormGroup$ = this._itemsFormGroup$.asObservable();
  
  private _itemData$ = new BehaviorSubject(null);
  itemData$ = this._itemData$.asObservable();

  constructor(private httpClient: HttpClient) {}

  /** New Education */
  setFormGroup(data: any): void {
    this._itemsFormGroup$.next(data);
  }

  saveEducation(data: any): Observable<any> {
    return this.httpClient.post(`${this.URL}/education/`, data);
  }

  /** Edit Education */
  setdataItem(data: any) {
    this._itemData$.next(data);
  }

  /** Update Uducation */
  updateEducation(data: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/education/`, data);
  }

  /** Delete Education */
  deleteEducation(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/education/` + id);
  }

  /**Reload Education */
  private _reloadEducation$ = new BehaviorSubject<any>(null);
  reloadEducation$ = this._reloadEducation$.asObservable();

  reloadEducation(): void {
    this.httpClient
      .get(`${this.URL}/education/`)
      .subscribe((response) => this._reloadEducation$.next(response));
  }

  /********* Edit *********** */
  private _idData$ = new BehaviorSubject(0);
  idData$ = this._idData$.asObservable();

  setdataId(id: number) {
    this._idData$.next(id);
  }

    /******** Get Education ******* */
    getEducation(id: number): Observable<any> {
      return this.httpClient.get(`${this.URL}/education/` + id);
    }
}
