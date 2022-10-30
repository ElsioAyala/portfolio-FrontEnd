import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ExperienceService } from '@modules/home/services/experience.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css'],
})
export class EditExperienceComponent implements OnInit {
  editExperience: FormGroup = new FormGroup({});
  formItemsGroup$ = this.experienceService.itemsFormGroup$;

  id_exp: any = '';
  imageUrl: string = '';
  fileSelected!: Blob;
  base64!: string;

  constructor(
    private experienceService: ExperienceService,
    private sant: DomSanitizer,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.experienceService.itemData$.subscribe((itemData) => {
      this.editExperience = new FormGroup({
        item: new FormArray(this.initItemsGroup(itemData)),
      });
    });
  }

  initItemsGroup(dataItem: any): any {
    const items = [
      new FormGroup({
        key: new FormControl('Puesto'),
        value: new FormControl(`${dataItem !== null ? dataItem.position : ''}`, [Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Empresa/Institución'),
        value: new FormControl(`${dataItem !== null ? dataItem.company : ''}`, [Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Jornada Laboral'),
        value: new FormControl(`${dataItem !== null ? dataItem.workday : ''}`, [Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Período (Años)'),
        value: new FormControl(`${dataItem !== null ? dataItem.timeElapsed : ''}`, [Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Lugar/Ciudad/Provincia'),
        value: new FormControl(`${dataItem !== null ? dataItem.place : ''}`, [Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Imagen'),
        value: new FormControl(),
        type: new FormControl('file'),
      }),
    ];
    if (dataItem !== null) this.imageUrl = dataItem.image;
    if (dataItem !== null) this.base64 = dataItem.image;
    if (dataItem !== null) this.id_exp = dataItem.id_exp;
    this.experienceService.setFormGroup(items);
    return items;
  }

  showInfo(message: string) {
    this.toast.info({ detail: 'INFO', summary: message, sticky: true });
  }
  showSuccess(message: string) {
    this.toast.success({ detail: '👌', summary: message, duration: 5000 });
  }

  captureFile(e: any) {
    const image = e.target.files[0];
    this.fileSelected = image;
    this.imageUrl = this.sant.bypassSecurityTrustUrl(
      window.URL.createObjectURL(this.fileSelected)
    ) as string;
    this.convertFileToBase64();
  }

  convertFileToBase64(): void {
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
    };
  }

  saveEditExperience() {
    const experience: any = {
      id_exp: this.id_exp,
      position: '',
      company: '',
      workday: '',
      timeElapsed: '',
      place: '',
      image: '',
      profile: { id_pro: 1 },
    };

    const body = this.editExperience.value;
    if (body.item[5].value !== '') {
      body.item[5].value = this.base64;
    } else {
      body.item[5].value = this.imageUrl;
    }

    let claves = Object.keys(experience);
    for (let i = 1; i < claves.length - 1; i++) {
      let clave = claves[i];
      experience[clave] = body.item[i - 1].value;
    }

    this.experienceService.updateExperience(experience).subscribe(
      (response) => {
        ($('#experienceEditModal') as any).modal('hide');
        this.showSuccess(response.message);
        this.experienceService.reloadExperience();
      },
      (err) => {
        this.showInfo(err.message);
      }
    );
  }
}
