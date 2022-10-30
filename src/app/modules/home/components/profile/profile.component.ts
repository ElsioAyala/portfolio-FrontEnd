import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '@shared/services/theme.service';
import { Observable } from 'rxjs';
import { Profile } from '@core/models/profile.interface';
import { ProfileService } from '@modules/home/services/profile.service';
import { ContactService } from '@modules/home/services/contact.service';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isLogged:boolean = true;
  @Input() data!: any;
  @Input() contacts: any;

  isDark: boolean = localStorage.getItem('active-dark') === 'true';
  isDark$: Observable<boolean> = new Observable();

  data$: Observable<Profile> = new Observable();

  constructor(
    private themeService: ThemeService,
    private profileService: ProfileService,
    private contactsService: ContactService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLogged.subscribe(res => this.isLogged = res);

    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe((res) => (this.isDark = res));
    this.profileService.reloadProfile$.subscribe((res) =>
      res !== null ? (this.data = res) : undefined
    );
    this.contactsService.reloadContacts$.subscribe((res) =>
      res !== null ? (this.contacts = res) : undefined
    );
  }
}
