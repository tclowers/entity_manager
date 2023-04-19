import useAxios from 'axios-hooks'
import { apiRoute, ApiAction } from './common';
import { Resource } from '../models/resource';
import axios from 'axios';

const getRoute = (action: ApiAction, entityId: string, resourceId?: string) => {
    switch (action) {
      case ApiAction.List:
        return apiRoute('/entities/' + entityId + '/resources');
      case ApiAction.Read:
        return apiRoute('/entities/' + entityId + '/resources/' + resourceId);
      case ApiAction.Create:
        return apiRoute('/entities/' + entityId + '/resources');
      case ApiAction.Update:
        return apiRoute('/entities/' + entityId + '/resources/' + resourceId);
      default:
        return apiRoute('/entities' + entityId + '/resources');
    }
  };
  
  export const useResources = (action = ApiAction.List, entityId = '', resourceId = '') => {
    let options = {};
    const route = resourceId !== '' ? getRoute(action, entityId, resourceId) : getRoute(action, entityId);
    return useAxios(route);
  };

export const createResource = async (resource: Resource) => {
    console.log("creating resource: ", resource);
    const res = await axios({
      url: getRoute(ApiAction.Create, String(resource.id)),
      method: 'post',
      data: resource
    });
     
    return res.data;
  }