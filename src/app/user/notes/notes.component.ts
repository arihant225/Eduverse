import { Component, QueryList } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {OnInit} from '@angular/core' 
import { Router } from '@angular/router';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit  {

public time:Date=new Date();
  constructor(public userService:UserService,public router:Router){}
  ngOnInit(): void {
    setInterval(()=>{
this.time=new Date();
    },1000)
  }
  newNote(){
    this.router.navigate(["/dashboard/newnotes"],{queryParams:{editable:true}})
  }
}
