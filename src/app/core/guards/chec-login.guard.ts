import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChecLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  
  private isLogged:boolean = false;
  private isLogged$!: Observable<boolean>;


  canActivate(): boolean {
    this.isLogged$ = this.authService.isLogged
    this.isLogged$.subscribe(res => this.isLogged = res)
    return this.logged;
  
  }

  private get logged(): boolean {
    if(this.isLogged){
      this.router.navigate(['/']);
      return !this.isLogged;
    }else{
      return !this.isLogged;
    }
  }
  
}
