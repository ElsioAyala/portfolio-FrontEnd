import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());

  constructor(private http: HttpClient, private router: Router) { }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login():Observable<any> { //simulacion de login
    return this.http.get('./assets/login.json')
    .pipe(
      map((response) => {
        this.saveToken(response);
        this.loggedIn.next(true);
        return response;
      })
    )
  }
  logout():void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/','login']);
  }
  private checkToken():any{
    //verificar si el token no expiro
    // en la API se coloca el tiempo en el que el token expira.
    return localStorage.getItem("token");

  }
  private saveToken(response:any) {
    localStorage.setItem('token', response.token);
  }
  private handError() {}
}
