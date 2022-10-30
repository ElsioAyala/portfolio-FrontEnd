import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ContactService } from '@modules/home/services/contact.service';
import { ProfileService } from '@modules/home/services/profile.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.css'],
})
export class ModalProfileComponent implements OnInit {
  profileModalForm: FormGroup = new FormGroup({});
  contacts!: any;
  idEdit: number = 0;
  photoUrl: string = './assets/faltaImagen.jpg';
  coverUrl: string = './assets/faltaImagen.jpg';
  fileSelected!: Blob;
  photoBase64!: string;
  coverBase64!: string;

  constructor(
    private toast: NgToastService,
    private profileService: ProfileService,
    private sant: DomSanitizer,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((res) => {
      this.contacts = res;
    });
    this.contactService.reloadContacts$.subscribe((response) => {
      if (response) this.contacts = response;
    });

    this.profileModalForm = new FormGroup({
      id_pro: new FormControl(),
      name: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      stack: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required),
      photo: new FormControl(),
      cover: new FormControl(),
      profile: new FormControl({ id_pro: 1 }),
    });

    this.profileService.getProfile().subscribe((res) => {
      this.profileModalForm.controls['id_pro'].setValue(res.id_pro);
      this.profileModalForm.controls['name'].setValue(res.name);
      this.profileModalForm.controls['apellido'].setValue(res.apellido);
      this.profileModalForm.controls['stack'].setValue(res.stack);
      this.profileModalForm.controls['about'].setValue(res.about);
      this.photoUrl = res.photo;
      this.photoBase64 = res.photo;
      this.coverUrl = res.cover;
      this.coverBase64 = res.cover;
    });
  }

  showInfo(message: string) {
    this.toast.info({ detail: 'INFO', summary: message, sticky: true });
  }
  showSuccess(message: string) {
    this.toast.success({ detail: 'SUCCESS', summary: message, duration: 5000 });
  }

  OnInitConatacts() {
    this.contactService.getContacts().subscribe((res) => {
      this.contacts = res;
    });
  }

  saveProfile() {
    let body = this.profileModalForm.value;
    body.photo = this.photoBase64;
    body.cover = this.coverBase64;

    this.profileService.updateProfile(body).subscribe(
      (response) => {
        ($('#profileModal') as any).modal('hide');
        this.showSuccess(response.message);
        this.profileService.reloadProfile();
      },
      (err) => {
        this.showInfo(err.message);
      }
    );
  }

  captureFile(e: any, type: string) {
    const image = e.target.files[0];
    this.fileSelected = image;
    if (type === 'photo') {
      this.photoUrl = this.sant.bypassSecurityTrustUrl(
        window.URL.createObjectURL(this.fileSelected)
      ) as string;
      this.convertFileToBase64(type);
    } else {
      this.coverUrl = this.sant.bypassSecurityTrustUrl(
        window.URL.createObjectURL(this.fileSelected)
      ) as string;
      this.convertFileToBase64(type);
    }
  }

  convertFileToBase64(type: string): void {
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
      type === 'photo'
        ? (this.photoBase64 = reader.result as string)
        : (this.coverBase64 = reader.result as string);
    };
  }
}
