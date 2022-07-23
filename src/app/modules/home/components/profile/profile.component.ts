import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@shared/services/theme.service';
import { Observable } from 'rxjs';
import { PorfolioService } from '@modules/home/services/porfolio.service';
import { Profile } from '@core/models/profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isDark:boolean = (localStorage.getItem("active-dark")) === "true";
  isDark$: Observable<boolean> = new Observable;

  data:Profile = {photo:"", cover:"",name: "",stack:"", contacts:[]};
  data$:Observable<Profile> = new Observable
  
  constructor(private themeService: ThemeService, private porfolioService: PorfolioService) { }

  ngOnInit(): void {
    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe(res => this.isDark = res);

    this.data$ = this.porfolioService.profile
    this.data$.subscribe(res => this.data = res);
    /*this.porfolioService.profile.subscribe(res => this.data = res);*/
  }

}
