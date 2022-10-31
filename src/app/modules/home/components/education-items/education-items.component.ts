import { Component, OnInit, Input } from '@angular/core';
import { Education } from '@core/models/education.interface';
import { AuthService } from '@modules/auth/services/auth.service';
import { EducationService } from '@modules/home/services/education.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-education-items',
  templateUrl: './education-items.component.html',
  styleUrls: ['./education-items.component.css'],
})
export class EducationItemsComponent implements OnInit {
  isLogged: boolean = true;
  @Input() isDark: boolean = localStorage.getItem('active-dark') === 'true';
  @Input() data!: Education;
  @Input() img: any = '';
  @Input() _id: any = '';
  constructor(
    private educationService: EducationService,
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

  //  se envia los datos del item donde se llamo al metodo edit.
  edit(id: number) {
    /*this.educationService.setdataItem(data);*/
    this.educationService.setdataId(id);
  }

  delete(id: number) {
    if (confirm('¿Desea Eliminar este Registro? 👀')) {
      this.educationService.deleteEducation(id).subscribe(
        (response) => {
          this.showSuccess(response.message);
          this.educationService.reloadEducation();
        },
        (err) => {
          this.showInfo(err.message);
        }
      );
    }
  }
}
