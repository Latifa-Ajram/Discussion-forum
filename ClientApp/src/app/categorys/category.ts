import { IRoom } from '../rooms/room';
export interface ICategory {
  CategoryId: number;
  CategoryName: string;
  rooms?: IRoom[];
}
