import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
items?:string[]=["Home",
"About Us",
"Products/Services",
"Blog/Posts",
"Contact us",
"Login",
"About us"
]
}
