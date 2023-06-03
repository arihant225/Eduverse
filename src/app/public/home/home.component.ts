import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public TutorsCount:number=0;
  public TuteesCount:number=0;
  public InstituteCount:number=0;

  ngOnInit(): void {
    let tutorLimit=200;
    let tuteesLimit=700;
    let instituteLimit=360;
    
    
    let Timer=setInterval(() => {
      if(tutorLimit>this.TutorsCount)
      this.TutorsCount++;
      if(tuteesLimit>this.TuteesCount)
      this.TuteesCount++;
      if(instituteLimit>this.InstituteCount)
      this.InstituteCount++;
      if(tuteesLimit==this.TuteesCount && tutorLimit== this.TutorsCount && instituteLimit == this.InstituteCount )
      {
        clearInterval(Timer)
        clearTimeout(Timer)
      }
      
    }, 1);
  }
  public educationGenres: string[] = [
    "STEM (Science, Technology, Engineering, and Mathematics)",
    "Humanities",
    "Social Sciences",
    "Arts",
    "Language Learning",
    "Health and Physical Education",
    "Vocational and Career Education",
    "Environmental Education",
    "Special Education",
    "Financial Education"
  ];



}
