import { Component, OnInit } from '@angular/core';
import { IMenuRoutes } from 'src/app/Interfaces/IMenuRoutes';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public TutorsCount:number=0;
  public TuteesCount:number=0;
  public routesItems:IMenuRoutes[]=[{item:'Blogs',item_route:'/blogs'},{item:'Sign Up',item_route:'/signup'},{item:'Events',item_route:'/events'},{item:'Opportunity',item_route:'/opportunity'},{item:'About-us',item_route:'/aboutus'}]
  public InstituteCount:number=0;

constructor(public userService:UserService) {
}
  ngOnInit(): void {
    let tutorLimit=200;
    let tuteesLimit=700;
    let instituteLimit=360;
    let Timer=setInterval(() => {
      if(tutorLimit>this.TutorsCount)
      this.TutorsCount++;
      if(tuteesLimit>this.TuteesCount)
      this.TuteesCount++;
      if(instituteLimit>this.InstituteCount)
      this.InstituteCount++;
      if(tuteesLimit==this.TuteesCount && tutorLimit== this.TutorsCount && instituteLimit == this.InstituteCount )
      {
        clearInterval(Timer)
        clearTimeout(Timer)
      }
      
    }, 1);


  
  }




}
