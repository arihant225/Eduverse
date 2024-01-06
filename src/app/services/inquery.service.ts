import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webConfig } from 'src/WebConfig';
import { Inquery } from '../Interfaces/Inquery';
import { IOtpRequest } from '../Interfaces/Models/Request/IOtpRequest';
import { IOtpResponse } from '../Interfaces/Models/Response/IOtpResponse';

@Injectable({
  providedIn: 'root'
})
export class InqueryService {
  private token:string|null= localStorage.getItem("token");
  private baseUrl=webConfig.EduverseWebApiUrl;
  
  constructor(private http:HttpClient) {
  }
  public generateOtpForSignUpMail(body:IOtpRequest):Observable<IOtpResponse> 
  {
    return this.http.post<IOtpResponse>(this.baseUrl+'Inquery/generateOtpForMail',body);
  }

  

  public addInquery(body:any):Observable<any>{
    let form:FormData=new FormData();
    for(let obj of Object.keys(body))
    {
      form.append(obj,body[obj])
    }
    let httpHeaders= new HttpHeaders({'Authorization': `Bearer ${this.token}` });
    return this.http.post(`${this.baseUrl}Inquery/AddInquery`,form)
  }
}
