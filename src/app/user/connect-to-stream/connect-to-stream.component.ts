import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connect-to-stream',
  templateUrl: './connect-to-stream.component.html',
  styleUrls: ['./connect-to-stream.component.css']
})
export class ConnectToStreamComponent implements OnInit {

sliderIndex:number=0
slides:any[]=[{
  text:"Join the stream for free to engage in multiple Tech discussion, and enhance your knowledge.",
  paid:false,
  amount:0,
  name:"Evolve and Discuss",
  poster:false

},
{
  text:"Join the stream if you are looking for ultimate hub of JEE Hub .",
  paid:false,
  amount:0,
  name:"JEE with Eduverse",
  poster:false

},
{
  text:"Join the stream if you are looking for ultimate hub of NEET Hub .",
  paid:false,
  amount:0,
  name:"NEET with Eduverse",
  poster:false

},
{
  text:"Join the stream for multiple quizes.",
  paid:false,
  amount:0,
  name:"QUIZ with Eduverse",
  poster:false

},

{
  text:"Access the stream for free to engage in multiple Tech discussion, and enhance your knowledge.",
  paid:false,
  amount:0,
  name:"Ed and Tech",
  poster:false

}
]
constructor(){
  
  
}
ngOnInit(): void {
  
  setInterval(() => {
    if(this.sliderIndex>=this.slides.length-1)
    this.sliderIndex=0;
    else
    this.sliderIndex++;
  }, 8000);
  
}
}
