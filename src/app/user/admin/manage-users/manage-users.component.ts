import { Component, Input } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { BackdropnotifierService } from 'src/app/services/backdropnotifier.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {

  UploadHelper:boolean=false;
  @Input() userType:"Admin"|"User"|"Tutor"="User"

  constructor(private adminService:AdminService,private backdropService:BackdropnotifierService,private toasterService:ToasterService){

  }
   patterns= {
    username: "^[a-zA-Z0-9_]{3,20}$",
    firstname: "^[a-zA-Z ]+$",
    lastname: "^[a-zA-Z ]+$",
    email: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
  }
  edit:boolean=true;
  userData:any[]=[]
  userKeys:string[]=[]
  getCredentialsFromXlsx($event:any){
    this.UploadHelper=false;
    if($event==null)
    {
      this.userData=[];
      this.userKeys=[];
      return
    }
  
    let file:File=$event.target.files[0];
  
    if(!file.name.toLowerCase().includes("csv"))
    {
  
      this.toasterService.triggerToaster("uploaded file is not csv. please ensure you are uploading csv file");
      return;
    }
    
    this.backdropService.text='Processing....';
    this.adminService.compileFile(file,"csv").subscribe(
      data=>{
        let keys=["username", "firstname", "lastname", "email"]
        
        
        if(data!=null&&data.length)
        for(let key of Object.keys(data[0])){
        if(!keys.includes(key.toLowerCase()))
        {
          this.toasterService.triggerToaster("invalid attribute in csv file");
          return;
        }
        else if(Object.keys(data[0]).length<3)
        {
          this.toasterService.triggerToaster("invalid attribute in csv file");
          return;

        }
      }
      
      
        this.userKeys=Object.keys(data[0]);
        this.userData=data;
        console.log(this.userData)
        this.toasterService.triggerToaster("csv Parsed Successfully");
      },err=>{
        
        this.toasterService.triggerToaster("error in parsing csv");
        this.backdropService.text=null
      },()=>{
        this.backdropService.text=null
        
      }
    )
  }
  uploadCsv(){
    this.UploadHelper=true
  }
  removeCandidate(ref:any)
  {
    this.userData=this.userData.filter(obj=>obj!=ref)

  }
  testAttributes(data:string,key:string,obj:any)
  {

    if(Object.keys(this.patterns).includes(key.toLowerCase()))
    {
      
    let regex:RegExp=new RegExp(Object.getOwnPropertyDescriptor(this.patterns,key.toLowerCase())?.value);
       
    
    return !regex.test(obj[key]);
  


    }
  return false
  }
  changeData(key:string,value:string,obj:any)
  {
  
    obj[key]=value;

  }
}
