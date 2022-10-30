import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactService } from '@modules/home/services/contact.service';
import { ProfileService } from '@modules/home/services/profile.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-modal-contact',
  templateUrl: './modal-contact.component.html',
  styleUrls: ['./modal-contact.component.css'],
})
export class ModalContactComponent implements OnInit {
  contactModalForm: FormGroup = new FormGroup({});
  contacts: any; //Array de objetos
  actualizar: any = [];

  idEdit: number = 0;

  constructor(
    private toast: NgToastService,
    private contactService: ContactService,
  ) {}

  ngOnInit(): void {
    this.contactModalForm = new FormGroup({
      /*id_pro: new FormControl(),*/
      facebook: new FormControl(),
      twitter: new FormControl(),
      email: new FormControl(),
      github: new FormControl(),
      linkedin: new FormControl(),
      discord: new FormControl(),
      instagram: new FormControl(),
      /*profile: new FormControl({ id_pro: 1 }),*/
    });

    this.contactService.getContacts().subscribe((res) => {
      this.contacts = res;
      this.contactModalForm.controls['facebook'].setValue(res[0].link);
      this.contactModalForm.controls['twitter'].setValue(res[1].link);
      this.contactModalForm.controls['email'].setValue(res[2].link);
      this.contactModalForm.controls['github'].setValue(res[3].link);
      this.contactModalForm.controls['linkedin'].setValue(res[4].link);
      this.contactModalForm.controls['discord'].setValue(res[5].link);
      this.contactModalForm.controls['instagram'].setValue(res[6].link);
    });
  }

  showInfo(message: string) {
    this.toast.info({ detail: 'INFO', summary: message, sticky: true });
  }
  showSuccess(message: string) {
    this.toast.success({ detail: 'SUCCESS', summary: message, duration: 5000 });
  }


  saveContact() {
    let body = this.contactModalForm.value; // Objeto
    Object.entries(body).forEach(([key, value], index) => {
      if (this.contacts[index].link !== value) {
        let contact = {
          id_cont: this.contacts[index].id_cont,
          name: this.contacts[index].name,
          icon: this.contacts[index].icon,
          link: value,
          profile: { id_pro: 1 },
        };

        this.actualizar.push(contact);
      }
    });

    this.actualizar.forEach((body: any) => {
      console.log('lo qeu se manda al servicio: ', body);
      this.contactService.updateContact(body).subscribe(
        (response) => {
          ($('#contactModal') as any).modal('hide');
          this.showSuccess(response.message);
          this.contactService.reloadContacts();
          ($('#profileModal') as any).modal('show');
      
        },
        (err) => {
          this.showInfo(err.message);
        }
      );

      
    });

    this.actualizar.length = 0;
    
  }
}
