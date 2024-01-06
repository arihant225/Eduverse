export interface Inquery {
    instituteName: string;
    instituteType: string;
    emailId: string;
    phoneNo: string;
    url:string
    comment?: string; // Using '?' to denote optional property
    img?: File|null; // Assuming File is the equivalent type in TypeScript for IFormFile
    path?:string;
    imgUrl?:string;
    status?:string;
    accessor?:string
    
  }
  