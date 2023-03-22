import useAxios from 'axios-hooks'
import { apiRoute, ApiAction } from './common';
import { Entity } from '../models/entity';
import axios from 'axios';

const getRoute = (action: ApiAction, id?: string) => {
  switch (action) {
    case ApiAction.List:
      return apiRoute('/entities');
    case ApiAction.Read:
      return apiRoute('/entities/' + id);
    default:
      return apiRoute('/entities');
  }
};

export const useEntities = (action = ApiAction.List, id = '') => {
  let options = {};
  const route = getRoute(action, id);
  return useAxios(route);
};

export const createEntity = async (entity: Entity) => {
  console.log("creating entity: ", entity);
  const res = await axios({
    url: getRoute(ApiAction.Create),
    method: 'post',
    data: entity
  });
  return res.data;
}