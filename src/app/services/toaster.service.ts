import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }
  content:string='';
  state:boolean=false
  triggerToaster(content:string){
    this.content=content;
    this.state=true
    setTimeout(()=>{
      this.state=false;

    },2000)
  }


}
