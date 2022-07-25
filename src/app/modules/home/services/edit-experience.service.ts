import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditExperienceService {

  data:any;
  private _itemsFormGroup$ = new BehaviorSubject(null)
  public itemsFormGroup$ = this._itemsFormGroup$.asObservable();

  private _data$ = new BehaviorSubject(null);
  public data$ = this._data$.asObservable();



  
  
  constructor() { }

  public setFormGroup(data:any):void {
    this._itemsFormGroup$.next(data);
  }

  public setData(data:any):void{
    /*console.log("Del item al servico", data);*/
    this._data$.next(data);
  }

  /*getdata():any{
    console.log("Editando le ID:", this.data)
    return this.data;
  }*/
  /*initItemsGroup():void{

  }*/
}
