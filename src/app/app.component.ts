import { Component } from '@angular/core';
import { MenuService } from './services/menu.service';
import { UserService } from './services/user.service';
import { BackdropnotifierService } from './services/backdropnotifier.service';
import { ToasterService } from './services/toaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eduverse';
  
  constructor(public menuservice:MenuService,private userservice:UserService,public backdropNotifier:BackdropnotifierService,public toasterService:ToasterService) {
this.userservice.CheckAuthorize();
  }
  
}
