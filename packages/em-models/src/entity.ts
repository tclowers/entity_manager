import { EntityField } from './entity-field';

export type Entity = {
    id?: string,
    name: string,
    table_name?: string,
    fields: EntityField[]
}