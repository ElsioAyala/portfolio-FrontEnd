import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EducationService } from '@modules/home/services/education.service';
import { NgToastService } from 'ng-angular-popup';
import { DomSanitizer } from '@angular/platform-browser';
declare var jQuery: any;

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css'],
})
export class EditEducationComponent implements OnInit {
  editEducation: FormGroup = new FormGroup({});
  formItemsGroup$ = this.educationService.itemsFormGroup$;

  id_edu: any = '';
  imageUrl: string = '';
  fileSelected!: Blob;
  base64!: string;

  constructor(
    private educationService: EducationService,
    private toast: NgToastService,
    private sant: DomSanitizer
  ) {}

  ngOnInit(): void {
    let dataItem = this.educationService.itemData$.subscribe();
    this.educationService.itemData$.subscribe((itemData) => {
      this.editEducation = new FormGroup({
        item: new FormArray(this.initItemsGroup(itemData)),
      });
    });
  }

  initItemsGroup(dataItem: any): any {
    const items = [
      new FormGroup({
        key: new FormControl('Escuela/Instituto'),
        value: new FormControl(`${dataItem !== null ? dataItem.school : ''}`, [
          Validators.required,
        ]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Titulo/Certificado'),
        value: new FormControl(`${dataItem !== null ? dataItem.title : ''}`, [
          Validators.required,
        ]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Periodo Cursado'),
        value: new FormControl(`${dataItem !== null ? dataItem.period : ''}`, [
          Validators.required,
        ]),
        type: new FormControl('text'),
      }),
      new FormGroup({
        key: new FormControl('Imagen'),
        value: new FormControl(),
        type: new FormControl('file'),
      }),
    ];
    if (dataItem !== null) this.imageUrl = dataItem.image;
    if (dataItem !== null) this.id_edu = dataItem.id_edu;
    this.educationService.setFormGroup(items);
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

  saveEditEducation() {
    const education: any = {
      id_edu: this.id_edu,
      school: '',
      title: '',
      period: '',
      image: '',
      profile: { id_pro: 1 },
    };
    const body = this.editEducation.value;

    if (body.item[3].value !== '') {
      body.item[3].value = this.base64;
    } else {
      body.item[3].value = this.imageUrl;
    }

    let claves = Object.keys(education);
    for (let i = 1; i < claves.length - 1; i++) {
      let clave = claves[i];
      education[clave] = body.item[i - 1].value;
    }

    this.educationService.updateEducation(education).subscribe(
      (response) => {
        ($('#educationEditModal') as any).modal('hide');
        this.showSuccess(response.message);
        this.educationService.reloadEducation();
      },
      (err) => {
        this.showInfo(err.message);
      }
    );
  }
}
