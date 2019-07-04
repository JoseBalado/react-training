export enum IListOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export interface IListColumn {
  id: string;
  numeric: boolean;
  label: string;
  type?: string;
  key?: string;
  isTitle?: boolean;
  toBasePath?: string;
  hidden?: boolean;
  component?: React.ReactElement;
}
