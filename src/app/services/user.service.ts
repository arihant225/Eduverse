import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { webConfig } from 'src/WebConfig';
import { MenuService } from './menu.service';

enum  userRoles{
  EDUAUTHOR="EDU-AUTHOR",
  ADMIN="ADMIN",
  ORGINISATION="ORGINISATION",
  USER="USER"
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  IsAuthorize:boolean=false;
  userName:string|null=null;
  firstName:string|null|undefined=null;


  constructor(private http: HttpClient, private router: Router,private menu:MenuService,private activeUrl:ActivatedRoute){
  }
  public CheckAuthorize():Promise<boolean>
  {
    
  
    return new Promise<boolean>((resolve,reject)=>{
      if(localStorage.length==0)
      {
        this.IsAuthorize=false;
        this.menu.loggedOut();
        resolve(false);
        return;
      }
    if (!localStorage.getItem('token')) {
      this.menu.loggedOut();
      this.router.navigate(["/login"]);
      localStorage.clear();
      this.IsAuthorize=false;

      resolve(false);
    }
    else {

      let now = new Date();
      let time = localStorage.getItem("expirationTime");
      if (time != null) {
        let exp = new Date(time);

        if (exp >now) {
          resolve(true)
          this.IsAuthorize=true;
          this.userName=localStorage.getItem('username');
          this.firstName=localStorage.getItem('username')?.split(" ")[0];
          this.menu.login();
          return;

        }
        this.isAuthenticate().subscribe(

          data => { },

          error => {
            if (error.status == 401) {
              this.menu.loggedOut();
              this.router.navigate(["/login"]);
              localStorage.clear();
              this.IsAuthorize=false;
              resolve(false);
            }
            resolve(false);
          },

          () => {
            this.menu.login();
            this.IsAuthorize=true;
            resolve(true);
            this.userName=localStorage.getItem('username')
            this.firstName=localStorage.getItem('username')?.split(" ")[0];
          }
        )
      }
      else {
``
        resolve(false);
        this.IsAuthorize=false;
        this.router.navigate(["/login"]);
        localStorage.clear();
      }
    }

  });
  }

  private url = webConfig.EduverseWebApiUrl;
  private isAuthenticate(): Observable<any> {
 
    let token = localStorage.getItem("token")
    let httpHeadrs: HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','Authorization': `Bearer ${token}` });
  
    return this.http.get<any>(this.url + "login/IsAuthenticate", { headers: httpHeadrs });
  }


  public static checkRole(role:string){
    let item=localStorage.getItem("roles");
    if(item!=null)
    {
    let roles:string[]=JSON.parse(item)
    return roles.includes(role);
  }
  return false;

  }

  public static IsSuperAdmin(){
    return UserService.checkRole(userRoles.EDUAUTHOR)
  }
  public static IsAdmin(){
    return UserService.checkRole(userRoles.ADMIN)
  }
  public static IsInstitute(){
    return UserService.checkRole(userRoles.ORGINISATION)
  }
  public static IsUser(){
    return UserService.checkRole(userRoles.USER)
  }

}