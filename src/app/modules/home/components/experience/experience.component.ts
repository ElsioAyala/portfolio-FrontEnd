import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@shared/services/theme.service';
import { ExperienceService } from '@modules/home/services/experience.service';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  isLogged:boolean = true;
  @Input() data: any;

  isDark: boolean = localStorage.getItem('active-dark') === 'true';
  isDark$!: Observable<boolean>;
  constructor(
    public themeService: ThemeService,
    private experienceService: ExperienceService,
    private authService: AuthService

  ) {}

  ngOnInit(): void {
    this.authService.isLogged.subscribe(res => this.isLogged = res);
    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe((res) => (this.isDark = res)); 

    this.experienceService.reloadExperience$.subscribe((response) => {
      if (response) this.data = response;
    });
  }
}
