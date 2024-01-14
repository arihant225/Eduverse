import { AbstractControl, FormControl, FormControlState, Validators } from "@angular/forms";
import { Observable, Subject, interval } from "rxjs";
import { IOtpRequest } from "../Interfaces/Models/Request/IOtpRequest";
import { OtpService } from "../services/otp-services.service";
import { IOtpResponse } from "../Interfaces/Models/Response/IOtpResponse";
import { SignupComponent } from "../public/signup/signup.component";
import { SignupService } from "../services/signup.service";
import { OnDestroy } from "@angular/core";
import { ICredentials } from "../Interfaces/Models/Request/ICredentials";
import { Router } from "@angular/router";
import { BackdropnotifierService } from "../services/backdropnotifier.service";

export class UserPrompt  {
    public values: string[] = [];
    public currentIndex: number = -1;
    public currentPrompt: Subject<string> = new Subject<string>();
    public errorPrompt: Subject<string|null> = new Subject<string|null>();
    public currentPromptIntervalRef:any;
    public currentErrorPromptInterval:any;
    public Otps={mail:false,phone:false}
    public readOnly:boolean[]=[ 
    ]
    constructor(private otpServices:OtpService,private signupService:SignupService,private router:Router,private backdropNotifier:BackdropnotifierService) {
        for (let prompt of this.prompts) {
            this.values.push("");
            this.readOnly.push(false)
        }
        this.controls[2].valueChanges.subscribe(d=>{
            this.controls[3].setValue("");
           this.Otps.mail=false;
        })

    }
    public prompts: string[] = [
        "Sure, let's get started with your registration process. I'll guide you through the necessary steps to complete your registration.",
        "Please provide your full name.",
        "Kindly enter the email address for your registration.",
        "An OTP (One-Time Password) has been sent to your registered  email And it will be valid for 5 Min. . ",
        "Please enter your phone number.",
        "Choose a password for your account.",
        "Please re-enter your chosen password for confirmation.",
        "Any referal Code that you have [optional]."
    ]
    public controls: FormControl[] = [
        new FormControl('', []),
        new FormControl('', [Validators.required, Validators.pattern(/^.*\s.*$/)]),
        new FormControl('', [Validators.required, Validators.email]),
        new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
        new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
        new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)]),
        new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)]),
        new FormControl('', []),

    ];

    
    public inputtype:string[]=["text","text","mail","number","tel","password","password","text"]

    public errorMessages: string[] = [
        "",
        "Please enter your full name.",
        "Please enter a valid email address.",
        "Please enter a valid OTP (6-digit number).",
        "Please enter a valid phone number (10-digit number).",
        "Please enter a valid password (minimum 8 characters, at least one letter, one number, and one special character).",
        "Please ensure you reentering the right Password.",
        ""
    ];

    public checkError() {
        if(this.currentIndex==6 && this.controls[this.currentIndex].value!=this.controls[this.currentIndex-1].value)
        {
            this.typeError();
            return true;
        }
        if (this.controls[this.currentIndex].errors) {
            this.typeError();
            return true;
        }
        else
            return false;
    }
    public async next() {
       
        if (this.currentIndex >= this.prompts.length - 1) {
           this.backdropNotifier.text="Kindly wait we are setting up the account for you."
            let credential:ICredentials={
                Name:this.controls[1].value,
                EmailId:this.controls[2].value,
                PhoneNumber:this.controls[4].value,
                Password:this.controls[5].value,
                Role:'',
                EduverseId:''
            }
            this.signupService.createCredentials(credential).subscribe(
                data=>{
                    if(data){
                        this.backdropNotifier.text=null;
                        alert("Account Created!!! kindly login with your credentials");
                        this.router.navigate(["/login"])
                    }
                },
                error=>{
              
                    alert("We can not create the account at this time, please try once later");
                    this.backdropNotifier.text=null;
                    this.router.navigate(["/login"])
                },
                ()=>{
                    
                }
            )
            return;
        }

        if (this.currentIndex >= 0 && this.checkError())
        return;
       
      
        this.backdropNotifier.text="Processing..........."
        if(this.currentIndex==2&&this.Otps.mail)
        {
            this.currentIndex=3;
        }
        if(this.currentIndex==2)
        {
           let canContinue= await this.signupService.canContinueWithEmail(this.controls[this.currentIndex].value);
           if(!canContinue)
           {
            if(confirm("OOPS!! It seems that you already have account with this email. Do you want to continue signing In with this email?"))
            {
                this.router.navigate(['/login'])
            }
            else{
                this.readOnly[this.currentIndex]=false;
            }
            
            this.backdropNotifier.text=null;
            return;
           }
        }
        else if(this.currentIndex==4)
        {
            let canContinue= await this.signupService.canContinueWithPhone(this.controls[this.currentIndex].value);
            if(!canContinue)
            {
             
            if(confirm("OOPS!! It seems that you already have account with this Phone No. Do you want to continue signing In with this Phone No?"))
            {
                this.router.navigate(['/login'])
            }
            else{
                this.readOnly[this.currentIndex]=false;
            }
            
            this.backdropNotifier.text=null;
             return;
            }

        }
        
        this.backdropNotifier.text=null;
        this.errorPrompt.next(null);
        if(this.currentErrorPromptInterval)
        {
            clearInterval(this.currentErrorPromptInterval)
        }
        if(this.currentPromptIntervalRef)
        {
            clearInterval(this.currentPromptIntervalRef)
        }
        this.currentPrompt.complete();
        this.currentPrompt=new Subject<string>();
        this.errorPrompt.complete();
        this.errorPrompt=new Subject<string|null>();
 
        this.currentPrompt=new Subject<string>();
            this.readOnly[this.currentIndex]=true;
            this.errorPrompt.next(null)
       
        this.currentIndex++;
        this.typePrompt();
    }
    public prev() {
      
        if (this.currentIndex <= 1) {
            return;
        }
        if(this.currentIndex==4&&this.Otps.mail)
        {
            this.currentIndex=3;
        }
        this.errorPrompt.next(null);
        if(this.currentErrorPromptInterval)
        {
            clearInterval(this.currentErrorPromptInterval)
        }
        if(this.currentPromptIntervalRef)
        {
            clearInterval(this.currentPromptIntervalRef)
        }
        this.currentPrompt.complete();
        this.currentPrompt=new Subject<string>();
        
        this.currentIndex--;
        this.typePrompt();
    }
    public save(val: string) {

        this.values[this.currentIndex] = val;

    }
    

    public typePrompt() {
        let username=""
        if (this.currentIndex>1&&this.controls[1].value?.length){
            username="HI " + this.controls[1].value.split(" ")[0] +",";
        }
       
        let prompt = username+this.prompts[this.currentIndex];
        let tempPrompt = "";
        let tempIndex = 0;
        this.currentPromptIntervalRef = setInterval(() => {
            if (tempIndex >= prompt.length - 1) {
                clearInterval(this.currentPromptIntervalRef);
                
            }
            if(username!=""&&tempIndex==username.length)
            {
               tempPrompt+='<br><br>'
            }
            if(prompt[tempIndex])
            tempPrompt = tempPrompt + prompt[tempIndex++];
            this.currentPrompt.next(tempPrompt);



        }, 50)
    }
    public typeError() {
        let prompt = this.errorMessages[this.currentIndex];
        let tempPrompt = "<br><br><br>";
        let tempIndex = 0;
        this.currentErrorPromptInterval = setInterval(() => {
            if (tempIndex >= prompt.length - 1) {
                clearInterval(this.currentErrorPromptInterval);
               
            }
            if(prompt[tempIndex])
            tempPrompt = tempPrompt + prompt[tempIndex++];
            this.errorPrompt.next(tempPrompt);
        }, 50)


    }
    async generateOtpForMail():Promise<any>{
        
        let body:IOtpRequest={
            Id:this.controls[2].value,
            UserName:this.controls[1].value,
            Method:"mail",
            code:0,

        }

        return new Promise<any>((resolve,reject)=>{
            this.otpServices.generateOtpForSignUpMail(body).subscribe(
                d=>{

                    resolve({body:d,success:true})

                },
                error=>{
                    this.readOnly[this.currentIndex]=false;
                    resolve({body:null,success:false})
                }
            )

        }) 
    }
    async checkOtpForMail(){
        this.readOnly[this.currentIndex]=true;
            let body:IOtpRequest={
                Id:this.controls[2].value,
                UserName:this.controls[1].value,
                Method:"mail",
                code:0,
                RequestedOtp:parseInt(this.controls[3].value),
                Time:new Date()
    
            }
            return new Promise<any>((resolve,reject)=>{
                this.otpServices.VerifyOtpForSignUpMail(body).subscribe(
                    d=>{
                   
    
                        resolve({body:d,success:true})
    
                    },
                   
                    error=>{
                       
                    this.readOnly[this.currentIndex]=false;
                        resolve({body:null,success:false})
                    }
                             
                )
    
            })

        



    }


}