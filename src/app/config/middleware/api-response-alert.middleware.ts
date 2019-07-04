import { AnyAction, Dispatch } from "redux";
import uuidv4 from "uuid/v4";

import { showAlert } from "../../store/alert";
import { isPromise } from "../../shared/utils/promise-utils";
import { IAlert } from "../../models";

const defaults: Partial<IAlert> = {
  id: uuidv4(),
  dismissible: true
};

const errorDefaults: Partial<IAlert> = {
  ...defaults,
  variant: "error"
};

const warningDefaults: Partial<IAlert> = {
  ...defaults,
  variant: "warning"
};

const successDefaults: Partial<IAlert> = {
  ...defaults,
  variant: "success"
};

export const apiResponseAlertMiddleware = () => (next: Dispatch<AnyAction>) => (
  action: AnyAction
) => {
  if (!isPromise(action.payload)) {
    return next(action);
  }

  return next(action)
    .then((response: any) => {
      if (action.meta && action.meta.success && action.meta.success.message) {
        const { title, message } = action.meta.success;
        next(
          showAlert({
            ...successDefaults,
            ...{
              title: title ? title : "SUCCESS.DEFAULT.TITLE",
              message: message
            }
          })
        );
      }
      return Promise.resolve(response);
    })
    .catch((error: any) => {
      if (action.meta && action.meta.error) {
        const { title, message } = action.meta.error;

        next(
          showAlert({
            ...errorDefaults,
            ...{
              title: title ? title : "ERRORS.DEFAULT.TITLE",
              message: message
            }
          })
        );
      } else if (action.meta && action.meta.warning) {
        const { title, message } = action.meta.warning;

        next(
          showAlert({
            ...warningDefaults,
            ...{
              title: title ? title : "WARNINGS.DEFAULT.TITLE",
              message: message
            }
          })
        );
      } else if (error && error.response) {
        const { data, status } = error.response;

        switch (status) {
          case 404:
            next(
              showAlert({
                ...errorDefaults,
                ...{
                  title: "ERRORS.NOT_FOUND.TITLE",
                  message: "ERRORS.NOT_FOUND.BODY"
                }
              })
            );
            break;
          case 500:
            next(
              showAlert({
                ...errorDefaults,
                ...{
                  title: "ERRORS.DEFAULT.TITLE",
                  message: "ERRORS.DEFAULT.BODY"
                }
              })
            );
            break;
          case 403:
            next(
              showAlert({
                ...warningDefaults,
                ...{
                  title: "ERRORS.UNAUTHORISED.TITLE",
                  message: "ERRORS.UNAUTHORISED.BODY"
                }
              })
            );
            break;
          case 401:
            next(
              showAlert({
                ...errorDefaults,
                ...{
                  title: "ERRORS.EXPIRED.TITLE",
                  message: "ERRORS.EXPIRED.BODY"
                }
              })
            );
            break;
          case 422:
            next(
              showAlert({
                ...warningDefaults,
                ...{
                  title: "ERRORS.VALIDATION.TITLE",
                  validationErrors: data.error
                    ? data.error.details.messages
                    : undefined
                }
              })
            );
            break;
          case 409:
            next(
              showAlert({
                ...warningDefaults,
                ...{
                  title: "ERRORS.CONFLICT.TITLE",
                  message: data.error
                    ? data.error.message
                    : "ERRORS.CONFLICT.BODY"
                }
              })
            );
            break;
          case 400:
            next(
              showAlert({
                ...errorDefaults,
                ...{
                  title: "ERRORS.CONFLICT.TITLE",
                  message: data.error
                    ? data.error.message
                    : "ERRORS.CONFLICT.BODY"
                }
              })
            );
            break;
          default:
            next(
              showAlert({
                ...errorDefaults,
                ...{
                  title: "ERRORS.DEFAULT.TITLE",
                  message: "ERRORS.DEFAULT.BODY"
                }
              })
            );
            break;
        }
      }

      return Promise.reject(error);
    });
};
