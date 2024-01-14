import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inquery, InstitutionalStatus } from 'src/app/Interfaces/Inquery';
import { IOtpRequest } from 'src/app/Interfaces/Models/Request/IOtpRequest';
import { BackdropnotifierService } from 'src/app/services/backdropnotifier.service';
import { InqueryService } from 'src/app/services/inquery.service';
import { OtpService } from 'src/app/services/otp-services.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})
export class ProposalComponent {
  inquery:Inquery|null=null;
  invalidOtp:boolean=false;
  otpSectionEnabled:boolean=false;
  public adminRole(){
   return UserService.IsSuperAdmin();
  }
  constructor(public activatedRoute:ActivatedRoute,private inqueryService:InqueryService,private toasterService:ToasterService,private backdropService:BackdropnotifierService,public userService:UserService,private otpService:OtpService)
  {
    this.activatedRoute.params.subscribe(
      data=>{
        if(data['proposal'])
        {
          this.inqueryService.SearchQuery(data['proposal']).subscribe(
            data=>{
              this.inquery=data;
              if(data.path)
              {
                this.inqueryService.getImage(data.path).subscribe(
                  data=>{
                    if(this.inquery)
                    this.inquery.imgUrl=URL.createObjectURL(data);
                  }
                )
              }
            }
          )
        }
      }
    )
  }
  submitOtp(otp:string)
  {
    this.invalidOtp=false;
    if(otp.length==6&&this.inquery)
    {
      this.backdropService.text="wait till we are validating otp for you"
      let body:IOtpRequest={
        Id:this.inquery.emailId,
        UserName:this.inquery.emailId,
        Method:"mail",
        code:0,
        RequestedOtp:parseInt(otp),
        Time:new Date()
    }
      this.otpService.VerifyOtpForSignUpMail(body).subscribe(
        data=>{
          if(data.isAuthenticate)
          {
            this.invalidOtp=false;
            this.backdropService.text="Otp Verfied!! wait till we are submitting the request for you";
            this.updateProposal(InstitutionalStatus.Withdrawn)

          }
        },
        err=>{
          this.invalidOtp=true;
          this.toasterService.triggerToaster("invalid OTP")
        }
      )

    }
    else{

    }
  }
  updateProposal(Action:InstitutionalStatus){
  
    switch(Action)
    {
      case InstitutionalStatus.Withdrawn:
        if(this.inquery!=null)
      this.inqueryService.WithdrawProposal(this.inquery.accessor).subscribe(
    data=>{
      window.location.reload();
    })
    }

    
  }
  doAction(action:string)
  {
    switch(action)
    {
      case "Withdraw":
        this.backdropService.text="We have sent Otp for verification to : "+this.inquery?.emailId;
        let body:IOtpRequest={
        Method:"mail",
        UserName:this.inquery?.instituteName,
        Id:this.inquery?.emailId
        }
        this.inqueryService.generateOtpForWithrawProposal(body,this.inquery?.accessor).subscribe(
          data=>{
            this.otpSectionEnabled=true;
            
          }
          ,null,
        ()=>{
        this.backdropService.text=null;
        }
        )
        break;
    }
  }

}
