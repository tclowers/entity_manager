import { sql } from 'slonik';
import { query, pool } from '../database';
import { v4 as uuidv4 } from 'uuid';
import { EntityField } from '/models/entity-field';
import { Entity } from '/models/entity';
import { escape } from 'sqlstring';



export async function create({ name, fields }: Entity) {
  const id = uuidv4();
  const insert_entity_code = sql`
        INSERT INTO entities (id, name)
          VALUES (${id}, ${name})
    `;
  const result = await query(insert_entity_code);

  await fields.map(async ({name, type, fieldClass, valueFunction}:EntityField) => {
    const fields_insert = sql`
      INSERT INTO entity_fields (name, entity_id, field_type_id, field_class_id, value_function)
        VALUES (${name}, ${id}, ${type}, ${fieldClass}, ${escape(valueFunction)})
    `;
    await query(fields_insert);
  });

  ///////////////////////////////////////////////////////////
  /// It should be possible to do this with a transaction ///
  ///////////////////////////////////////////////////////////
  // const result = await pool.connect(async (connection) => {
  //   const transResult = await connection.transaction(async (transConnection) => {

  //     const result1 = await transConnection.query(insert_entity_code);
  
  //     await fields.map(async field => {
        // const fields_insert = sql`
        //   INSERT INTO entity_fields (name, entity_id, field_type_id, field_class_id, value_function_id)
        //     VALUES (${field.name}, ${id}, ${field.type}, ${field.fieldClass}, ${field.valueFunction})
        // `;
  //       await transConnection.query(fields_insert);
  //     });
    
  //     return result1.rows;
  //   });
  //   return transResult
  // });

  const resultRows: number = +result.rows

  return { "rows": resultRows + fields.length };
}

type EntityHeader = {
  name: string,
  id: string
}

export async function fetch(id: string) {
  const sql_code = sql`
    WITH field_types as (
      SELECT
        field_types.*
      FROM field_types
      GROUP BY field_types.id
      ORDER by field_types.id
    ), field_classes as (
      SELECT
        field_classes.*
      FROM field_classes
      GROUP BY field_classes.id
      ORDER by field_classes.id
    ), entity_fields as (
      SELECT
        entity_fields.*,
        json_agg(field_types) as field_type,
        json_agg(field_classes) as field_class
      FROM entity_fields
      LEFT JOIN field_types ON field_types.id = entity_fields.field_type_id
      LEFT JOIN field_classes ON field_classes.id = entity_fields.field_class_id
      GROUP BY entity_fields.id
      ORDER by entity_fields.id
    ), entities AS (
      SELECT
        entities.*,
        json_agg(entity_fields) as entity_fields
      FROM entities
      LEFT JOIN entity_fields ON entity_fields.entity_id = entities.id
      GROUP BY entities.id
      ORDER by entities.id
    )
    SELECT row_to_json(entities)
    FROM entities WHERE entities.id=${id}
  `;
  const results = await query(sql_code);

  return results?.rows[0];
}