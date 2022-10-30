import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { ProfileService } from '@modules/home/services/profile.service';
import { ThemeService } from '@shared/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  isLogged: boolean = true;

  @Input() cover: string = '';

  isDark: boolean = localStorage.getItem('active-dark') === 'true';
  isDark$!: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLogged.subscribe((res) => (this.isLogged = res));

    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe((res) => (this.isDark = res));
    this.profileService.reloadProfile$.subscribe((res) =>
      res !== null ? (this.cover = res.cover) : undefined
    );
  }
}
