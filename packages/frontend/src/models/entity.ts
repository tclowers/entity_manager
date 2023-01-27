import { EntityField } from './entity-field';

export type Entity = {
    id?: string,
    name: string,
    fields: EntityField[]
}