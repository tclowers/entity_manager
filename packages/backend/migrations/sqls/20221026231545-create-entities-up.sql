/* individual data resources */
CREATE TABLE entities (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name varchar(255) NOT NULL,
    entity_type_id uuid NOT NULL,
    CONSTRAINT pk_entity PRIMARY KEY (id),
    CONSTRAINT fk_entity_type FOREIGN KEY (entity_type_id) REFERENCES entity_types (id)
);