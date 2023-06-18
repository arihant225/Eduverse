export interface IOtpRequest {
    Id: string;
    UserName: string;
    code?: number | null;
    Password?: string | null;
    Method: string;
  }
  