export interface IToken {
    jwtToken: string;
    username: string;
    expiration: string;
    email: string;
    roles:Array<string>
  }
  