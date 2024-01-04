import { Component,OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-dashboard',
  templateUrl: './author-dashboard.component.html',
  styleUrls: ['./author-dashboard.component.css']
})
export class AuthorDashboardComponent implements OnInit {
  constructor(private authorService:AuthorService)
 {} 
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
 
}
