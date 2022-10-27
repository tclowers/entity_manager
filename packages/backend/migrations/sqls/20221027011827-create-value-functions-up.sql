/* how can the value of certain fields be derived? */
CREATE TABLE value_functions (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name varchar(255) NOT NULL,
    signature varchar(255) NOT NULL,
    code text NOT NULL,
    file_location varchar(255),
    custom boolean NOT NULL DEFAULT TRUE,
    saved boolean NOT NULL DEFAULT TRUE,
    status uuid NOT NULL DEFAULT 'bbf94426-909b-4674-8a1f-c4cbab6d8d2d', -- FINAL (not DRAFT)
    CONSTRAINT pk_value_functions PRIMARY KEY (id)
);