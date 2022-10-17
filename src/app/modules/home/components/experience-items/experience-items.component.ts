import { Component, OnInit, Input } from '@angular/core';
import { EditExperienceService } from '@modules/home/services/edit-experience.service';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-items.component.html',
  styleUrls: ['./experience-items.component.css']
})
export class ExperienceItemsComponent implements OnInit {


  @Input() isDark:boolean = (localStorage.getItem("active-dark")) === "true";
  @Input() data:any = {}
  @Input() img:any = ""
  @Input() _id:any = ""

  constructor(private editExperienceService: EditExperienceService) { }

  ngOnInit(): void {
  }
  
  edit(data:any){
    this.editExperienceService.setData(data)
  }
}
