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

  idEdit: number = 0;
  imageUrl: string = '';
  fileSelected!: Blob;
  base64!: string;

  constructor(
    private educationService: EducationService,
    private toast: NgToastService,
    private sant: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.editEducation = new FormGroup({
      id_edu: new FormControl(''),
      school: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      period: new FormControl('', Validators.required),
      image: new FormControl(),
      profile: new FormControl({ id_pro: 1 }),
    });

    this.educationService.idData$.subscribe((idData) => {
      if (idData !== 0) {
        this.educationService.getEducation(idData).subscribe((res) => {
          this.editEducation.controls['id_edu'].setValue(res.id_edu);
          this.editEducation.controls['school'].setValue(res.school);
          this.editEducation.controls['title'].setValue(res.title);
          this.editEducation.controls['period'].setValue(res.period);
          this.imageUrl = res.image;
          this.base64 = res.image;
        });
      }
    });
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
    const body = this.editEducation.value;
    body.image = this.base64;

    this.educationService.updateEducation(body).subscribe(
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
