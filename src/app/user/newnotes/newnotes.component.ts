import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newnotes',
  templateUrl: './newnotes.component.html',
  styleUrls: ['./newnotes.component.css']
})
export class NewnotesComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(data => {
      this.write = data.get('editable') == 'true';
    })
  }
  write: boolean = false;
  @Input('title') title: string = 'heading'
  @Input('title') body: string = 'start writing your content'
  changePreference($event: boolean) {
    this.write = $event;
    if ($event) {
      document.getElementById("noteHead")?.focus();

    }

  }
  fontStyleIndex:number=0;
  activeElement(activeEle: string) {
    this.lastActiveElement = document.getElementById(activeEle);
    if(this.lastActiveElement)
    {
      let stylePart:string[]=getComputedStyle(this.lastActiveElement).fontFamily.split(",");
      let computedStyle=`'${stylePart[0].replaceAll('"','').replaceAll("'","")}',${stylePart[1]}`
     this.fontStyles.forEach((ele,index)=>{
      
      if(ele.fontFamily==computedStyle.trim())
      {
this.fontStyleIndex=index;
      }
     })

    }
  }
  @ViewChild('fontRef', { static: false }) FontRef: ElementRef | undefined;
  lastActiveElement: HTMLElement | null = null;
  lastActiveElementId: string = '';
  changeFont($event:number|string) {
    $event=parseInt(''+$event)
    if (this.lastActiveElement) {
      this.fontStyleIndex=$event
      this.lastActiveElement.style.fontFamily = this.fontStyles[$event].fontFamily;
    }
  }


  fontStyles: any[] = [
    { name: 'Compiler', fontFamily: "'Mate SC', serif" },
    { name: 'Open Sans', fontFamily: "'Open Sans', sans-serif" },
    { name: 'Montserrat', fontFamily: "'Montserrat', sans-serif" },
    { name: 'Raleway', fontFamily: "'Raleway', sans-serif" },
    { name: 'Poppins', fontFamily: "'Poppins', sans-serif" },
    { name: 'Roboto', fontFamily: "'Roboto', sans-serif" },
    { name: 'Lato', fontFamily: "'Lato', sans-serif" },
    { name: 'Nunito', fontFamily: "'Nunito', sans-serif" },
    { name: 'Quicksand', fontFamily: "'Quicksand', sans-serif" },
    { name: 'Playfair Display', fontFamily: "'Playfair Display', serif" },
    { name: 'Cormorant', fontFamily: "'Cormorant', serif" },
    { name: 'Source Serif Pro', fontFamily: "'Source Serif Pro', serif" },
    { name: 'Libre Baskerville', fontFamily: "'Libre Baskerville', serif" },
    { name: 'Cinzel', fontFamily: "'Cinzel', serif" },
    { name: 'Great Vibes', fontFamily: "'Great Vibes', cursive" },
    { name: 'Dancing Script', fontFamily: "'Dancing Script', cursive" },
    { name: 'Pacifico', fontFamily: "'Pacifico', cursive" },
    { name: 'Amatic SC', fontFamily: "'Amatic SC', cursive" },
    { name: 'Comfortaa', fontFamily: "'Comfortaa', cursive" },
    { name: 'Indie Flower', fontFamily: "'Indie Flower', cursive" },
    { name: 'Ranchers', fontFamily: "'Ranchers', cursive" },
    { name: 'Roboto Mono', fontFamily: "'Roboto Mono', monospace" },
    { name: 'Inconsolata', fontFamily: "'Inconsolata', monospace" },
    { name: 'Fira Code', fontFamily: "'Fira Code', monospace" },
    { name: 'Space Mono', fontFamily: "'Space Mono', monospace" },
  ];


}
