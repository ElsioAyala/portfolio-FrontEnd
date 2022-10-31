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
  imageUrl: string = '';
  fileSelected!: Blob;
  base64!: string;

  constructor(
    private experienceService: ExperienceService,
    private sant: DomSanitizer,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.editExperience = new FormGroup({
      id_exp: new FormControl(''),
      position: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      workday: new FormControl('', Validators.required),
      timeElapsed: new FormControl('', Validators.required),
      place: new FormControl('', Validators.required),
      image: new FormControl(),
      profile: new FormControl({ id_pro: 1 }),
    });

    this.experienceService.idData$.subscribe((idData) => {
      
      if (idData !== 0) {
        this.experienceService.getExperience(idData).subscribe((res) => {
          this.editExperience.controls['id_exp'].setValue(res.id_exp);
          this.editExperience.controls['position'].setValue(res.position);
          this.editExperience.controls['company'].setValue(res.company);
          this.editExperience.controls['workday'].setValue(res.workday);
          this.editExperience.controls['timeElapsed'].setValue(res.timeElapsed);
          this.editExperience.controls['place'].setValue(res.place);
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

  saveEditExperience() {
    const body = this.editExperience.value;
    body.image = this.base64;

    this.experienceService.updateExperience(body).subscribe(
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
