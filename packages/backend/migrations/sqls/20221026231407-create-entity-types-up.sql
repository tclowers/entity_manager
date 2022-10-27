/* types of entities: INTERNAL, EXPOSED */
CREATE TABLE entity_types (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name varchar(255) NOT NULL,
    custom boolean NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_entity_types PRIMARY KEY (id)
);