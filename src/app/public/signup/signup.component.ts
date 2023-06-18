import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserPrompt } from 'src/app/Functionality/Prompt';
import { OtpService } from 'src/app/services/otp-services.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public prompt="";
  public Loader_text:string|null=null;
  public errorPrompt:string|null=null;
  public signUpPrompts:UserPrompt;
  public promptInput=new FormControl("",[]);
  constructor(private formBuilder:FormBuilder,private otpService:OtpService) {
    this.signUpPrompts=new UserPrompt(this.otpService);
 
  }
  
  ngOnInit(): void { 
   
    
    this.signUpPrompts.next();
  
    this.signUpPrompts.currentPrompt.subscribe(d=>{
      this.prompt=d;
    })

    let inputPromptId=document.getElementById("input-prompt")
    inputPromptId?.focus();
    inputPromptId?.click();

  }
  public promptInputEvents(event:KeyboardEvent){
    if(event.code.toString()=='Enter')
    {
      let nextButton=document.getElementById("nextButton")
    nextButton?.click(); 
    }

  }
  public async next(){
    this.signUpPrompts.next();
    if(this.signUpPrompts.currentIndex==3)
    {
this.Loader_text="We sent you an Otp on your mail"
let obj=await this.signUpPrompts.generateOtpForMail()
this.Loader_text=null;
}

      this.promptInput=this.signUpPrompts.controls[this.signUpPrompts.currentIndex];
      this.signUpPrompts.currentPrompt.subscribe(d=>{
        this.prompt=d;
      })
      this.signUpPrompts.errorPrompt.subscribe(d=>{
        this.errorPrompt=d;
      })
   

  }
  public back(){
    this.signUpPrompts.prev()
    this.promptInput=this.signUpPrompts.controls[this.signUpPrompts.currentIndex];
   
    this.signUpPrompts.currentPrompt.subscribe(d=>{
      this.prompt=d;
    })
  }

  private passwordCheck(password:FormControl){
  }
  }

