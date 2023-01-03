ALTER TABLE entity_fields
    DROP CONSTRAINT fk_field_value_function;

ALTER TABLE entity_fields
    DROP COLUMN value_function_id;

DROP TABLE value_functions;

ALTER TABLE entity_fields
    ADD COLUMN value_function TEXT;

