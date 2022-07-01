import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDark: boolean = true/*(localStorage.getItem("active-dark")) === "true";*/
  private isDark$ = new Subject<boolean>();
  constructor() { }

  setIsDark(res:boolean):void {
    this.isDark = res;
    this.isDark$.next(this.isDark);
  }

  getIsDark():Observable<boolean> {
    return this.isDark$.asObservable();
  }

}
