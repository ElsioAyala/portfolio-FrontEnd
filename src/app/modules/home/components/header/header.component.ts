import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { ThemeService } from '@shared/services/theme.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isDark:boolean = (localStorage.getItem("active-dark")) === "true";
  isLogged:boolean = true;
  /*isLogged$!:Observable<boolean>;*/

  constructor(private themeService:ThemeService, private authService:AuthService) { }

  ngOnInit(): void {
    if (this.isDark) { document.body.classList.add("active-dark");}
    this.authService.isLogged.subscribe(res => this.isLogged = res);
    /*this.isLogged$ = this.authService.isLogged
    this.isLogged$.subscribe((res) => this.isLogged = res);*/
  }
 
  btnSwitch(){
    document.body.classList.toggle("active-dark");
    this.isDark = !this.isDark;
    this.themeService.setIsDark(this.isDark);

    //Localstorage
    if(document.body.classList.contains("active-dark")){
      localStorage.setItem("active-dark", "true");
    }else{   
      localStorage.setItem("active-dark", "false");
    }
  }
  logout(){
    this.authService.logout();
  }

}
