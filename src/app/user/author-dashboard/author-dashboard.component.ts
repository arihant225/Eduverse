import { Component,OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inquery } from 'src/app/Interfaces/Inquery';
import { AuthorService } from 'src/app/services/author.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-author-dashboard',
  templateUrl: './author-dashboard.component.html',
  styleUrls: ['./author-dashboard.component.css']
})
export class AuthorDashboardComponent implements OnInit {

  public SelectedInstituteCache:Inquery[]=[];
  constructor(private authorService:AuthorService,public tosterService:ToasterService,public route:ActivatedRoute,public router:Router)
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
 instituteName:string="";
 filterInstitutes(){
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
    debugger;
    this.router.navigate(['dashboard/viewProposal',key.accessor])
  }
}
