import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EditExperienceService } from '@modules/home/services/edit-experience.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {

  constructor(private editExperienceService: EditExperienceService) { }
  newExperience: FormGroup = new FormGroup({})
  formItemsGroup$ = this.editExperienceService.itemsFormGroup$
  /*data$!: Observable<any>
  data:any = "hola"*/
  
  ngOnInit(): void {
    /*this.data$ = this.editExperienceService.data$
    this.data$.subscribe(data => {console.log(data)})*/

    this.editExperienceService.data$.subscribe(data => { 
      /*this.data = data*/
      this.newExperience = new FormGroup({
        image: new FormControl(''),
        item: new FormArray(this.initItemsGroup(data))
      })
    })


   
    
    
  }

  initItemsGroup(data:any):any{
    console.log(data)
    const items = [
      new FormGroup({
        key: new FormControl('Puesto'),
        value: new FormControl(`${data !== null ? data.position: ''}`),
      }),
      new FormGroup({
        key: new FormControl('Empresa/Institución'),
        value: new FormControl(`${data !== null ? data.company: ''}`),
      }),
      new FormGroup({
        key: new FormControl('Jornada Laboral'),
        value: new FormControl(`${data !== null ? data.workingDay: ''}`),
      }),
      new FormGroup({
        key: new FormControl('Período (Años)'),
        value: new FormControl(`${data !== null ? data.timeElapsed: ''}`),
      }),
      new FormGroup({
        key: new FormControl('Lugar/Ciudad/Provincia'),
        value: new FormControl(`${data !== null ? data.place: ''}`),
      })
    ]
    this.editExperienceService.setFormGroup(items)
    return items
  }

  getItems():any {
    const list = this.newExperience.get('item') as FormArray
    return list.controls
  }

  saveEditExperience(): void {
    //Enviar a la API
   console.log(this.newExperience.value)
  
  }

}
