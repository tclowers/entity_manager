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
    SELECT *
    FROM entities
    WHERE id=${id}
  `;
  const results = await query(sql_code);

  let entity_result:EntityHeader = results?.rows[0] as EntityHeader

  const fields_sql_code = sql`
    SELECT *
    FROM entity_fields ef
    WHERE ef.entity_id =${id}
  `;
  const field_results = await query(fields_sql_code);

  const entity_nested = {
    ...entity_result,
    fields: field_results.rows
  }  
  return entity_nested;
}