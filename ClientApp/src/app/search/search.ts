import { IComment } from '../comments/comment';
import { IPost } from '../posts/post';
import { ICategory } from '../categories/category';

export interface ISearch {
  Categories?: ICategory[]; // Adjust these types based on your actual data structures
  Comments?: IComment[];
  Posts?: IPost[];
  
}
