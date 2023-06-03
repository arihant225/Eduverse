import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
