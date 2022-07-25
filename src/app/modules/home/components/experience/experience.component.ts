import { Component, OnInit } from '@angular/core';
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

  isDark:boolean = (localStorage.getItem("active-dark")) === "true";
  isDark$!: Observable<boolean>;
  constructor(public themeService:ThemeService, private porfolioService:PorfolioService, private newExperienceService: NewExperienceService) { } 

  data:Experience = {_id:"", label: "", list:[]};

  ngOnInit(): void {
    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe( res => this.isDark = res);
    this.porfolioService.experience.subscribe(res => this.data = res);
    /*this.porfolioService.getFullData().subscribe(res => this.data = res.experience);*/

  }
  addExperience(): void {
    this.newExperienceService.ID = this.data._id
  }
}