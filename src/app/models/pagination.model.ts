import { IListOrder } from './list.model';

export interface IPaginationState {
  limit: number;
  offset: number;
  page: number;
  sort: string;
  order: IListOrder;
}
