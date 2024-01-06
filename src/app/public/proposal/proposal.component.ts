import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inquery } from 'src/app/Interfaces/Inquery';
import { InqueryService } from 'src/app/services/inquery.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})
export class ProposalComponent {
  inquery:Inquery|null=null;
  constructor(public activatedRoue:ActivatedRoute,private inqueryService:InqueryService)
  {
    this.activatedRoue.params.subscribe(
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

}
