import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@shared/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  
  isDark:boolean = (localStorage.getItem("active-dark")) === "true";
  isDark$!: Observable<boolean>;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe(res => this.isDark = res);
  }

}
