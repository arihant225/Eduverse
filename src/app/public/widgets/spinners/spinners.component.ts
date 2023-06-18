import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinners',
  templateUrl: './spinners.component.html',
  styleUrls: ['./spinners.component.css']
})
export class SpinnersComponent {
@Input() text?:string="";
@Input() subText?:string;
}
