import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserPrompt } from 'src/app/Functionality/Prompt';
import { BackdropnotifierService } from 'src/app/services/backdropnotifier.service';
import { OtpService } from 'src/app/services/otp-services.service';
import { SignupService } from 'src/app/services/signup.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public prompt = "";
  public errorPrompt: string | null = null;
  public signUpPrompts: UserPrompt;
  public promptInput = new FormControl("", []);
  constructor(private formBuilder: FormBuilder, private otpService: OtpService,private signupService:SignupService,public router:Router,private backdropNotifier:BackdropnotifierService) {
    this.signUpPrompts = new UserPrompt(this.otpService,signupService,this.router,this.backdropNotifier);
  }

  async ngOnInit(){
   await this.signUpPrompts.next();

    this.signUpPrompts.currentPrompt.subscribe(d => {
      this.prompt = d;
    })
    this.promptInput = this.signUpPrompts.controls[this.signUpPrompts.currentIndex];
    let inputPromptId = document.getElementById("input-prompt")
    inputPromptId?.click();

  }
  public promptInputEvents(event: KeyboardEvent) {
    if (event.code.toString() == 'Enter') {
      let nextButton = document.getElementById("nextButton")
      nextButton?.click();
    }

  }
  public async next() { 
 
    if (this.signUpPrompts.currentIndex == 3) {
      let tempMessage=this.signUpPrompts.errorMessages[this.signUpPrompts.currentIndex];
      if (this.promptInput.value?.length!=6)
      {
       await  this.signUpPrompts.next();
      }
      else{
        this.backdropNotifier.text = "We are verifying  Otp for you "
        let Obj=await this.signUpPrompts.checkOtpForMail()
        if(Obj.body?.isAuthenticate)
        {
          this.signUpPrompts.Otps.mail=true;
        }
        else{
          this.signUpPrompts.readOnly[this.signUpPrompts.currentIndex]=false;
          this.promptInput.setValue("");
          this.signUpPrompts.errorMessages[this.signUpPrompts.currentIndex]=Obj.body?.message||'';
          this.backdropNotifier.text=null;
       
        }
        this.backdropNotifier.text=null;
      }
      await this.signUpPrompts.next();
      this.signUpPrompts.currentPrompt.subscribe(d => {
        this.prompt = d;
      })
      this.signUpPrompts.errorPrompt.subscribe(d => {
        this.errorPrompt = d;
      })
      if(this.signUpPrompts.currentIndex != 3)
      {
        this.signUpPrompts.errorMessages[this.signUpPrompts.currentIndex-1]=tempMessage;
        this.promptInput = this.signUpPrompts.controls[this.signUpPrompts.currentIndex];
      }
      return;
    }
    await this.signUpPrompts.next();
    if (this.signUpPrompts.currentIndex == 3) {
      this.backdropNotifier.text = "We sent you an Otp on your mail"
      let obj = await this.signUpPrompts.generateOtpForMail()
      this.backdropNotifier.text = null;
    }

    this.promptInput = this.signUpPrompts.controls[this.signUpPrompts.currentIndex];
    this.signUpPrompts.currentPrompt.subscribe(d => {
      this.prompt = d;
    })
    this.signUpPrompts.errorPrompt.subscribe(d => {
      this.errorPrompt = d;
    })


  }
  public back() {
    this.signUpPrompts.prev()
    this.promptInput = this.signUpPrompts.controls[this.signUpPrompts.currentIndex];

    this.signUpPrompts.currentPrompt.subscribe(d => {
      this.prompt = d;
    })
  }
  public async regenerateOtp(){
    this.backdropNotifier.text = "We sent you an Otp on your mail"
      let obj = await this.signUpPrompts.generateOtpForMail()
      this.backdropNotifier.text = null;
  }
  public editInputPrompt(){
    this.signUpPrompts.readOnly[this.signUpPrompts.currentIndex]=!this.signUpPrompts.readOnly[this.signUpPrompts.currentIndex]
  }


}


