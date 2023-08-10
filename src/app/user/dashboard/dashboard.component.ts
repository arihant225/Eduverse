import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Globalservice } from 'src/app/services/globalservice.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  @ViewChild('menu') public menu:ElementRef|undefined;

constructor(public menuService:MenuService,private router:Router,private userService:UserService,private renderer:Renderer2,public globalService:Globalservice) {
    this.renderer.listen('window', 'click',(e:Event)=>{
     
      if(this.menu&&!this.menu.nativeElement.contains(e.target)) {
          this.show=false;
  }
  })
  }
  public show=false;
  public logout(){
    localStorage.clear();
    this.router.navigate(["/home"])
    this.userService.CheckAuthorize();
  }
  public toggleSideMenu(){
    this.show=!this.show;
  }

}
