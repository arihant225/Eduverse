import { Component,OnInit } from '@angular/core';
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

 ngOnInit(): void {
   this.authorService.getStats().subscribe(
    data=>{
      this.keys=Object.keys(data);
      this.stats=data;
    }
   )
 }
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
  this.allInstitutes=data;

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
}
