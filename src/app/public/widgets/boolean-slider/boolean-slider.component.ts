import { Component,EventEmitter,Input,Output} from '@angular/core';

@Component({
  selector: 'app-boolean-slider',
  templateUrl: './boolean-slider.component.html',
  styleUrls: ['./boolean-slider.component.css']
})
export class BooleanSliderComponent {
@Input() userPreferences:boolean=false;
@Input('accept') accept:string="yes"
@Input('deny') deny:string="no"
@Output() newPreference:EventEmitter<boolean>=new EventEmitter();
lockPreference(){
  this.userPreferences=!this.userPreferences;
  this.newPreference.emit(this.userPreferences)
}
}
