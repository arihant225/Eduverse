import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webConfig } from 'src/WebConfig';
import { ICredentials } from '../Interfaces/Models/Request/ICredentials';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private url:string=webConfig.EduverseWebApiUrl;
  constructor(private http:HttpClient) { }

  private CanAccountCreateWithMobile(identity:string):Observable<boolean>
  {
    return this.http.get<boolean>(this.url+'signup/CanAccountCreateWithMobile'+'?identity='+identity )
  }
  private canAccountCreateWithEmail(identity:string):Observable<boolean>
  {
    return this.http.get<boolean>(this.url+'signup/canAccountCreateWithEmail'+'?identity='+identity )
  }

  public createCredentials(credential:ICredentials):Observable<boolean>{
    {
   return this.http.post<boolean>(this.url+"signup/createcredentials",credential);
    }

  }
  public async canContinueWithPhone(identity:string):Promise<boolean>{
    return new Promise<boolean>((resolve,reject)=>{
      this.CanAccountCreateWithMobile(identity).subscribe(d=>{
        resolve(d);
      })

    })

  }

  public async canContinueWithEmail(identity:string):Promise<boolean>{
    return new Promise<boolean>((resolve,reject)=>{
      this.canAccountCreateWithEmail(identity).subscribe(d=>{
        resolve(d);
      })

    })



  }
  
}