import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ProyectsService } from '@modules/home/services/proyects.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-modal-proyects',
  templateUrl: './modal-proyects.component.html',
  styleUrls: ['./modal-proyects.component.css'],
})
export class ModalProyectsComponent implements OnInit {
  projectsModalForm: FormGroup = new FormGroup({});
  idEdit: number = 0;
  imageUrl: string = '';
  fileSelected!: Blob;
  base64!: string;

  constructor(
    private sant: DomSanitizer,
    private toast: NgToastService,
    private proyectsService: ProyectsService
  ) {}

  ngOnInit(): void {
    this.projectsModalForm = new FormGroup({
      id_pro: new FormControl(),
      name: new FormControl('', Validators.required),
      summary: new FormControl('', Validators.required),
      repository: new FormControl('', Validators.required),
      demo: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      profile: new FormControl({ id_pro: 1 }),
    });

    this.proyectsService.idData$.subscribe((idData) => {
      this.idEdit = idData;
      if (idData !== 0) {
        this.proyectsService.getProject(idData).subscribe((res) => {
          this.projectsModalForm.controls['id_pro'].setValue(res.id_pro);
          this.projectsModalForm.controls['name'].setValue(res.name);
          this.projectsModalForm.controls['summary'].setValue(res.summary);
          this.projectsModalForm.controls['repository'].setValue(
            res.repository
          );
          this.projectsModalForm.controls['demo'].setValue(res.demo);
          this.imageUrl = res.image;
          this.base64 = res.image;
        });
      } else {
        this.projectsModalForm.controls['name'].reset();
        this.projectsModalForm.controls['summary'].reset();
        this.projectsModalForm.controls['repository'].reset();
        this.projectsModalForm.controls['demo'].reset();
        this.projectsModalForm.controls['image'].reset();
        this.projectsModalForm.controls['id_pro'].reset();
        this.imageUrl = '';
        this.base64 = '';
      }
    });
  }

  showInfo(message: string) {
    this.toast.info({ detail: 'INFO', summary: message, sticky: true });
  }
  showSuccess(message: string) {
    this.toast.success({ detail: 'SUCCESS', summary: message, duration: 5000 });
  }

  saveProject() {
    let body = this.projectsModalForm.value;
    body.image = this.base64;

    this.proyectsService.saveProject(body).subscribe(
      (response) => {
        ($('#projectsModal') as any).modal('hide');
        this.showSuccess(response.message);
        this.proyectsService.reloadProjects();
      },
      (err) => {
        this.showInfo(err.message);
      }
    );
  }

  editProject() {
    let body = this.projectsModalForm.value;
    body.image = this.base64;
    this.proyectsService.updateProject(body).subscribe(
      (response) => {
        ($('#projectsModal') as any).modal('hide');
        this.showSuccess(response.message);
        this.proyectsService.reloadProjects();
      },
      (err) => {
        this.showInfo(err.message);
      }
    );
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
}
