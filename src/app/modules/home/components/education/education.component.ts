import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@shared/services/theme.service';
import { Education } from '@core/models/education.interface';
import { EducationService } from '@modules/home/services/education.service';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  isLogged: boolean = true;
  @Input() data!: Array<Education>;

  isDark: boolean = localStorage.getItem('active-dark') === 'true';
  isDark$!: Observable<boolean>;
  constructor(
    private themeService: ThemeService,
    private educationService: EducationService,
    private authService: AuthService

  ) {}

  ngOnInit(): void {
    this.authService.isLogged.subscribe(res => this.isLogged = res);
    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe((res) => (this.isDark = res));

    this.educationService.reloadEducation$.subscribe((response) => {
      if (response) {
        this.data = response;
      }
    });
  }
}
