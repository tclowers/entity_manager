/* elements of a particular type within an entity */
CREATE TABLE entity_fields (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name varchar(255) NOT NULL,
    entity_id uuid NOT NULL,
    field_type_id uuid NOT NULL,
    field_class_id uuid NOT NULL,
    value_function_id uuid,
    CONSTRAINT pk_entity_field PRIMARY KEY (id),
    CONSTRAINT fk_field_entity FOREIGN KEY (entity_id) REFERENCES entities (id),
    CONSTRAINT fk_field_type FOREIGN KEY (field_type_id) REFERENCES field_types (id),
    CONSTRAINT fk_field_class FOREIGN KEY (field_class_id) REFERENCES field_classes (id),
    CONSTRAINT fk_field_value_function FOREIGN KEY (value_function_id) REFERENCES value_functions (id)
);