import { IPost } from '../posts/post';
//A defined interface for the class Topic:
export interface ITopic {
  TopicId: number;
  TopicName: string;
  RoomId: number;
  posts?: IPost[];
}
