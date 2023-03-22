import { LOGIC_ENGINE_URL, LOGIC_ENGINE_PORT } from './config';

export enum ApiAction {
  List = 'LIST',
  Create = 'CREATE',
  Read = 'READ',
  Update = 'UPDATE',
  Destroy = 'DESTROY',
  ListOptions = 'LIST_OPTIONS',
}

export const logicEngineRoute = (path: string): string => {
  return `${LOGIC_ENGINE_URL}:${LOGIC_ENGINE_PORT}${path}`;
};
