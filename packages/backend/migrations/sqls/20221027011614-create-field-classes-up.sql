/* how the field value is determined - REQUIRED, OPTIONAL, DERIVED */
CREATE TABLE field_classes (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name varchar(255) NOT NULL,
    CONSTRAINT pk_field_classes PRIMARY KEY (id)
);