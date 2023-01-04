import { API_URL, API_PORT } from './config';

export enum ApiAction {
  List = 'LIST',
  Create = 'CREATE',
  Read = 'READ',
  Update = 'UPDATE',
  Destroy = 'DESTROY',
  ListOptions = 'LIST_OPTIONS',
}

export const apiRoute = (path: string): string => {
  return `${API_URL}:${API_PORT}${path}`;
};
