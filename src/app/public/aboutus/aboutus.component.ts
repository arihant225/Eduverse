import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISocialMedia } from 'src/app/Interfaces/ISocialMedia';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {


  public socialHangouts:ISocialMedia[]=[{
    socialHangout:'linkedin',
    socialUrl:'https://www.linkedin.com/in/arihant225/',
    SocialContent:'https://www.linkedin.com/in/arihant225/'
  },
  {
    socialHangout:'envelope-at-fill',
    socialUrl:'mailto:jarihant225@gmail.com',
    SocialContent:'jarihant225@gmail.com'
  },
  {
    socialHangout:'code-slash',
    socialUrl:'https://leetcode.com/arihant225/',
    SocialContent:'https://leetcode.com/arihant225/'
  }

]
public skills:string[]=['Angular','C#','Java','.NET','SQL Server','Typescript']
constructor(public activatedRouter:ActivatedRoute,public route:Router){}  
ngOnInit(): void {
    
    window.onscroll=()=>{
      let element=document.getElementById('aboutusnav')
      if(element && element.offsetTop<window.pageYOffset+60)
      {
        element.classList.add("sticky")

      }
      else{

        element?.classList.remove("sticky")
      }
    }
  }
  public navigateTo(element:string){
    this.route.navigate(['/aboutus'],{fragment:element})   
    let HtmlElement=document.getElementById(element);
    HtmlElement?.scrollIntoView({behavior:'smooth'})

  }

}
