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
  
  @ViewChild('sidemenu') menu:ElementRef|undefined;
  @ViewChild('dropdown') profileoptions:ElementRef|undefined
  

  constructor(private router:Router,@Inject(DOCUMENT) public document: Document,public userService:UserService,public menuService:MenuService,private renderer:Renderer2 ) {
    

 
    this.renderer.listen('window', 'click',(e:Event)=>{
      if(this.menu&& this.menu.nativeElement.contains(e.target)) {
      }
      else{
        this.sideMenuState=false;
      }
  });
  this.renderer.listen('window', 'click',(e:Event)=>{
    if(this.profileoptions&& this.profileoptions.nativeElement.contains(e.target)) {
    }
    else{
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
   let interval= setInterval(()=>{
    this.sideMenuState=!this.sideMenuState
 
    clearInterval(interval)
  },0)
  }
  navigate(item:IMenuRoutes){
    this.router.navigate([item.item_route]);
    this.sideMenuState=false;

  }
}
