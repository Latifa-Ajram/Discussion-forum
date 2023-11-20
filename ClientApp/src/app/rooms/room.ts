import { ITopic} from '../topics/topic';
export interface IRoom {
  RoomId: number;
  RoomName: string;
  CategoryId: number; // Include CategoryId in the interface
  topic?: ITopic[];
}
