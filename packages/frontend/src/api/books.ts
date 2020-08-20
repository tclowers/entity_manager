import useFetch from 'use-http';
import { apiRoute, ApiAction } from './common';

const getRoute = (action: ApiAction) => {
  switch (action) {
    case ApiAction.List:
      return apiRoute('/books');
    default:
      return apiRoute('/books');
  }
};

export const useBooks = (action = ApiAction.List) => {
  const options = {};
  const route = getRoute(action);
  return useFetch(route, options, []);
};
