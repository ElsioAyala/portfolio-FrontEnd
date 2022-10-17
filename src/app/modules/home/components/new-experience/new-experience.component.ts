import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NewExperienceService } from '@modules/home/services/new-experience.service';

@Component({
  selector: 'app-new-experience',
  templateUrl: './new-experience.component.html',
  styleUrls: ['./new-experience.component.css']
})
export class NewExperienceComponent implements OnInit {

  newExperience: FormGroup = new FormGroup({})

  constructor(private newExperienceService: NewExperienceService) { }

  ngOnInit(): void {
    this.newExperience = new FormGroup({
      image: new FormControl(''),
      item: new FormArray([
        new FormGroup({
          key: new FormControl('Puesto'),
          value: new FormControl(''),
        }),
        new FormGroup({
          key: new FormControl('Empresa/Institución'),
          value: new FormControl(''),
        }),
        new FormGroup({
          key: new FormControl('Jornada Laboral'),
          value: new FormControl(''),
        }),
        new FormGroup({
          key: new FormControl('Período (Años)'),
          value: new FormControl(''),
        }),
        new FormGroup({
          key: new FormControl('Lugar/Ciudad/Provincia'),
          value: new FormControl(''),
        }),
      ]),
    })

  }

  getItems():any {
    const list = this.newExperience.get('item') as FormArray
    return list.controls
  }


  saveExperience(): void {
    //Enviar a la API
    const body = this.newExperience.value
    this.newExperienceService.saveExperience(body)
    .subscribe((response) => {
      console.log('OK', response)
      //PENDIENTE: ver la forma de cerrar el modal
    }, (errr) =>{
      
    })

  }

}
