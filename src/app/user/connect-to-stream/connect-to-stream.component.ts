import { Component, OnInit, Renderer2 } from '@angular/core';
import { IStreams } from 'src/app/Interfaces/Models/Response/IStreams';
import { Globalservice } from 'src/app/services/globalservice.service';
import {  streamService } from 'src/app/services/stream.service';

@Component({
  selector: 'app-connect-to-stream',
  templateUrl: './connect-to-stream.component.html',
  styleUrls: ['./connect-to-stream.component.css']
})
export class ConnectToStreamComponent implements OnInit {

  constructor(private dashboardService:streamService,private renderer:Renderer2){

  }

sliderIndex:number=0
slides:any[]=[]
streams:IStreams[]=[];
streamToShow:IStreams[]=[]
ngOnInit(): void {
  this.dashboardService.getAllStreams().subscribe(data=>{
    data.forEach(res=>{
      if(res.public==2)
    {

      this.slides.push(
        {
          
          text:res.streamerDescription,
          paid:res.paid,
          amount:res.price,
          name:res.streamerName,
          poster:res.image,
        }
      )
      


    }

      this.streams.push(res);
      
    
  
  })
    
  },
  null,
  ()=>{
this.streams.forEach(res=>
  {
    res.color={
      rgb:`rgba(${Math.floor(Math.random()*124)},${Math.floor(Math.random()*124)},${Math.floor(Math.random()*124)},0.8)`
    }
  }
)
this.streams.sort((a,b)=>a.price>b.price?-1:1)
    setInterval(() => {
      if(this.sliderIndex>=this.slides.length-1)
      this.sliderIndex=0;
      else
      this.sliderIndex++;
    }, 8000);
    this.streamToShow=this.streams;
    

  }
) 
}



find(val:string)
{
  if(!val&&val=="")
  {
    this.streamToShow=this.streams;
    return 
  }
  else{
    this.streamToShow=this.streams.filter(ele=>ele.streamerName.includes(val)||ele.streamerDescription.includes(val));
  }
  
}
}
