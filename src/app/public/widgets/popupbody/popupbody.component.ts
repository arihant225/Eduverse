import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popupbody',
  templateUrl: './popupbody.component.html',
  styleUrls: ['./popupbody.component.css']
})
export class PopupbodyComponent {

  @Input('PopupState') set function1(popupState:boolean){
this.PopupState=popupState;
if(popupState)
{
  document.body.style.overflowY='hidden';
}
else{
  document.body.style.overflowY='auto';
}
  } 
  
  public PopupState:boolean=false;


}
