import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
@Input() text:string=''
@Input() header:string='Add New Domain'
@Output() userAcceptance:EventEmitter<string|null>=new EventEmitter<string|null>()
@Output() upload:EventEmitter<any>=new EventEmitter<any>()
@Input() New:boolean=false;
errors:boolean=false;
@Input() type:string|null=''
download(url:string){
 
    var link = document.createElement("a");
    link.href = './assets/cred.csv';
    link.download='temp_users_csv.csv'
    if(url.includes("userId"))
    {
      link.href = './assets/cred_userId.csv';
    link.download='temp_user_userId'
    }
    link.click();
  
}
}
