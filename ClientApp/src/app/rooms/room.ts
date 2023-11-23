import { ITopic } from '../topics/topic';
//A defined interface for the class Room:
export interface IRoom {
  RoomId: number;
  RoomName: string;
  CategoryId: number;
  topic?: ITopic[];
}
