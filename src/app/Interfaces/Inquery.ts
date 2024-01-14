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
    status?:InstitutionalStatus;
    accessor?:string
    
  }
export interface ManageInstitue{
  proposals:(string|undefined)[]
  inqueries:Inquery[]
  action:InstitutionalStatus
}
  export enum InstitutionalStatus {
    Active = 'Active',
    Blocked = 'Blocked',
    Inactive = 'Inactive',
    Total = 'Total',
    Query = 'Query',
    CredentialCreated = 'CredentialCreated',
    Withdrawn = 'Withdrawn',
    Activate="Activate",
    Rejected="Rejected"
}