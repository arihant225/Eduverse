import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-otp-verifier',
  templateUrl: './otp-verifier.component.html',
  styleUrls: ['./otp-verifier.component.css']
})
export class OtpVerifierComponent {

  @Input('id') id:string=''
  @Output() cancel:EventEmitter<any>=new EventEmitter();
  @Output() submitOtp:EventEmitter<string>=new EventEmitter();
  @Input('invalidOtp') invalidOtp:boolean=false;
  otpIndex=0;
  otpText:string[]=['','','','','','']
  

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

}
