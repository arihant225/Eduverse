import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuRoutes } from 'src/app/Interfaces/IMenuRoutes';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent   {
  
  constructor(private router:Router,@Inject(DOCUMENT) public document: Document,public menuService:MenuService ) {
  }

  public sideMenuState:boolean=false;

  toggleSideMenu(){
    this.sideMenuState=!this.sideMenuState
  }
  navigate(item:IMenuRoutes){
    this.router.navigate([item.item_route]);
    this.sideMenuState=false;

  }
}
