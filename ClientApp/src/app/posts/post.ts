import { IComment } from '../comments/comment';
//A defined interface for the class Post:
export interface IPost {
  PostId: number;
  PostTitle: string;
  TopicId: number; //fk
  CommentDescription: string;
  Comments?: IComment[];
}
