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
  public generateOtpForAddInquery(body:IOtpRequest):Observable<IOtpResponse> 
  {
    return this.http.post<IOtpResponse>(this.baseUrl+'Inquery/generateOtpForMail',body);
  }
  public generateOtpForWithrawProposal(body:IOtpRequest,proposal:any):Observable<IOtpResponse> 
  {
    return this.http.post<IOtpResponse>(this.baseUrl+'Inquery/GenerateOtpForWithdrawProposal/'+proposal,body);
  }
  
public SearchQuery(accessor:string):Observable<Inquery>{
    
    return this.http.get<Inquery>(`${this.baseUrl}Inquery/Searchproposal/${accessor}`)
  }

  public addInquery(body:any):Observable<any>{
    let form:FormData=new FormData();
    for(let obj of Object.keys(body))
    {
      form.append(obj,body[obj])
    }
    return this.http.post(`${this.baseUrl}Inquery/AddInquery`,form)
  }
  public getImage(path:string):Observable<any>{
    return this.http.get(`${this.baseUrl}File/getFile/${path}`,{responseType:'blob'})
  }
  public WithdrawProposal(proposal:any):Observable<any>{
    return this.http.post(`${this.baseUrl}Inquery/WithdrawProposal/${proposal}`,{})
  }
}
