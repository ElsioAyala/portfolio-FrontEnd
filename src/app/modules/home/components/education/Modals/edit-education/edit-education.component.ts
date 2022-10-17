import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EducationService } from '@modules/home/services/education.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {
  
  editEducation: FormGroup = new FormGroup({})
  formItemsGroup$ = this.educationService.itemsFormGroup$;
  id_edu:any = '';


  
  constructor(private educationService: EducationService, private toast: NgToastService) { }

  ngOnInit(): void {
    let dataItem = this.educationService.itemData$.subscribe();
    this.educationService.itemData$.subscribe(itemData => {
      /*console.log("El item contiene: ", itemData!.id_edu)*/
      
      this.editEducation = new FormGroup({
        item: new FormArray(this.initItemsGroup(itemData)),
      });

    });
   

  }

  initItemsGroup(dataItem:any):any{
    const items = [
      new FormGroup({
        key: new FormControl('Escuela/Instituto'),
        value: new FormControl(`${dataItem !== null ? dataItem.school: ''}`),
        /*type: new FormControl('text')*/
      }),
      new FormGroup({ 
        key: new FormControl('Titulo/Certificado'),
        value: new FormControl(`${dataItem !== null ? dataItem.title: ''}`),
        type: new FormControl('text')
      }),
      new FormGroup({ 
        key: new FormControl('Periodo Cursado'),
        value: new FormControl(`${dataItem !== null ? dataItem.period: ''}`),
        type: new FormControl('text')
      }),
      new FormGroup({ 
        key: new FormControl('Imagen'),
        value: new FormControl(`${dataItem !== null ? dataItem.image: ''}`),
        type: new FormControl('file')
      })
    ];
    if (dataItem !== null) this.id_edu = dataItem.id_edu;
    this.educationService.setFormGroup(items);
    return items;
  }

  showInfo(message: string) {
    this.toast.info({detail:"INFO",summary:message, sticky:true});
  }
  showSuccess(message: string) {
    this.toast.success({detail:"SUCCESS",summary:message ,duration:5000});
  }


  saveEditeducation(){
    const education:any = {id_edu:this.id_edu,school: '',title: '',period: '',image: '',profile:{id_pro : 1}}
    const body = this.editEducation.value


    let claves = Object.keys(education);
    for(let i=1; i< claves.length-1; i++){
      let clave = claves[i];
      education[clave]= body.item[i-1].value;
    }
      
    console.log("Send Education: ", education);

    this.educationService.updateEducation(education).subscribe((response) => {

      //Cerrar Modal
      const modal = document.getElementById("educationEditModal")!
      modal.classList.toggle("show")
      modal.style.display = "none";
      document.querySelector(".modal-backdrop")?.classList.remove("modal-backdrop")
      let body = document.body
          body.classList.remove("modal-open")
          body.style.overflow = "auto"
          body.style.paddingRight = "0"

      this.showSuccess(response.message);
      this.educationService.reloadEducation();
  
    }, (err) => {
      this.showInfo(err.message);
    }); 
  }

}
