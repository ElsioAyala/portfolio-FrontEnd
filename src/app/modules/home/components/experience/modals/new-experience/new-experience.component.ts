import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ExperienceService } from '@modules/home/services/experience.service';
import { ThemeService } from '@shared/services/theme.service';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-experience',
  templateUrl: './new-experience.component.html',
  styleUrls: ['./new-experience.component.css'],
})
export class NewExperienceComponent implements OnInit {
  isDark: boolean = localStorage.getItem('active-dark') === 'true';
  isDark$!: Observable<boolean>;
  newExperience: FormGroup = new FormGroup({});
  formItemsGroup$ = this.experienceService.itemsFormGroup$;
  imageUrl: string = '';
  base64!: string;
  fileSelected!: Blob;
  

  constructor(
    private experienceService: ExperienceService,
    private sant: DomSanitizer,
    private toast: NgToastService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.isDark$ = this.themeService.getIsDark();
    this.isDark$.subscribe((res) => (this.isDark = res));

    this.newExperience = new FormGroup({
      item: new FormArray(this.initItemsGroup()),
    });
  }

  initItemsGroup(): any {
    const items = [
      new FormGroup({
        key: new FormControl('Puesto'),
        value: new FormControl('',[Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Empresa/Institución'),
        value: new FormControl('',[Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Jornada Laboral'),
        value: new FormControl('',[Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Período (Años)'),
        value: new FormControl('', [Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Lugar/Ciudad/Provincia'),
        value: new FormControl('', [Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Imagen'),
        value: new FormControl('', [Validators.required]),
        type: new FormControl('file'),
      }),
    ];
    this.experienceService.setFormGroup(items);
    return items;
  }

  convertFileToBase64(): void {
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
    };
  }

  captureFile(e: any) {
    const image = e.target.files[0];
    this.fileSelected = image;
    this.imageUrl = this.sant.bypassSecurityTrustUrl(
      window.URL.createObjectURL(this.fileSelected)
    ) as string;
    this.convertFileToBase64();
  }

  showInfo(message: string) {
    this.toast.info({ detail: 'INFO', summary: message, sticky: true });
  }
  showSuccess(message: string) {
    this.toast.success({ detail: 'SUCCESS', summary: message, duration: 5000 });
  }

  saveExperience() {
    const experience: any = {
      position: '',
      company: '',
      workday: '',
      timeElapsed: '',
      place: '',
      image: '',
      profile: { id_pro: 1 },
    };

    const body = this.newExperience.value;
    console.log(body);
    body.item[5].value = this.base64;

    let claves = Object.keys(experience);
    for (let i = 0; i < claves.length - 1; i++) {
      let clave = claves[i];
      experience[clave] = body.item[i].value;
    }

    this.experienceService.saveExperience(experience).subscribe(
      (response) => {
        ($('#newExperienceModal') as any).modal('hide');
        this.showSuccess(response.message);
        this.experienceService.reloadExperience();
      },
      (err) => {
        this.showInfo(err.message);
      }
    );

    /** clean inputs */
    this.newExperience = new FormGroup({
      item: new FormArray(this.initItemsGroup()),
    });
    this.imageUrl = '';
  }
}
