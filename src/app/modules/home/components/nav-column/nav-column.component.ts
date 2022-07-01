import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@shared/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-column',
  templateUrl: './nav-column.component.html',
  styleUrls: ['./nav-column.component.css']
})
export class NavColumnComponent implements OnInit {

  isDark:boolean = (localStorage.getItem("active-dark")) === "true";
  isDark$!: Observable<boolean>;
  
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe(res => this.isDark = res)
  }

}
