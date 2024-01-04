import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ToasterComponent } from '../widgets/toaster/toaster.component';
import { ToasterService } from 'src/app/services/toaster.service';
import { BackdropnotifierService } from 'src/app/services/backdropnotifier.service';
interface InstituteEnquiryInterface{
  InstituteName:FormControl,
  Img:FormControl,
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
    Img:new FormControl("",[Validators.required]),
    PhoneNo: new FormControl("",[Validators.pattern("[0-9]{10,10}")]),
    websiteUrl:new FormControl("",[]),
    comment:new FormControl("",[])
  });
  otpIndex=0;
  otpText:string[]=['','','','','','']
  otpSectionEnabled:boolean=false

  otpEventHandler(event:KeyboardEvent){
    if(event.key>='0'&&event.key<='9')
    {
   
      
    this.otpText[this.otpIndex]=event.key;
    event.preventDefault(); 
      this.otpIndex++;
     
      
    }
    else if(event.key=='Backspace')
    return
  
  else if(event.key=='ArrowLeft')
  this.otpIndex=this.otpIndex<=1?0:this.otpIndex-1;
  else if(event.key=='ArrowRight')
  this.otpIndex=this.otpIndex>=5?5:this.otpIndex+1;
  else
  event.preventDefault()
  let ele=document.querySelectorAll('.otp-inp')[this.otpIndex]
  if(ele)
  {
  
    setTimeout(()=>{
    (ele as HTMLInputElement).focus();
  },0)
  }
    

  }
  constructor(public toasterService:ToasterService,private backdropnotifierService:BackdropnotifierService)
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
  debugger
  if($blob)
  {
    let list:FileList=$blob.files;
    let img:File|null=list.item(0)
    if(img)
    {
      this.InstituteEnquiryForm.controls['Img'].setValue(img)
    this.url=URL.createObjectURL(img);
    }
  }
}
errors():boolean{
  for(let obj in this.InstituteEnquiryForm.controls)
  {
    if(this.InstituteEnquiryForm.controls[obj].errors){
    this.toasterService.triggerToaster("Error:  Please Fill Mandatory Fields - "+obj)
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

    //this.backdropnotifierService.text="we sent you an otp on "+this.InstituteEnquiryForm.controls['Email'].value
  }
}
proceedForOtpCheck(){
  
  this.otpText=['','','','','','']
  this.otpIndex=0;
  this.otpEventHandler(new KeyboardEvent(''))
  this.otpSectionEnabled=true;
}
}
