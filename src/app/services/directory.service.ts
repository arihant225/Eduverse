import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webConfig } from 'src/WebConfig';
import { AllItems, IEduverseDirectory } from '../Interfaces/Models/IEduverseDirectory';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  private token:string|null= localStorage.getItem("token");
  private baseUrl=webConfig.EduverseWebApiUrl;
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','Authorization': `Bearer ${this.token}` });
  constructor(private http:HttpClient) {
   }
   Save(directory:IEduverseDirectory):Observable<IEduverseDirectory>{
   return this.http.post<IEduverseDirectory>(`${this.baseUrl}Directory/Save`,directory,{headers:this.httpHeaders});
   }
   GetAllDirectories(id:number|null):Observable<AllItems>{
    if(id)
    return this.http.get<AllItems>(`${this.baseUrl}Directory/AllDirectories/${id}`,{headers:this.httpHeaders});
    else
    return this.http.get<AllItems>(`${this.baseUrl}Directory/AllDirectories`,{headers:this.httpHeaders});
   }
   deleteDirectory(id:number)
   {
    return this.http.delete<AllItems>(`${this.baseUrl}Directory/DeleteDirectory/${id}`,{headers:this.httpHeaders});
   }
}
