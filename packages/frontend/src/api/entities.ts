import useAxios from 'axios-hooks'
import { apiRoute, ApiAction } from './common';
import { Entity } from '../models/entity';

const getRoute = (action: ApiAction) => {
  switch (action) {
    case ApiAction.List:
      return apiRoute('/entities');
    default:
      return apiRoute('/entities');
  }
};

export const useEntities = (action = ApiAction.List) => {
  const options = {};
  const route = getRoute(action);
  return useAxios(route);
};

export const createEntity = (entity: Entity) => {
    return useAxios({
        url: getRoute(ApiAction.Create),
        method: 'post',
        data: entity
    })
}