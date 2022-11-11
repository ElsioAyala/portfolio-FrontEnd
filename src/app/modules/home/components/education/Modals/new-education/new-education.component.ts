import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EducationService } from '@modules/home/services/education.service';
import { NgToastService } from 'ng-angular-popup';
import { DomSanitizer } from '@angular/platform-browser';

declare var jQuery: any;

@Component({
  selector: 'app-new-education',
  templateUrl: './new-education.component.html',
  styleUrls: ['./new-education.component.css'],
})
export class NewEducationComponent implements OnInit {
  fileSelected!: Blob;
  imageUrl: string = '';
  base64!: string;
  newEducation: FormGroup = new FormGroup({});
  formItemsGroup$ = this.educationService.itemsFormGroup$;

  constructor(
    private educationService: EducationService,
    private toast: NgToastService,
    private sant: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.newEducation = new FormGroup({
      item: new FormArray(this.initItemsGroup()),
    });
  }
  initItemsGroup(): any {
    const items = [
      new FormGroup({
        key: new FormControl('Escuela/Instituto'),
        value: new FormControl('', [Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Titulo/Certificado'),
        value: new FormControl('', [Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Periodo Cursado'),
        value: new FormControl('', [Validators.required]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Imagen'),
        value: new FormControl('', [Validators.required]),
        type: new FormControl('file'),
      }),
    ];
    this.educationService.setFormGroup(items);
    return items;
  }

  getItems(): any {
    const list = this.newEducation.get('item') as FormArray;
    return list.controls;
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

  saveEducation() {
    const education: any = {
      school: '',
      title: '',
      period: '',
      image: '',
      profile: { id_pro: 1 },
    };
    const body = this.newEducation.value;
    body.item[3].value = this.base64;

    let claves = Object.keys(education);
    for (let i = 0; i < claves.length - 1; i++) {
      let clave = claves[i];
      education[clave] = body.item[i].value;
    }
    this.educationService.saveEducation(education).subscribe(
      (response) => {
        ($('#educationModal') as any).modal('hide');
        this.showSuccess(response.message);
        this.educationService.reloadEducation();
      },
      (err) => {
        this.showInfo(err.message);
      }
    );

    /** clean inputs */
    this.newEducation = new FormGroup({
      item: new FormArray(this.initItemsGroup()),
    });
    this.imageUrl = '';
  }
}
