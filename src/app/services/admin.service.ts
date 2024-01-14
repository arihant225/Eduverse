import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webConfig } from 'src/WebConfig';
import { Domain } from '../Interfaces/Models/Domains';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private token:string|null= localStorage.getItem("token");
  private baseUrl=webConfig.EduverseWebApiUrl;
  private httpHeaders: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}` });
 
  constructor(private http:HttpClient) {
  }


  public getDomains(id:number|null):Observable<Domain[]>{
    return this.http.get<Domain[]>(`${this.baseUrl}admin/Domains/`+id,{headers:this.httpHeaders})
  }
  public SaveDomains(domain:Domain):Observable<Domain>{
    return this.http.post<Domain>(`${this.baseUrl}admin/Domains`,domain,{headers:this.httpHeaders})
  }
  public compileFile(file:File,type:string):Observable<any[]>
  {
    let data=new FormData()
    data.append("type",type);
    data.append("file",file);

    return this.http.post<any[]>(`${this.baseUrl}directory/compilefile`,data,{headers:this.httpHeaders})

  }
}
