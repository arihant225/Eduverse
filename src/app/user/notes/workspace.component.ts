import { Component, QueryList, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { AllItems, IEduverseDirectory } from 'src/app/Interfaces/Models/IEduverseDirectory';
import { DirectoryService } from 'src/app/services/directory.service';

@Component({
  selector: 'app-notes',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  public lastSelectedItem: number | undefined | null = null;
  public createFolderState: boolean = false;
  public AllItems: AllItems | null = null;
  folderItems: string[] = [];
  public currentFolderId:number|null=null;
  public time: Date = new Date();
  constructor(public userService: UserService, public router: Router,private route:ActivatedRoute, private directoryService: DirectoryService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {

      if (this.lastSelectedItem && this.AllItems)
        this.AllItems.directories.filter(obj => obj.folderId == this.lastSelectedItem)[0].option = false;

    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
    this.currentFolderId=data['id']
      this.getAllItems(data['id']);
    })
    
    setInterval(() => {
      this.time = new Date();
    }, 1000)
  }




  FolderFunctions($event: MouseEvent, folderId: number) {
    $event.preventDefault();
    setTimeout(() => {
      
      console.log($event.which)
      if (this.lastSelectedItem && this.AllItems)
        this.AllItems.directories.filter(obj => obj.folderId == this.lastSelectedItem)[0].option = false;
     
        if (this.AllItems)
          this.AllItems.directories.filter(obj => obj.folderId == folderId)[0].option = true;
        this.lastSelectedItem = folderId;
  
    }, 1)

  }
  newNote() {
    this.router.navigate(["/dashboard/newnotes"], { queryParams: { editable: true } })
  }
  createFolder() {
    this.createFolderState = true;
  }
  AddFolder($event: IEduverseDirectory | null) {

    if ($event != null) {
      this.AllItems?.directories.unshift($event);
      this.folderItems.push($event.folderName.toLowerCase());

    }

  }

  FolderAction(domPosition: number, id: number, action: string, $event: KeyboardEvent | null) {

    setTimeout(() => {



      if (this.AllItems) {
        let item: IEduverseDirectory = this.AllItems.directories.filter(obj => obj.folderId == id)[0]
        if (item)
          item.option = false;
        this.lastSelectedItem = null;
      }
    }, 10)

    switch(action) {

      case 'delete':
        this.directoryService.deleteDirectory(id).subscribe(data=>{
          if(this.AllItems)
          {
          this.AllItems.directories=this.AllItems.directories.filter(obj=>obj.folderId!=id);
          let item: IEduverseDirectory = this.AllItems.directories.filter(obj => obj.folderId == id)[0]
          let oldName = item.folderName;
          this.folderItems=this.folderItems.filter(obj=>obj!=oldName);
          }
        })
        break;
      case 'open':
        this.router.navigate(["/dashboard/workspace",id])
        break;
      case 'rename' :
        if (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement) {
          (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).readOnly = false;
          (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).autofocus = true;
          (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).focus();
          (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).style.background = '#5f5f81';

        
        }
        break;
      case 'renameClick' :
        if ($event && $event.key == 'Enter') {
          if (this.AllItems) {
            let item: IEduverseDirectory = this.AllItems.directories.filter(obj => obj.folderId == id)[0]
           let oldName = item.folderName;
           if(oldName==(document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).value)
           {

            (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).readOnly = true;
            (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).style.background = 'black';
            (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).autofocus = false;
            return;
           }

           if((document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).value == '')
           {
            (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).value=oldName

            alert("Folder Name cannot be empty")
            return;
           }

          if (this.folderItems.includes((document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).value.toLowerCase())) {
            (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).value=oldName
            alert("the folder with following name is already exists");
            if (this.AllItems)
              (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).innerHTML = this.AllItems.directories.filter(obj => obj.folderId == id)[0].folderName;
            return;
          }

          if (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement) {
            (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).readOnly = true;
            (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).style.background = 'black';
            (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).autofocus = false;
            if (this.AllItems) {
              let item: IEduverseDirectory = this.AllItems.directories.filter(obj => obj.folderId == id)[0]
            
              item.folderName = (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).value;
              this.directoryService.Save(item).subscribe(data => { }, null,
                () => {
                  this.folderItems.splice(this.folderItems.indexOf(oldName), 1);

                  this.folderItems.push(item.folderName.toLowerCase());
                })
         
          }
        }
      }
      }
      break;
      case 'renameBlur':
        if (this.AllItems) {
          let item: IEduverseDirectory = this.AllItems.directories.filter(obj => obj.folderId == id)[0]
         let oldName = item.folderName;
         if(oldName==(document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).value)
         {

          (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).readOnly = true;
          (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).style.background = 'black';
          (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).autofocus = false;
          return;
         }
        
        if((document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).value == '')
        {

        (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).value=oldName
         alert("Folder Name cannot be empty");
         return;
        }

       if (this.folderItems.includes((document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).value.toLowerCase())) {
        (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).value=oldName
         alert("the folder with following name is already exists");
         if (this.AllItems)
           (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).innerHTML = this.AllItems.directories.filter(obj => obj.folderId == id)[0].folderName;
         return;
       }

        if (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement) {
          (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).readOnly = true;
          (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).style.background = 'black';
          (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).autofocus = false;
          if (this.AllItems) {
            let item: IEduverseDirectory = this.AllItems.directories.filter(obj => obj.folderId == id)[0]
            let oldName = item.folderName;
            item.folderName = (document.querySelectorAll('#folderName')[domPosition] as HTMLInputElement).value;
            this.directoryService.Save(item).subscribe(data => { }, null,
              () => {
                this.folderItems.splice(this.folderItems.indexOf(oldName), 1);

                this.folderItems.push(item.folderName.toLowerCase());
              })
       
        }
      }

    }
  }    
  }
  baseDirectory:boolean=true;
  getAllItems(id:number|null) {
    if(!id)
    {
    this.baseDirectory=true;
    }
    else{
    this.baseDirectory=false;
    }
    this.directoryService.GetAllDirectories(id).subscribe(data => {
      this.AllItems = data;
    }, error=>{
      this.router.navigate(["/dashboard/workspace"])
    }, () => {
      this.AllItems?.directories.forEach(obj => {
        obj.option = false
        this.folderItems.push(obj.folderName.toLowerCase());
      })
      this.AllItems?.directories.sort((a, b) => b.folderId > a.folderId ? -1 : 1)
   

    })

  }
}
