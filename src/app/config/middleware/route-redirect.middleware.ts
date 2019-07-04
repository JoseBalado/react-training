import { AnyAction, Dispatch } from "redux";
import { IRouteRedirectType } from "../../models";
import { isPromise } from "../../shared/utils/promise-utils";
import { history } from "../history";

export const routeRedirectMiddleware = () => (next: Dispatch<AnyAction>) => (
  action: AnyAction
) => {
  const { type, meta, payload } = action;
  if (type && type.includes("_FULFILLED")) {
    const redirect = meta && meta.redirect;

    if (!isPromise(payload) && redirect) {
      const redirectType = meta.redirectType
        ? meta.redirectType
        : IRouteRedirectType.DEFAULT;

      switch (redirectType) {
        case IRouteRedirectType.EDIT:
          history.push(
            `/${meta.redirectRoute}/${payload.data.id || payload.data._id}/edit`
          );
          break;
        case IRouteRedirectType.DETAIL:
          history.push(
            `/${meta.redirectRoute}/${payload.data.id || payload.data._id}`
          );
          break;
        default:
          history.push(`/${meta.redirectRoute}`);
          break;
      }

      return next(action);
    }

    return next(action);
  }

  return next(action);
};
