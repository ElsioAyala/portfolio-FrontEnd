import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserResponse } from '@core/models/user.interface';
import { Observable, map, BehaviorSubject, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.api;

  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());

  constructor(private http: HttpClient, private router: Router) { }



  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(credentials: User):Observable<UserResponse | void> { 
    return this.http.post<UserResponse>(`${this.URL}/auth/login`, credentials)
    .pipe(
      map((response: UserResponse) => {
        this.saveToken(response.token);
        this.loggedIn.next(true);
        return response;
      }),
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

  // Si el Server devuelve un esdtado 401 ejecuta el metodo Unauthorized.
  private Unauthorized(){
    this.logout();
  }


  private saveToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }
}
