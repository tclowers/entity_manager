import useAxios from 'axios-hooks'
import { apiRoute, ApiAction } from './common';

const getRoute = (action: ApiAction) => {
  switch (action) {
    case ApiAction.List:
      return apiRoute('/field-classes');
    case ApiAction.ListOptions:
        return apiRoute('/field-classes-options');
    default:
      return apiRoute('/field-classes');
  }
};

export const useFieldClasses = (action = ApiAction.List) => {
  const options = {};
  const route = getRoute(action);
  return useAxios(route);
};
