import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ToasterComponent } from '../widgets/toaster/toaster.component';
import { ToasterService } from 'src/app/services/toaster.service';
import { BackdropnotifierService } from 'src/app/services/backdropnotifier.service';
import { IOtpRequest } from 'src/app/Interfaces/Models/Request/IOtpRequest';
import { OtpService } from 'src/app/services/otp-services.service';
import { Inquery } from 'src/app/Interfaces/Inquery';
import { InqueryService } from 'src/app/services/inquery.service';
import { Route, Router } from '@angular/router';
interface InstituteEnquiryInterface{
  InstituteName:FormControl,
  Logo:FormControl,
  Email:FormControl,
  TypeOfInstitute:FormControl,
  PhoneNo:FormControl,
  websiteUrl:FormControl,
  comment:FormControl;
}


@Component({
  selector: 'app-become-ahost',
  templateUrl: './become-ahost.component.html',
  styleUrls: ['./become-ahost.component.css']
})

export class BecomeAhostComponent {
  InstituteEnquiryForm:FormGroup=new FormGroup<InstituteEnquiryInterface>({
    InstituteName:new FormControl("",[Validators.required]),
    TypeOfInstitute:new FormControl("",[Validators.required]),
    Email:new FormControl("",[Validators.required,Validators.email]),
    Logo:new FormControl("",[Validators.required]),
    PhoneNo: new FormControl("",[Validators.pattern("[0-9]{10,10}")]),
    websiteUrl:new FormControl("",[]),
    comment:new FormControl("",[])
  });
  otpSectionEnabled:boolean=false
  invalidOtp:boolean=false;
 file:File=new File([],"");
 proceedForOtpCheck(){
  this.otpSectionEnabled=true;
}
  constructor(public toasterService:ToasterService,private inqueryService:InqueryService,private backdropnotifierService:BackdropnotifierService,private otpService:OtpService,private route:Router)
  { 
   
    
    
    if(this.toggle)
    {
      this.TempFeatures=this.Features.slice(0,6);
    }
   
    setInterval(() => {
      this.toggle=!this.toggle
      if(this.toggle)
      {
        this.TempFeatures=this.Features.slice(0,6);
      }
      else
      this.TempFeatures=this.Features.slice(6);
    }, 12000);

  }
   Features: string[] = [
    'Course Management',
    'Content Organization',
    'User Administration',
    'Assessment and Evaluation',
    'Progress Tracking and Reporting',
    'Communication and Collaboration',
    'Mobile Compatibility',
    'Analytics and Insights',
    'Integration and Customization',
    'Security and Access Control',
    'Content Delivery and Scheduling',
    'Automated User workFlow'
];
toggle:boolean=true;

TempFeatures:string[]=[];
url='/assets/institute-logo.png';
fileupload($blob:any){
   
  if($blob)
  {
    let list:FileList=$blob.files;
    let img:File|null=list.item(0)
    if(img)
    {
      this.InstituteEnquiryForm.controls['Logo'].setValue(img)
      this.file=img;
    this.url=URL.createObjectURL(img);
    }
  }
}
errors():boolean{
  for(let obj in this.InstituteEnquiryForm.controls)
  {
    if(this.InstituteEnquiryForm.controls[obj].errors?.['required']){
    this.toasterService.triggerToaster("Error:  Please Fill Mandatory Fields - "+obj)
    return true;
    }
    else if(this.InstituteEnquiryForm.controls[obj].errors){
      this.toasterService.triggerToaster("Error:  Please Enter a valid Field - "+obj)
      return true;
      }
  }
  return false;

}
save(){
  if(this.errors())
  return
  else{
 

    this.proceedForOtpCheck();
    let body:IOtpRequest={
      Id:this.InstituteEnquiryForm.controls['Email'].value,
      UserName:this.InstituteEnquiryForm.controls['InstituteName'].value,
      Method:"mail",
      code:0,
    }
    this.backdropnotifierService.text="we sent you an otp on "+this.InstituteEnquiryForm.controls['Email'].value
    this.inqueryService.generateOtpForAddInquery(body).subscribe(
      data=>
      {
       this.backdropnotifierService.text=null;
      },
      null,
      ()=>{
        this.proceedForOtpCheck();
      }
    )
  }
}

submitOtp(otp:string){
  this.invalidOtp=false;
  if(otp.length==6)
  {
    this.backdropnotifierService.text="We are verifying the otp for you"
    
    
    let body:IOtpRequest={
      Id:this.InstituteEnquiryForm.value['Email'],
      UserName:this.InstituteEnquiryForm.value['InstituteName'],
      Method:"mail",
      code:0,
      RequestedOtp:parseInt(otp),
      Time:new Date()
  }
    this.otpService.VerifyOtpForSignUpMail(body).subscribe(
      data=>{

       if(data.isAuthenticate)
       {
        this.submitForm();
       }
       else{
        this.backdropnotifierService.text=null;
        this.invalidOtp=true;
        this.toasterService.triggerToaster("Invalid OTP- please enter a valid otp")
       } 
      },err=>{
      
      },
      ()=>{
        }
    )
  }
  

}

submitForm(){
  this.otpSectionEnabled=false;
  this.backdropnotifierService.text= "OTP Verified, we are submitting query For you ."
 
  let body:Inquery={
    
    url:this.InstituteEnquiryForm.value['websiteUrl'],
    img:this.file,
    instituteName:this.InstituteEnquiryForm.value['InstituteName'],
    emailId:this.InstituteEnquiryForm.value['Email'],
    phoneNo:this.InstituteEnquiryForm.value['PhoneNo'],
    comment:this.InstituteEnquiryForm.value['comment'],
    instituteType:this.InstituteEnquiryForm.value['TypeOfInstitute']
  }
  let accessor:any;
  this.inqueryService.addInquery(body).subscribe(
   
    data=>{
      accessor=data;
    },null,
    ()=>{
      this.backdropnotifierService.text="query sent successfully";
setTimeout(()=>{
this.backdropnotifierService.text=null;
this.route.navigate(['/viewProposal',accessor.value])
},1000)
    }
  )

}
}
