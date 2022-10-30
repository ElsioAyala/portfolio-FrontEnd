import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private URL = environment.api;

  constructor(private httpClient: HttpClient) { }

  /******** Get Contacts ******* */
  getContacts(): Observable<any> {
    return this.httpClient.get(`${this.URL}/public/contact`);
  }

  /******** update ******* */
  updateContact(data: any): Observable<any> {
    return this.httpClient.put(`${this.URL}/contact/`, data);
  }

  /******** Reload ******* */
  private _reloadContacts$ = new BehaviorSubject<any>(null);
  reloadContacts$ = this._reloadContacts$.asObservable();

  reloadContacts(): void {
    this.httpClient
      .get(`${this.URL}/public/contact`)
      .subscribe((response) => this._reloadContacts$.next(response));
  }
}
