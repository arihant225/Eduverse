import { FormControl, Validators } from "@angular/forms";
import { Observable, Subject, interval } from "rxjs";
import { IOtpRequest } from "../Interfaces/Models/Request/IOtpRequest";
import { OtpService } from "../services/otp-services.service";
import { IOtpResponse } from "../Interfaces/Models/Response/IOtpResponse";

export class UserPrompt {
    public values: string[] = [];
    public currentIndex: number = -1;
    public currentPrompt: Subject<string> = new Subject<string>();
    public errorPrompt: Subject<string|null> = new Subject<string|null>();
    public currentPromptIntervalRef:any;
    public currentErrorPromptInterval:any;

    constructor(private otpServices:OtpService) {
        for (let prompt of this.prompts) {
            this.values.push("");
        }

    }
    public prompts: string[] = [
        "Sure, let's get started with your registration process. I'll guide you through the necessary steps to complete your registration.",
        "Please provide your full name in the format of [First Name] [Last Name].",
        "Kindly enter the email address you would like to use for your registration.",
        "An OTP (One-Time Password) has been sent to the email address you provided. Please check your inbox and enter the OTP here to verify your email.",
        "Please enter your phone number, including the country code if applicable.",
        "Choose a password for your account. Please ensure it meets the required criteria, such as having a minimum length, containing both letters and numbers, etc.",
        "To ensure there are no typos, please re-enter your chosen password for confirmation.",
        "If you have a referral code, please let us know. A referral code is a unique identifier that may provide you with certain benefits or bonuses.",
        "Please indicate whether you are signing up as an individual (self) or on behalf of an institution (organization, company, etc.)."
    ];
    public controls: FormControl[] = [
        new FormControl('', []),
        new FormControl('', [Validators.required, Validators.pattern(/^.*\s.*$/)]),
        new FormControl('', [Validators.required, Validators.email]),
        new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]),
        new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
        new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)]),
        new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)]),
        new FormControl('', []),
        new FormControl('', [])
    ];

    public errorMessages: string[] = [
        "",
        "Please enter your full name.",
        "Please enter a valid email address.",
        "Please enter a valid OTP (6-digit number).",
        "Please enter a valid phone number (10-digit number).",
        "Please enter a valid password (minimum 8 characters, at least one letter, one number, and one special character).",
        "Please confirm your password.",
        "",
        ""
    ];

    public checkError() {
        if (this.controls[this.currentIndex].errors) {
            this.typeError();
            return true;
        }
        else
            return false;
    }
    public next() {
       
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
        if (this.currentIndex >= this.prompts.length - 1) {
            return;
        }
        
       
        if (this.currentIndex >= 0 && this.checkError())
            return;
            this.errorPrompt.next(null)
       
        this.currentIndex++;
        this.typePrompt();
    }
    public prev() {
        
       
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
        if (this.currentIndex <= 0) {
            return;
        }
        this.currentIndex--;
        this.typePrompt();
    }
    public save(val: string) {

        this.values[this.currentIndex] = val;

    }

    public typePrompt() {
       
        let prompt = this.prompts[this.currentIndex];
        let tempPrompt = "";
        let tempIndex = 0;
        this.currentPromptIntervalRef = setInterval(() => {
            if (tempIndex >= prompt.length - 1) {
                clearInterval(this.currentPromptIntervalRef);
                
            }
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
                   
                    resolve({body:null,success:false})
                }
            )

        }) 
    }


}