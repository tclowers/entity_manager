import useAxios from 'axios-hooks'
import { apiRoute, ApiAction } from './common';
import { Resource } from '../models/resource';
import axios from 'axios';

const getRoute = (action: ApiAction, id?: string) => {
    switch (action) {
      case ApiAction.List:
        return apiRoute('/resources');
      case ApiAction.Read:
        return apiRoute('/resources/' + id);
      case ApiAction.Create:
        return apiRoute('/resources/' + id);
      default:
        return apiRoute('/resources');
    }
  };
  
  export const useResources = (action = ApiAction.List, id = '') => {
    let options = {};
    const route = getRoute(action, id);
    return useAxios(route);
  };

export const createResource = async (resource: Resource) => {
    console.log("creating resource: ", resource);
    const res = await axios({
      url: getRoute(ApiAction.Create, resource.id),
      method: 'post',
      data: resource
    });
     
    return res.data;
  }