import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from 'src/app/Interfaces/Models/Request/ILogin';
import { IToken } from 'src/app/Interfaces/Models/Response/IToken';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formBuilder:FormBuilder,private loginService:LoginService) {    
  }
  
  public Loader_text:string|null=null;
  public required:boolean=false;
  public invalidCredentials:boolean=false;
  public CredentialForm:FormGroup=this.formBuilder.group({
  email:["",[Validators.required]],
  password:["",[Validators.required]]
});
public submitCredentials(){
  this.invalidCredentials=false;
  this.required=false;
  if(this.CredentialForm.get('password')?.errors||this.CredentialForm.get('email')?.errors)
  {
    this.required=true;
  }
  else{
    this.required=false;
    let body:ILogin={UserId:this.CredentialForm.get("email")?.value,
    Password:this.CredentialForm.get("password")?.value};
    this.Loader_text="we are validating your credentials"
    let token:IToken;
    this.loginService.login(body).subscribe(
      data=>{
        this.Loader_text=null;
        token=data;
      },
      error=>{
        if(error.status==401)
        {
          this.Loader_text=null;
          this.invalidCredentials=true;
        }
      },
      ()=>{
       // console.log(JSON.parse(window.atob(token?.jwtToken.split('.')[1])))
      }
    )
    
  }
}

}
