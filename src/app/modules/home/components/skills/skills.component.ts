import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { SkillsService } from '@modules/home/services/skills.service';
import { ThemeService } from '@shared/services/theme.service';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  isLogged:boolean = true;
  isDark: boolean = localStorage.getItem('active-dark') === 'true';
  isDark$!: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private skillsService: SkillsService,
    private toast: NgToastService,
    private authService: AuthService
  ) {}

  @Input() data: any;


  ngOnInit(): void {
    this.authService.isLogged.subscribe(res => this.isLogged = res);
    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe((res) => (this.isDark = res));
    this.skillsService.reloadSkills$.subscribe((res) => (this.data = res));
  }

  showInfo(message: string) { this.toast.info({ detail: 'INFO', summary: message, sticky: true }); }
  showSuccess(message: string) { this.toast.success({ detail: 'SUCCESS', summary: message, duration: 5000 }); }

  edit(id: number) {
    this.skillsService.setdataId(id)
  }

  delete(id: number) {
    if (confirm('¿Desea Eliminar este Registro? 👀')) {
      this.skillsService.deleteSkills(id).subscribe(
        (response) => {
          this.showSuccess(response.message);
          this.skillsService.reloadSkills();
        },
        (err) => {
          this.showInfo(err.message);
        }
      );
    }
  }

  add(){
    this.skillsService.setdataId(0)
  }

}
