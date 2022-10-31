import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { ExperienceService } from '@modules/home/services/experience.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-items.component.html',
  styleUrls: ['./experience-items.component.css'],
})
export class ExperienceItemsComponent implements OnInit {
  isLogged:boolean = true;
  @Input() isDark: boolean = localStorage.getItem('active-dark') === 'true';
  @Input() data: any = {};
  @Input() img: any = '';
  @Input() _id: any = '';

  constructor(
    private experienceService: ExperienceService,
    private toast: NgToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLogged.subscribe(res => this.isLogged = res);
  }

  showInfo(message: string) {
    this.toast.info({ detail: 'INFO', summary: message, sticky: true });
  }
  showSuccess(message: string) {
    this.toast.success({ detail: 'SUCCESS', summary: message, duration: 5000 });
  }

  edit(id: number) {
    this.experienceService.setdataId(id);
  }

  delete(id: number) {
    if (confirm('¿Desea Eliminar este Registro? 👀')) {
      this.experienceService.deleteExperience(id).subscribe(
        (response) => {
          this.showSuccess(response.message);
          this.experienceService.reloadExperience();
        },
        (err) => {
          this.showInfo(err.message);
        }
      );
    }
  }
}
