import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormAttributes } from 'src/app/Interfaces/IFormAttributes';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public FormAttributes:IFormAttributes[]=[
    {
      placeholder: "First Name",
      inputType: "text",
      icon: "bi-person",
      formControlName: "firstName",
      required: true,
      maxLength: 50,
    },
    {
      placeholder: "Last Name",
      inputType: "text",
      icon: "bi-person",
      formControlName: "lastName",
      required: true,
      maxLength: 50,
    },
    {
      placeholder: "Email Address",
      inputType: "email",
      icon: "bi-envelope",
      formControlName: "email",
      required: true,
      maxLength: 100,
    },
    {
      placeholder: "Phone Number",
      inputType: "tel",
      icon: "bi-telephone",
      formControlName: "phoneNumber",
      required: false,
      maxLength: 20,
    },
    {
      placeholder: "Password",
      inputType: "password",
      icon: "bi-lock",
      formControlName: "password",
      required: true,
      maxLength: 50,
    },
    {
      placeholder: "Confirm Password",
      inputType: "password",
      icon: "bi-lock",
      formControlName: "confirmPassword",
      required: true,
      maxLength: 50,
    },
    {
      placeholder: "Eduverse Institute Code",
      inputType: "text",
      icon: "bi-building",
      formControlName: "eduverseInstituteCode",
      required: false,
      maxLength: 20,
    },
    {
      placeholder: "Role/Position",
      inputType: "text",
      icon: "bi-briefcase",
      formControlName: "role",
      required: false,
      maxLength: 100,
    },
  ];
  /**
   *
   */
  constructor(private formBuilder:FormBuilder) {
        
  }
  public signupForm:FormGroup=this.formBuilder.group({})
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50),this.passwordCheck]],
      eduverseInstituteCode: ['', [Validators.maxLength(20)]],
      role: ['', [Validators.maxLength(100)]],
    });
  }
  private passwordCheck(password:FormControl){

  }
  }


