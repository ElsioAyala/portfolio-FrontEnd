import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  

  private URL = environment.api;

  private _itemsFormGroup$ = new BehaviorSubject(null);
  itemsFormGroup$ = this._itemsFormGroup$.asObservable();
  private _itemData$ = new BehaviorSubject(null);
  itemData$ = this._itemData$.asObservable();

  
  constructor(private httpClient: HttpClient, private authService: AuthService) { }


  /** New Education */
  setFormGroup(data: any):void{
    this._itemsFormGroup$.next(data);
  }

  

  saveEducation(data: any):Observable<any> {
    return this.httpClient.post(`${this.URL}/education/`, data)
    .pipe(
      /*catchError(err => this.handleError(err))*/
    )
    /*.pipe(
      catchError( err => {
        let message = `Ha ocurrido un Error`
        switch (err.status) {
          case 401:
              this.authService.logout();
              message = "Su sesión ha excedido el tiempo límite. Por favor, entre de nuevo."
              document.querySelector(".modal-backdrop")?.classList.remove("modal-backdrop")
              let body = document.body
              body.classList.remove("modal-open")
              body.style.overflow = "auto"
              body.style.paddingRight = "0"
            break;
          case 500:
              message = "Hubo un error en el servidor, por favor contacte con el administrador."
            break;
          default:
            break;
        }
        return throwError(message);
      })
    )*/
  }

  /** Edit Education */
  setdataItem(data:any){
    this._itemData$.next(data);
  }

  updateEducation(data:any):Observable<any> {
    return this.httpClient.put(`${this.URL}/education/`, data)
  }

  /** Delete Education */
  deleteEducation(id:number):Observable<any> {
    return this.httpClient.delete(`${this.URL}/education/`+id)
  }

  /**Reload Education */
  private _reloadEducation$ = new BehaviorSubject<any>(null)
  reloadEducation$ = this._reloadEducation$.asObservable();

  reloadEducation():void{
    this.httpClient.get(`${this.URL}/education/`)
    .subscribe(response => this._reloadEducation$.next(response))
  }







  
}




