import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INotes } from 'src/app/Interfaces/Models/Request/INotes';
import { BackdropnotifierService } from 'src/app/services/backdropnotifier.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-newnotes',
  templateUrl: './newnotes.component.html',
  styleUrls: ['./newnotes.component.css']
})

export class NewnotesComponent implements OnInit {
  private note:INotes={};
  constructor(private route: ActivatedRoute,private noteService:NoteService,private router:Router,private notiferService:BackdropnotifierService) { }
  public isPrivate=true;
  ngOnInit(): void {
    this.route.params.subscribe(data=>
      {
        this.notiferService.text=null;
        this.noteId=data["id"];
        if(this.noteId)
        {
          this.notiferService.text="wait we are setting up the content For you";
          let data:INotes;
          this.noteService.getNotes(this.noteId).subscribe(resp=>{this.note=resp},null,
            ()=>{
              this.computeconfig();
            })
        }
      })
    this.route.queryParamMap.subscribe(data => {
      this.write = data.get('editable') == 'true';

    })
    for(let i=10;i<90;i=i+2)
    {
      this.fontSizes.push(i);
      
    }
  }
  write: boolean = false;
  @Input('title') title: string = 'heading'
  @Input('title') body: string = 'start writing your content'
  changePreference($event: boolean) {

   
    

    if ($event) {
      this.write=true
      document.getElementById("noteHead")?.focus();
    }
    else{
      this.saveNotes(true);
    }

    setTimeout(() => {
      this.computeconfig();
    }, 10);
 
  }
  fontStyleIndex:number=0;
  fontSize:string='12px';
  fontSizes:number[]=[];

  changeFontSize(fontSize:string){
  
    if(this.lastActiveElement)
    this.lastActiveElement.style.fontSize=fontSize
  }
  fontcolor:any;
  activeElement(activeEle: string,compute=true) {
    this.lastActiveElement = document.getElementById(activeEle);
    if(this.lastActiveElement &&compute)
    {
      this.fontSize=getComputedStyle(this.lastActiveElement).fontSize;
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

  public noteId:number|null|undefined=0;

  public saveNotes(implicitSave:boolean=false){
    if(!implicitSave){
    this.notiferService.text="Kindly wait, we are saving your content";
    }
    this.write=true;
    this.activeElement('noteHead')
     let note:INotes={titleStyle:JSON.stringify({fontSize:this.fontSize,fontStyleIndex:this.fontStyleIndex})}
     this.activeElement('noteBody')
     note.bodyStyle=JSON.stringify({fontSize:this.fontSize,fontStyleIndex:this.fontStyleIndex});
     if(this.noteId)
    note.notesId=this.noteId;
  else
  note.notesId=0;
     note.title=this.title;
     note.body=this.body;
     note.isPrivate=this.isPrivate;
     if(implicitSave)
     {
      this.note=note;
      this.write=false;

     }
     let noteId:any=null;
     this.noteService.SaveNotes(note).subscribe(
      data=>{
        noteId=this.noteId;
this.noteId=data.notesId;
      },null,()=>{
        this.notiferService.text=null;
        if(!noteId){
        this.router.navigate(["/dashboard/newnotes",this.noteId],{
          queryParams:{editable:this.write},
        })
      }
      }
     )
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
  computeconfig(){
    console.log(this.note)
    let data:INotes=this.note;
    this.body=data.body||'';
    this.title=data.title||''
    this.isPrivate=data.isPrivate||false;
    this.activeElement('noteHead');
    if(this.lastActiveElement){
     if(data.titleStyle)
     {
      let style=JSON.parse(data.titleStyle);
   
      this.lastActiveElement.style.fontFamily=this.fontStyles[style['fontStyleIndex']].fontFamily;
      this.lastActiveElement.style.fontSize=style['fontSize']
     }
    }
    
    this.activeElement('noteBody');
    if(this.lastActiveElement){
     if(data.bodyStyle)
     {
      let style=JSON.parse(data.bodyStyle);
   
      this.lastActiveElement.style.fontFamily=this.fontStyles[style['fontStyleIndex']].fontFamily;
      this.lastActiveElement.style.fontSize=style['fontSize']
     }
    }
    
this.notiferService.text=null;
  }


}
