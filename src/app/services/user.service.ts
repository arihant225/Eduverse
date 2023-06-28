import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { webConfig } from 'src/WebConfig';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  IsAuthorize:boolean=false;


  constructor(private http: HttpClient, private router: Router,private menu:MenuService){

  }
  public CheckAuthorize():Promise<boolean>
  {
    
    return new Promise<boolean>((resolve,reject)=>{
  
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
          },

          () => {
            this.menu.login();
            this.IsAuthorize=true;
            resolve(true);
          }
        )
      }
      else {

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
}