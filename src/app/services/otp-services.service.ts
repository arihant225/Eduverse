import { Injectable } from '@angular/core';
import{HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { IOtpRequest } from '../Interfaces/Models/Request/IOtpRequest';
import { IOtpResponse } from '../Interfaces/Models/Response/IOtpResponse';
import { webConfig } from 'src/WebConfig';
@Injectable({
  providedIn: 'root'
})
export class OtpService {
  url:string=webConfig.EduverseWebApiUrl;

  constructor(private httpClient:HttpClient) { 
  }

  public generateOtpForSignUpMail(body:IOtpRequest):Observable<IOtpResponse> 
  {
    return this.httpClient.post<IOtpResponse>(this.url+'signup/generateOtpForMail',body);
  }
}
