import { Injectable } from '@angular/core';
import { Domain } from '../Interfaces/Models/Domains';

@Injectable({
  providedIn: 'root'
})
export class Globalservice {
public DomainCache:Domain|null=null;
public lightMode:boolean=true;
  constructor() { }
  resetEvents(){
     
    if(this.DomainCache){
    this.DomainCache.refreshContext=false
    this.DomainCache=null;
    }
  }
}
