ALTER TABLE entities
    ADD COLUMN table_name VARCHAR(255);

UPDATE entities
SET table_name=subquery.table_name
FROM (SELECT
        id,
        'tenant_' || REPLACE(LOWER(name), ' ', '_') AS table_name
      FROM entities
    ) AS subquery
WHERE entities.id=subquery.id;

ALTER TABLE entities
    ALTER COLUMN table_name SET NOT NULL;