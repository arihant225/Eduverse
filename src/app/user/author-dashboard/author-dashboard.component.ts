import { Component,OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inquery, InstitutionalStatus, ManageInstitue } from 'src/app/Interfaces/Inquery';
import { AuthorService } from 'src/app/services/author.service';
import { BackdropnotifierService } from 'src/app/services/backdropnotifier.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-author-dashboard',
  templateUrl: './author-dashboard.component.html',
  styleUrls: ['./author-dashboard.component.css']
})
export class AuthorDashboardComponent implements OnInit {
  public InstitutionalStatus=InstitutionalStatus
  public SelectedInstituteCache:Inquery[]=[];
  constructor(private authorService:AuthorService,public tosterService:ToasterService,public route:ActivatedRoute,public router:Router,private loaderService:BackdropnotifierService,private toasterService:ToasterService)
 {
  this.route.params.subscribe(
    data=>{
      if(data['type'])
      this.ViewInstituteItem(data['type'])
    }
  )

 } 
 
 keys:string[]=[];
 stats:any={};
 headings:any={
  "Active": "Active Institutes",
  "Blocked": "Blocked Institutes",
  "Inactive": "Inactive Institutes",
  "Total": "Total Institutes",
  "Query": "Institutes Needing Activation",
  "CredentialCreated": "Institutes with Issued Credentials",
  "Withdrawn": "Withdrawn Proposals",
  "Activate": "Institutes Needing Activation",
  "Rejected": "Rejected Proposals"
}

 instituteName:string="";
 filterInstitutes(){
  this.selectAllState=false;
  this.filteredInstitutes=[]

this.filteredInstitutes=this.allInstitutes.filter(obj=>obj.instituteName.toLowerCase().includes(this.instituteName.toLowerCase())||obj.emailId.toLowerCase().includes(this.instituteName.toLowerCase()))
 }

 ngOnInit(): void {
   this.authorService.getStats().subscribe(
    data=>{
      this.keys=Object.keys(data);
      this.stats=data;
    }
   )
 }
 
 filteredInstitutes:Inquery[]=[];
 allInstitutes:Inquery[]=[];
 ViewInstituteItem(item: string) {
  if(this.stats[item]==0)
  {
    this.tosterService.triggerToaster(`No ${item} Institute Exists`)
    return;
  }
  this.authorService.searchInstitute(item).subscribe(data=>{
  data.forEach(obj=>{
    if(obj.path){
      this.authorService.getImage(obj.path).subscribe(
        data=>{

          obj.imgUrl=URL.createObjectURL(data);
        }
      )
    }
   })
   this.instituteName="";
  this.allInstitutes=data;
  this.filterInstitutes()

  })
  this.router.navigate(["/dashboard/Search/institute",item])
  }
  path(){
  return window.location.hash
  }
  isRootPath(){
    return window.location.hash.split("/").length==2;
  }
  isInstituteSearchPath(){
    return window.location.hash.split("/").includes("Search")
  }

  ActionEnabledForQuery()
  {
    return window.location.hash.split("/").includes("Query");
  }
  
  ActionEnabledForTotal()
  {
    return window.location.hash.split("/").includes("Total");
  }
  ActionEnabledForInActive()
  {
    return window.location.hash.split("/").includes("Inactive");
  }
  ActionEnabledForActive()
  {
    return window.location.hash.split("/").includes("Active");
  }
  selectAllState:boolean=false;
  selectAllInstitute(){
    
    this.selectAllState=!this.selectAllState;
    if(this.selectAllState)
    {
      this.filteredInstitutes.forEach(ele=>{
        if(!this.SelectedInstituteCache.includes(ele))
        this.SelectedInstituteCache.push(ele);
      })

    }
    else
    this.SelectedInstituteCache=[];

  }
  selectInstitute(institute:Inquery){
    if(this.SelectedInstituteCache.includes(institute))
    {
      this.SelectedInstituteCache=this.SelectedInstituteCache.filter(ref=>ref!=institute);
    }
    else{
      this.SelectedInstituteCache.push(institute)
    }
  }

  viewProposal(key:Inquery)
  {
    this.router.navigate(['dashboard/viewProposal',key.accessor])
  }

  ManageInstitute(proposals:(string|undefined)[],action:InstitutionalStatus){
    this.loaderService.text="Wait while we are updating the Institutes for You";
    let Body:ManageInstitue={
      proposals:proposals?proposals:[],
      action:action,
      inqueries:[]
    }
    this.authorService.ManageInstitutes(Body).subscribe(
      data=>{
        data.inqueries.forEach(
        institute=>{
          let inst=this.allInstitutes.filter(data=>data.accessor==institute.accessor)[0]
        inst.accessor=institute.accessor;
        inst.status=institute.status;
        inst.emailId=institute.emailId;
           
        }
        )
        this.loaderService.text=null;
        this.toasterService.triggerToaster(`${data.inqueries.length} / ${proposals.length}   institute has be updated`)
      },
      err=>{
        this.loaderService.text=null;
        this.toasterService.triggerToaster("Some error has been occured");
      }
    )
  }
  ActionsOnSelectedLender(action:InstitutionalStatus)
  {
    if(this.SelectedInstituteCache.length==0)
    {
      this.toasterService.triggerToaster("No Institute Selected"); }
    else{
     let proposals=this.SelectedInstituteCache.filter(ele=>ele.accessor).map(ele=>ele.accessor);
     this.ManageInstitute(proposals,action)
    }
  }
}
