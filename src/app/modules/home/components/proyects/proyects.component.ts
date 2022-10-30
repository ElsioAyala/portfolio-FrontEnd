import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { ProyectsService } from '@modules/home/services/proyects.service';
import { ThemeService } from '@shared/services/theme.service';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css'],
})
export class ProyectsComponent implements OnInit {
  isLogged: boolean = true;

  @Input() data: any;

  isDark: boolean = localStorage.getItem('active-dark') === 'true';
  isDark$!: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private proyectsService: ProyectsService,
    private toast: NgToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLogged.subscribe(res => this.isLogged = res);
    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe((res) => (this.isDark = res));

    this.proyectsService.reloadProjects$.subscribe((res) => (this.data = res));
  }

  showInfo(message: string) {
    this.toast.info({ detail: 'INFO', summary: message, sticky: true });
  }
  showSuccess(message: string) {
    this.toast.success({ detail: 'SUCCESS', summary: message, duration: 5000 });
  }

  edit(id: number) {
    this.proyectsService.setdataId(id);
  }

  delete(id: number) {
    if (confirm('¿Desea Eliminar este Registro? 👀')) {
      this.proyectsService.deleteProject(id).subscribe(
        (response) => {
          this.showSuccess(response.message);
          this.proyectsService.reloadProjects();
        },
        (err) => {
          this.showInfo(err.message);
        }
      );
    }
  }

  add() {
    this.proyectsService.setdataId(0);
  }
}
