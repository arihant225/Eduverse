import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webConfig } from 'src/WebConfig';
import{INotes} from '../Interfaces/Models/Request/INotes'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

private token:string|null= localStorage.getItem("token");
private baseUrl=webConfig.EduverseWebApiUrl;
private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','Authorization': `Bearer ${this.token}` });
  constructor(private http:HttpClient) {
   }
   
  SaveNotes(notes:INotes):Observable<INotes>{
    return this.http.post<INotes>(this.baseUrl+"notes/savenotes",notes,{headers:this.httpHeaders})
  }
  getNotes(noteId:number):Observable<INotes>
  {
    return this.http.get<INotes>(this.baseUrl+`notes/Getnotes/${noteId}`,{headers:this.httpHeaders})
  }
}
