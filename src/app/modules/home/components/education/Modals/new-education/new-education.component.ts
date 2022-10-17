import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Education } from '@core/models/education.interface';
import { EducationService } from '@modules/home/services/education.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-new-education',
  templateUrl: './new-education.component.html',
  styleUrls: ['./new-education.component.css']
})
export class NewEducationComponent implements OnInit {

  newEducation: FormGroup = new FormGroup({})
  formItemsGroup$ = this.educationService.itemsFormGroup$;
  
  constructor(private educationService: EducationService, private toast: NgToastService) { }

  ngOnInit(): void {
    
    this.newEducation = new FormGroup({
      
      item: new FormArray(this.initItemsGroup())
    });


  }
  initItemsGroup():any{
    const items = [
      new FormGroup({
        key: new FormControl('Escuela/Instituto'),
        value: new FormControl(''),
        type: new FormControl('text')
      }),
      new FormGroup({ 
        key: new FormControl('Titulo/Certificado'),
        value: new FormControl(''),
        type: new FormControl('text')
      }),
      new FormGroup({ 
        key: new FormControl('Periodo Cursado'),
        value: new FormControl(''),
        type: new FormControl('text')
      }),
      new FormGroup({ 
        key: new FormControl('Imagen'),
        value: new FormControl(''),
        type: new FormControl('file')
      })
    ];
    this.educationService.setFormGroup(items);
    return items;
  }

  getItems():any{
    console.log(this.newEducation.get('item'));
    const list = this.newEducation.get('item') as FormArray;
    return list.controls
  }

  captureFile(e:any) {
    const image = e.target.files[0];
    console.log(image)
  }

  showInfo(message: string) {
    this.toast.info({detail:"INFO",summary:message, sticky:true});
  }

  showSuccess(message: string) {
    this.toast.success({detail:"SUCCESS",summary:message ,duration:5000});
  }

  saveEducation(){
    const form:any = document.getElementById("formEducation")!
    const formdata:any = new FormData(form)
    console.log("Formulario -> ", form)
    console.log("Form Data -> ", formdata)
    const education:any = {
      school: '',
      title: '',
      period: '',
      image: '',
      profile:{id_pro : 1}
    }
    const body = this.newEducation.value


    let claves = Object.keys(education);
    for(let i=0; i< claves.length-1; i++){
      let clave = claves[i];
      education[clave]= body.item[i].value;
    }
      console.log(education);
    this.educationService.saveEducation(education)
    .subscribe((response) => {
      //console.log('OK', response)
      //PENDIENTE: ver la forma de cerrar el modal

      const modal = document.getElementById("educationModal")!
      modal.classList.toggle("show")
      modal.style.display = "none";
      document.querySelector(".modal-backdrop")?.remove();
      
      
      let body = document.body
          body.classList.remove("modal-open")
          body.style.overflow = "auto"
          body.style.paddingRight = "0"
          //body.lastChild?.remove
  
      console.log("La respuesta del Servidor: ", response);
      this.showSuccess(response.message);
      
      /*modal.style.display="none";*/
      this.educationService.reloadEducation();
      
    }, (err) => {
      this.showInfo(err.message)
    }); 
  }

}
