import { Injectable } from '@angular/core';
import { IMenuRoutes } from '../Interfaces/IMenuRoutes';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { 
    this.menuItems=this.publicMenuItems;
  }
  public menuItems:IMenuRoutes[]=[];
  private loggedInMenuItems:IMenuRoutes[]=[{item:'Dashboard',item_route:'/dashboard',icons:'bi-bar-chart-line-fill'},{item:'About-us',item_route:'/aboutus',icons:'bi bi-globe-americas'},{item:'Home',item_route:'/home',icons:'bi bi-house-heart-fill'}];
  private publicMenuItems:IMenuRoutes[]=[{item:'login',item_route:'/login',icons:'bi bi-box-arrow-in-left'},{item:'Sign Up',item_route:'/signup',icons:'bi-database-add'},{item:'Become a Host',item_route:'/hostwithus',icons:'bi bi-broadcast'},{item:'About-us',item_route:'/aboutus',icons:'bi bi-globe-americas'},{item:'Home',item_route:'/home',icons:'bi bi-house-heart-fill'}]
  public AdminDashboardMenuItems:IMenuRoutes[]=[{item:'Dashboard',item_route:'/dashboard',icons:'bi-bar-chart-line-fill'},{icons:'bi bi-pencil-square',item_route:'/dashboard/workspace',item:'Notes'}]
  public dashboardMenuItems:IMenuRoutes[]=[{item:'Dashboard',item_route:'/dashboard',icons:'bi-bar-chart-line-fill'},{item:'Connect to Stream',icons:'bi bi-link-45deg',item_route:'/dashboard/connectToStream'},{item:'Quizes',item_route:'/dashboard/quizes',icons:'bi bi-journal-bookmark-fill'},{icons:'bi bi-pencil-square',item_route:'/dashboard/workspace',item:'Notes'}]
  public isVisible:boolean =true;
  login(){
    window.scrollTo(0,0);
    this.menuItems=this.loggedInMenuItems;
  }
  
  loggedOut(){
    this.menuItems=this.publicMenuItems;
  }
}
