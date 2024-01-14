import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Domain, domainAction } from 'src/app/Interfaces/Models/Domains';
import { Globalservice } from 'src/app/services/globalservice.service';

@Component({
  selector: 'app-domain-tree',
  templateUrl: './domain-tree.component.html',
  styleUrls: ['./domain-tree.component.css']
})
export class DomainTreeComponent {
@Input() Domains:Array<Domain>=[];
@Input() parent:Domain|undefined;
contextState:boolean=false;
@Output() ManageDomain:EventEmitter<domainAction>=new EventEmitter<domainAction>();
constructor(public globalService:Globalservice){}
openMenu(domain:Domain){
 setTimeout(()=>{
  domain.refreshContext=true;
  this.globalService.DomainCache=domain;
 },0)

}
}
