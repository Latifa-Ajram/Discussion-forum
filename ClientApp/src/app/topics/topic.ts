import { IPost } from '../posts/post';
export interface ITopic {
  TopicId: number;
  TopicName: string;
  RoomId: number;
  posts?: IPost[];
}
