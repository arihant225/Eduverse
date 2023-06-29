import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuRoutes } from 'src/app/Interfaces/IMenuRoutes';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent   {
  
  @ViewChild('toggleButton') toggleButton:ElementRef|undefined;

  constructor(private router:Router,@Inject(DOCUMENT) public document: Document,public userService:UserService,public menuService:MenuService,private renderer:Renderer2 ) {
    

 
    this.renderer.listen('window', 'click',(e:Event)=>{
     
      if(this.toggleButton&&!this.toggleButton.nativeElement.contains(e.target)) {
          this.toggleProfileOptions=false;
      }
  });

  }
public logout(){
  localStorage.clear();
  this.router.navigate(["/home"])
  this.userService.CheckAuthorize();
}
  public sideMenuState:boolean=false;

  public toggleProfileOptions:boolean=false;
  toggleSideMenu(){
    this.sideMenuState=!this.sideMenuState
  }
  navigate(item:IMenuRoutes){
    this.router.navigate([item.item_route]);
    this.sideMenuState=false;

  }
}
