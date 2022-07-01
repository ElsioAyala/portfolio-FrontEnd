import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-education-items',
  templateUrl: './education-items.component.html',
  styleUrls: ['./education-items.component.css']
})
export class EducationItemsComponent implements OnInit {

  @Input() isDark:boolean = (localStorage.getItem("active-dark")) === "true";
  
  constructor() { }

  ngOnInit(): void {
  }

}
