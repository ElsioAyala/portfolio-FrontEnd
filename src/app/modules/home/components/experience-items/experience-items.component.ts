import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-items.component.html',
  styleUrls: ['./experience-items.component.css']
})
export class ExperienceItemsComponent implements OnInit {

  @Input() isDark:boolean = (localStorage.getItem("active-dark")) === "true";
  @Input() data:any = {}
  @Input() img:any = ""

  constructor() { }

  ngOnInit(): void {
  }
  

}
