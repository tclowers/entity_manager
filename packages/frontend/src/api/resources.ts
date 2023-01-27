import useAxios from 'axios-hooks'
import { apiRoute, ApiAction } from './common';
import { Resource } from '../models/resource';
import axios from 'axios';

const getRoute = (action: ApiAction, id?: string) => {
    switch (action) {
      case ApiAction.List:
        return apiRoute('/resource');
      case ApiAction.Read:
        return apiRoute('/resource/' + id);
      default:
        return apiRoute('/resource');
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
      url: getRoute(ApiAction.Create),
      method: 'post',
      data: resource
    });
    // return await res.json();
    return true;
  }