import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Domain, domainAction } from 'src/app/Interfaces/Models/Domains';
import { AdminService } from 'src/app/services/admin.service';
import { BackdropnotifierService } from 'src/app/services/backdropnotifier.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-domains-view',
  templateUrl: './domains-view.component.html',
  styleUrls: ['./domains-view.component.css']
})
export class DomainsViewComponent implements OnInit {
  
    constructor(private adminService:AdminService,private toasterService:ToasterService,private route:ActivatedRoute,private backDropService:BackdropnotifierService){
        
    }
    ngOnInit(): void {
        this.route.data.subscribe(
            data=>
            {
                if(!data["id"])
                this.adminService.getDomains(0).subscribe(
            
            data=>{
                this.domains=data
            })

            }
        )
    }

popupState:boolean=false;
NewDomain:boolean=false;
domains:Domain[] = []
EditDomainCache:domainAction|null=null
saveDomain($event:string,status:string='Active'){
    this.popupState=false;
   let domain:Domain={
    domainId:this.EditDomainCache==null?0:(this.EditDomainCache.action=='rename'||this.EditDomainCache.action=="deleted")?this.EditDomainCache.domain.domainId:0,
    domainName:$event,
    parentDomainId:this.EditDomainCache==null?0:this.EditDomainCache.action=='create'?this.EditDomainCache.domain.domainId:(this.EditDomainCache.action=='rename'||this.EditDomainCache.action=="deleted")?this.EditDomainCache.domain.parentDomainId:0,
    subDomains:[],
    status:status
   }
   this.backDropService.text=" ";

   this.adminService.SaveDomains(domain).subscribe(
    data=>{
        if(this.EditDomainCache==null)
        {
      
        if(this.EditDomainCache==null)
        {
            this.domains.push(data)
            this.domains.sort((a,b)=>a.domainName>b.domainName?1:-1)
            this.toasterService.triggerToaster("domain Created SuccessFully")
        }
        }
        else if(this.EditDomainCache.action=="create")
        {
            this.EditDomainCache.domain.subDomains.push(domain)
            this.EditDomainCache.domain.subDomains.sort((a,b)=>a.domainName>b.domainName?1:-1)
            this.toasterService.triggerToaster("Sub-Domain Created SuccessFully")
        }
        else if(this.EditDomainCache.action=="rename")
        {
            this.EditDomainCache.domain.domainName=data.domainName
            this.toasterService.triggerToaster("Domain Updated SuccessFully")
        }
        else if(this.EditDomainCache.action=="deleted")
        {
            let index=this.EditDomainCache.parentDomain.indexOf(this.EditDomainCache?.domain);
            if(this.EditDomainCache)
            this.EditDomainCache.parentDomain[index]=null;
            this.toasterService.triggerToaster("Domain Deleted SuccessFully")
        }
        this.backDropService.text=null;
        this.EditDomainCache=null

    },
    
    error=>{

        this.toasterService.triggerToaster("some error occured")
        this.backDropService.text=null;
    }
   
)
}

   ManageDomain(domainAction:domainAction)
   {
    debugger
   this.EditDomainCache=domainAction;
   if(domainAction.action=="create")
   {
   this.NewDomain=true;
   this.popupState=true
   }
   else if(domainAction.action=="rename")
   {
    this.NewDomain=false;
    this.popupState=true
   }
   else if(domainAction.action=="deleted")
   {
    this.EditDomainCache=domainAction;
    this.saveDomain(this.EditDomainCache.domain.domainName,"Deleted");

   }

   
    }

}
