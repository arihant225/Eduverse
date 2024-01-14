import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mydashboard',
  templateUrl: './mydashboard.component.html',
  styleUrls: ['./mydashboard.component.css']
})
export class MydashboardComponent {

  constructor()
  {}
  
  AuthorizeForSuperUser(){
    return UserService.IsSuperAdmin();
  }
  AuthorizeForAdminUser()
  {
    
    return UserService.IsAdmin();
  }
}
