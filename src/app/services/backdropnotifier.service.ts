import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackdropnotifierService {
  public text:string|null=null;
  constructor() { }
}
