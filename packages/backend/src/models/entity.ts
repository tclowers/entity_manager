import { EntityField } from '/models/entity-field';

export type Entity = {
    name: string,
    fields: EntityField[]
}