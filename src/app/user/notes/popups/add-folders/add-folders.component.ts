import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IEduverseDirectory } from 'src/app/Interfaces/Models/IEduverseDirectory';
import { BackdropnotifierService } from 'src/app/services/backdropnotifier.service';
import { DirectoryService } from 'src/app/services/directory.service';

@Component({
  selector: 'app-add-folders',
  templateUrl: './add-folders.component.html',
  styleUrls: ['./add-folders.component.css']
})
export class AddFoldersComponent {
  constructor(private directoryService:DirectoryService,private notifierService:BackdropnotifierService){}
  @Input('popupState') set function(state:boolean){
    this.popupState=state;
    this.folderName.setValue('');
    this.errors=false;

  }
  errors:boolean=false;
  popupState:boolean=false;
  @Input() Folders:any[]=['Akansha'];
  folderName:FormControl=new FormControl('');
  @Output() ToggleState:EventEmitter<IEduverseDirectory|null>=new EventEmitter();

  Cancel(){

    this.ToggleState.emit(null)
  }
  preventLimit($event:KeyboardEvent){
    if(this.folderName.value.length>=50)
    $event.preventDefault();


  }
 
  CreateFolder(){

    if(this.Folders.includes(this.folderName.value.toLowerCase()))
    {
      this.errors=true;

      return;
    }
    let directory:IEduverseDirectory={
      folderId:0,
      folderName:this.folderName.value,
      noteItems:null,
      option:false
    }
    this.errors=false;
    this.notifierService.text="Wait while we are creating the directory for you"
    let resp:IEduverseDirectory|null;
    this.directoryService.Save(directory).subscribe(
      data=>{
        resp=data;
        
        
      },

      null,
      ()=>{
        
        
        
        this.notifierService.text=null;
      
        this.ToggleState.emit(resp);
      }
      
    )


   

  }



}
