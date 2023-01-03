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

  await fields.map(async field => {
    const fields_insert = sql`
      INSERT INTO entity_fields (name, entity_id, field_type_id, field_class_id, value_function)
        VALUES (${field.name}, ${id}, ${field.type}, ${field.fieldClass}, ${escape(field.valueFunction)})
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



  return result.rows;
}