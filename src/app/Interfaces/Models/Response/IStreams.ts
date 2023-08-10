import { Icolor } from "../../IColor";

export interface IStreams {
    streamerId: number;
    streamerName: string;
    streamerType: string;
    public: number;
    image: string | null;
    streamerDescription: string;
    paid:boolean;
    price:number;
    color:Icolor|null;
  }