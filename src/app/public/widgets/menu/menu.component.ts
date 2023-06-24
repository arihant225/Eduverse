import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuRoutes } from 'src/app/Interfaces/IMenuRoutes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent   {
  
  constructor(private router:Router,@Inject(DOCUMENT) public document: Document ) {
  
  }

  public sideMenuState:boolean=false;
  public menuItems:IMenuRoutes[]=[{item:'login',item_route:'/login',icons:'bi bi-box-arrow-in-left'},{item:'Sign Up',item_route:'/signup',icons:'bi-database-add'},{item:'Become a Host',item_route:'/becomeahost',icons:'bi bi-broadcast'},{item:'About-us',item_route:'/aboutus',icons:'bi bi-brightness-alt-high'},{item:'Home',item_route:'/home',icons:'bi bi-house-heart-fill'}]
  public routesItems:IMenuRoutes[]=this.menuItems
  toggleSideMenu(){
    this.sideMenuState=!this.sideMenuState
  }
  navigate(item:IMenuRoutes){
    this.router.navigate([item.item_route]);
    this.sideMenuState=false;

  }
}
