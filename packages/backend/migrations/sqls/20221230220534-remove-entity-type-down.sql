/* re-add table to track types of entities: INTERNAL, EXPOSED */
CREATE TABLE entity_types (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name varchar(255) NOT NULL,
    custom boolean NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_entity_types PRIMARY KEY (id)
);

/* re-populate entity_types */
INSERT INTO entity_types
    (id, name, custom)
VALUES
    ('d2dd3243-7b10-4a84-83b4-c5a140a2c512', 'internal', false),
    ('22029e3e-c3bc-412b-a80b-c8fab85f5b52', 'exposed', false);

/* re-add entity_type_id */
ALTER TABLE entities
    ADD COLUMN entity_type_id uuid NOT NULL;

ALTER TABLE entities
    ADD CONSTRAINT fk_entity_type FOREIGN KEY (entity_type_id) REFERENCES entity_types (id);
