import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@shared/services/theme.service';
import { PorfolioService } from '@modules/home/services/porfolio.service';
import { Experience } from '@core/models/experience.interface';
import { NewExperienceService } from '@modules/home/services/new-experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() data:any; //Arrat de Experiencias
  
  isDark:boolean = (localStorage.getItem("active-dark")) === "true";
  isDark$!: Observable<boolean>;
  constructor(public themeService:ThemeService, private porfolioService:PorfolioService, private newExperienceService: NewExperienceService) { } 

  /*data:Experience = {_id:"", label: "", list:[]};*/

  ngOnInit(): void {
    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe( res => this.isDark = res);
    /*this.porfolioService.experience.subscribe(res => /*this.data = res*/ /*console.log("REspuestaaaaaaaaaa -> ", res));*/
    /*this.porfolioService.getFullData().subscribe(res => this.data = res.experience);*/
    console.log("REspuestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", this.porfolioService.experience)

  }
  addExperience(): void {
    /*this.newExperienceService.ID = this.data._id*/
  }
}