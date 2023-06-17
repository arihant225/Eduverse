import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserPrompt } from 'src/app/Functionality/Prompt';
import { IFormAttributes } from 'src/app/Interfaces/IFormAttributes';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public prompt="";
  public errorPrompt:string|null=null;
  public signUpPrompts:UserPrompt=new UserPrompt();
  public promptInput=new FormControl("",[]);
  constructor(private formBuilder:FormBuilder) {
 
  }
  
  ngOnInit(): void { 
   
    this.signUpPrompts.next();
  
    this.signUpPrompts.currentPrompt.subscribe(d=>{
      this.prompt=d;
    })


  }
  public next(){
    this.signUpPrompts.next();
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


