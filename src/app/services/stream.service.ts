import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webConfig } from 'src/WebConfig';
import {IStreams} from '../Interfaces/Models/Response/IStreams'

@Injectable({
  providedIn: 'root'
})
export class streamService {
  private token:string|null= localStorage.getItem("token");
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','Authorization': `Bearer ${this.token}` });
  private url:string=webConfig.EduverseWebApiUrl;

  constructor(private httpClient:HttpClient) { }


  public getAllStreams():Observable<IStreams[]>{
   return this.httpClient.get<IStreams[]>(`${this.url}Streams/getAllStream`,{headers:this.httpHeaders});
  }

}
