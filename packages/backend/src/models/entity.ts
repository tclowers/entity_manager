import { EntityField } from '/models/entity-field';

export type Entity = {
    id?: string,
    name: string,
    table_name?: string,
    fields: EntityField[]
}