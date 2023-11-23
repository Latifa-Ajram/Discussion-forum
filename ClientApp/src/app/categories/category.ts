import { IRoom } from '../rooms/room';
//A defined interface for the class Category:
export interface ICategory {
  CategoryId: number;
  CategoryName: string;
  rooms?: IRoom[];
}
