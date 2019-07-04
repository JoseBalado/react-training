import { IPaginationState, IListOrder } from "../../models";
import { noop as _noop } from "lodash";
import { DEFAULT_ITEMS_PER_PAGE } from "../constants";

export const objectToArray = (obj: any) => {
  return Object.keys(obj).map((key: string) => {
    return { key: key, value: obj[key] };
  });
};

export const getQueryFilters = (
  keys: string[],
  filter?: any,
  pagination?: IPaginationState
) => {
  const orFilters =
    filter && filter.searchTerm
      ? {
          or: keys.map(key => {
            const obj = {} as any;
            obj[key] = { like: filter.searchTerm, options: "i" };
            return obj;
          })
        }
      : _noop();

  const filters = pagination
    ? {
        limit: pagination.limit || DEFAULT_ITEMS_PER_PAGE,
        offset: pagination.offset || 0,
        order: pagination.sort
          ? `${pagination.sort} ${pagination.order || IListOrder.ASC}`
          : _noop()
      }
    : {};
  return {
    ...filters,
    where: {
      ...orFilters
    }
  };
};
