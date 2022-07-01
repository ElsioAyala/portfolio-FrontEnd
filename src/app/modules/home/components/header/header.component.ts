import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThemeService } from '@shared/services/theme.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isDark:boolean = (localStorage.getItem("active-dark")) === "true";

  constructor(private themeService:ThemeService) { }

  ngOnInit(): void {
    if (this.isDark) { document.body.classList.add("active-dark");}
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

}
