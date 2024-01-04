import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webConfig } from 'src/WebConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private token:string|null= localStorage.getItem("token");
  private baseUrl=webConfig.EduverseWebApiUrl;
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','Authorization': `Bearer ${this.token}` });
 
  constructor(private http:HttpClient) {
  }

  public getStats():Observable<any>{
    return this.http.get(`${this.baseUrl}author/getstats`,{headers:this.httpHeaders})
  }
}
