import { FieldClass } from '/models/field-class';
import { FieldType } from '/models/field-type';

export type EntityField = {
    id?: string;
    name: string;
    entity_id?: string;
    field_type_id: string;
    fieldType?: FieldType;
    field_class_id: string;
    fieldClass?: FieldClass;
    value_function: string;
}
