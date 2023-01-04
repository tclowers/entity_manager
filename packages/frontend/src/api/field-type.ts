import useAxios from 'axios-hooks'
import { apiRoute, ApiAction } from './common';

const getRoute = (action: ApiAction) => {
  switch (action) {
    case ApiAction.List:
      return apiRoute('/field-types');
    case ApiAction.ListOptions:
        return apiRoute('/field-types-options');
    default:
      return apiRoute('/field-types');
  }
};

const typeOptions = [ 
    {label:"STRING", value:"1"},
    {label:"INTEGER",value:"2"},
    {label:"POUNDS", value:"3"},
    {label:"SQFOOT", value:"4"},
    {label:"DOLLAR",value:"5"}
  ]

export const useFieldTypes = (action = ApiAction.List) => {
  const options = {};
  const route = getRoute(action);
  return useAxios(route);
};
