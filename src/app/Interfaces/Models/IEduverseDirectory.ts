export interface IEduverseDirectory{
    folderId:number;
    folderName:string;
    noteItems:Array<NoteItems>|null;
    option:boolean;
}

export interface NoteItems{
    notesId:number;
    title:string;
}
export interface AllItems{
    directories:Array<IEduverseDirectory>;
    isolatedItemsNote:Array<NoteItems>;


}