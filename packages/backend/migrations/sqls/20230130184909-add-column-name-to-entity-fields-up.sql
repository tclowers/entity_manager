ALTER TABLE entity_fields
    ADD COLUMN column_name VARCHAR(255);

UPDATE entity_fields
SET column_name=subquery.column_name
FROM (SELECT
        id,
        REPLACE(LOWER(name), ' ', '_') AS column_name
      FROM entity_fields
    ) AS subquery
WHERE entity_fields.id=subquery.id;

ALTER TABLE entity_fields
    ALTER COLUMN column_name SET NOT NULL;