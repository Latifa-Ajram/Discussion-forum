import { IComment } from '../comments/comment';
//A defined interface for the class Post:
export interface IPost {
  PostId: number;
  PostTitle: string;
  PostTime: Date;
  TopicId: number; //fk
  Comments?: IComment[];
  formattedTime: string;
}
