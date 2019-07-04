import { AxiosPromise } from "axios";

import { IPaginationState } from "./pagination.model";

export interface IPayload<T> {
  type: string;
  payload: AxiosPromise<T>;
  meta?: any;
}

export interface IGetActionParams {
  [extraProps: string]: any;
}

export declare type IPayloadResult<T> = (
  dispatch: any
) => IPayload<T> | Promise<IPayload<T>>;

export declare type IGetAllAction<T> = (props: {
  params?: any;
  pagination?: IPaginationState;
  filters?: any;
}) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export declare type IGetAllUnpaginatedAction<T> = (
  id?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export declare type IGetByIdAction<T> = (
  id?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export declare type IGetAction<T> = (
  params: IGetActionParams
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export declare type IDeleteAction<T> = (
  id?: string | number
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export declare type IPostAction<T> = (
  data?: T
) => IPayload<T> | IPayloadResult<T>;

export declare type IPutAction<T> = (
  data: T
) => IPayload<T> | IPayloadResult<T>;

export declare type IPutParamAction<T> = (
  id: string,
  data: T
) => IPayload<T> | IPayloadResult<T>;

export declare type IPostParamAction<T> = (
  id: string,
  data: T
) => IPayload<T> | IPayloadResult<T>;
