/* Replace with your SQL commands */
ALTER TABLE entities
    DROP CONSTRAINT fk_entity_type;

ALTER TABLE entities
    DROP COLUMN entity_type_id;

DROP TABLE entity_types;