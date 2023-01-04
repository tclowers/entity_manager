import useAxios from 'axios-hooks'
import { apiRoute, ApiAction } from './common';
import { Entity } from '../models/entity';
import axios from 'axios';

const getRoute = (action: ApiAction) => {
  switch (action) {
    case ApiAction.List:
      return apiRoute('/entities');
    case ApiAction.PickList:
      return apiRoute('/entities-list');
    default:
      return apiRoute('/entities');
  }
};

export const useEntities = (action = ApiAction.List) => {
  let options = {};
  const route = getRoute(action);
  return useAxios(route);
};

export const createEntity = async (entity: Entity) => {
  console.log("creating entity: ", entity);
  const res = await axios({
    url: getRoute(ApiAction.Create),
    method: 'post',
    data: entity
  });
  // return await res.json();
  return true;
}