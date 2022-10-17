import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import {Observable, throwError } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenSessionInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token:any = localStorage.getItem("token");
    const currentRequest = request.clone(
      {
        setHeaders: { Authorization: `Bearer ${JSON.parse(token)}` }
      }
    );
    request = currentRequest;
    return next.handle(request).pipe(
      catchError(err => this.handleError(err))
    )
  }



  handleError(error: HttpErrorResponse){
    
    console.log(error);
    
    
    let err: {status: number, message: string} = {
      "status": error.status,
      "message": "An error ocurred retrienving data"
    }
    
  
    switch (err.status) {
      case 400:
          err.message = error.error.message
        break;
      case 401:
        err.message = "Su sesión ha excedido el tiempo límite."
        this.authService.logout();
        const modal = document.getElementById("educationModal")!
        modal.classList.toggle("show")
          document.querySelector(".modal-backdrop")?.classList.remove("modal-backdrop")
          let body = document.body
          body.classList.remove("modal-open")
          body.style.overflow = "auto"
          body.style.paddingRight = "0"
        break;
      case 500:
          err.message = "Hubo un error en el servidor, por favor contacte con el administrador."
        break;
    }
    
    return throwError(err);
  }




  


}
