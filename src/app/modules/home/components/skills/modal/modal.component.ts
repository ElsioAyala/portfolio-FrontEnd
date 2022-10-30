import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SkillsService } from '@modules/home/services/skills.service';
import { ThemeService } from '@shared/services/theme.service';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  isDark:boolean = (localStorage.getItem("active-dark")) === "true";
  isDark$!: Observable<boolean>;

  skillsModalForm: FormGroup = new FormGroup({});
  percentage: String = '50';
  idEdit: number = 0;

  constructor(
    private themeService: ThemeService,
    public skillsService: SkillsService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {

    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe( res => this.isDark = res);

    this.skillsModalForm = new FormGroup({
      id_ski: new FormControl(),
      technology: new FormControl('', [Validators.required]),
      progress: new FormControl('', [Validators.required]),
      profile: new FormControl({ id_pro: 1 }),
    });

    this.skillsService.idData$.subscribe((idData) => {
      this.idEdit = idData;
      if (idData !== 0) {
        this.skillsService.getSkill(idData).subscribe((res) => {
          this.skillsModalForm.patchValue(res);
        });
      } else {
        this.skillsModalForm.controls['technology'].reset();
        this.skillsModalForm.controls['progress'].reset();
        this.skillsModalForm.controls['id_ski'].reset();
      }
    });
  }

  showInfo(message: string) {
    this.toast.info({ detail: 'INFO', summary: message, sticky: true });
  }
  showSuccess(message: string) {
    this.toast.success({ detail: 'SUCCESS', summary: message, duration: 5000 });
  }

  saveSkills() {
    const body = this.skillsModalForm.value;
    this.skillsService.saveSkills(body).subscribe(
      (response) => {
        ($('#skillsModal') as any).modal('hide');
        this.showSuccess(response.message);
        this.skillsService.reloadSkills();
      },
      (err) => {
        this.showInfo(err.message);
      }
    );
  }

  delate() {}

  editSkill() {
    const body = this.skillsModalForm.value;
    this.skillsService.updateSkill(body).subscribe(
      (response) => {
        ($('#skillsModal') as any).modal('hide');
        this.showSuccess(response.message);
        this.skillsService.reloadSkills();
      },
      (err) => {
        this.showInfo(err.message);
      }
    );
  }

  saveSkillss() {}
}
