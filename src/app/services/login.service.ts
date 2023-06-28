import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../Interfaces/Models/Request/ILogin';
import { webConfig } from 'src/WebConfig';
import { Observable } from 'rxjs';
import { IToken } from '../Interfaces/Models/Response/IToken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url:string=webConfig.EduverseWebApiUrl;
  constructor(private http:HttpClient) { 

  }
  public login(cred:ILogin):Observable<IToken>{
  return  this.http.post<IToken>(this.url+"login/Authenticate",cred);
  }
  
}
