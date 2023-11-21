import { IComment } from '../comments/comment';
export interface IPost {
  PostId: number;
  PostTitle: string;
  TopicId: number; //fk
  Comments?: IComment[];
}
