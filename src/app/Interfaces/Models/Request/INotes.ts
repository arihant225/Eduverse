export interface INotes {
    notesId?: number | null;
    title?: string | null;
    body?: string | null;
    titleStyle?: string | null;
    bodyStyle?: string | null;
    isPrivate?:boolean
    isAuthorize?:boolean
    parentFolderId?:number|null;
}
