import { EntityField } from '/models/entity-field';

export type Entity = {
    name: string,
    table_name: string,
    fields: EntityField[]
}