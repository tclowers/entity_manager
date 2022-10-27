/* types of fields in an entity: INTEGER, STRING, SQFOOT, DOLLAR + custom types */
CREATE TABLE field_types (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name varchar(255) NOT NULL,
    custom boolean NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_field_types PRIMARY KEY (id)
);