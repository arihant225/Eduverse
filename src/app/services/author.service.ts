import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webConfig } from 'src/WebConfig';
import { Inquery, ManageInstitue } from '../Interfaces/Inquery';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private token:string|null= localStorage.getItem("token");
  private baseUrl=webConfig.EduverseWebApiUrl;
  private httpHeaders: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}` });
 
  constructor(private http:HttpClient) {
  }

  public getStats():Observable<any>{
    return this.http.get(`${this.baseUrl}author/getstats`,{headers:this.httpHeaders})
  }
  public searchInstitute(type:string):Observable<Inquery[]>{
    return this.http.get<Inquery[]>(`${this.baseUrl}author/searchInstitute/${type}`,{headers:this.httpHeaders});

  }
  public getImage(path:string):Observable<any>{
    return this.http.get(`${this.baseUrl}File/getFile/${path}`,{headers:this.httpHeaders,responseType:'blob'})
  }
  public ManageInstitutes(institute:ManageInstitue):Observable<ManageInstitue>{
    return this.http.post<ManageInstitue>(`${this.baseUrl}author/ManageInstitues`,institute,{headers:this.httpHeaders})
  }

}
