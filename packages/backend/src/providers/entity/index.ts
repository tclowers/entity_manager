// import { sql } from 'slonik';
import { query } from '../database';
import { v4 as uuidv4 } from 'uuid';
import { EntityField } from '/models/entity-field';
import { Entity } from '/models/entity';
import { escape } from 'sqlstring';
import { FieldTypes } from '/constants/field-types';
import { FieldClasses } from '/constants/field-classes';

export async function saveModel( name: string, fields: EntityField[]) {
  const id = uuidv4();
  const tableName = generateTableName(name);
  const insert_entity_code = `
    INSERT INTO entities (id, name, table_name)
    VALUES ($1, $2, $3)
  `;
  const result = await query(insert_entity_code, [id, name, tableName]);

  await fields.map(async ({name, field_type_id, field_class_id, value_function}:EntityField) => {
    const fields_insert = `
      INSERT INTO entity_fields (name, column_name, entity_id, field_type_id, field_class_id, value_function)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const columnName = generateColumnName(name);
    const fields_values = [name, columnName, id, field_type_id, field_class_id, escape(value_function)];
    await query(fields_insert, fields_values);
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

// Should validate and sanitize table name for SQL code
const generateTableName = (name:string) => {
  const tenantName = "tenant_"; // take input from tenancy here
  return tenantName + name.toLowerCase().replaceAll(" ", "_");
}

// Should validate and sanitize column name for SQL code
const generateColumnName = (name:string) => {
  return name.replaceAll(" ", "_");
}

const fieldTypeColumnType = (field_type_id:string) => {
  switch (field_type_id) {
    case FieldTypes.Integer:
      return "INTEGER"
    default:
      return "VARCHAR(255)";
  } 
}

export async function createTable( name: string, fields: EntityField[]) {
  const tableName = generateTableName(name);
  const tableHeader =`CREATE TABLE IF NOT EXISTS ${tableName} (\n\tid uuid NOT NULL DEFAULT uuid_generate_v4(),\n\t`;

  const columns:string[] = fields.map(({name, field_type_id, field_class_id, value_function}:EntityField) => {
    const columnName = generateColumnName(name);
    const columnType = fieldTypeColumnType(field_type_id);
    const nullable = field_class_id == FieldClasses.Required ? " NOT NULL" : ""
    return columnName + " " + columnType + nullable;
  });

  const tableBody = columns.join(",\n\t");

  const pKeyConstraintName = "pk_" + tableName

  const tableFooter = `,\n\tCONSTRAINT ${pKeyConstraintName} PRIMARY KEY (id)\n);`;

  const createTableSQL = tableHeader + tableBody + tableFooter;

  console.log("\n\nCreating table: %s\n\n", createTableSQL);

  const result = await query(createTableSQL, []);

  return { "result": true };
}

export async function create({ name, fields }: Entity) {
  const result = await saveModel(name, fields);
  const tableResult = await createTable(name, fields);
  return result
}

export async function update(entityId: string, { name, fields }: Entity) {
  // Update entity record
  const insert_entity_code = `
    UPDATE entities
      SET name = $1
    WHERE id = $2
  `;
  const entity_values = [name, entityId];

  var resultRows!: number;
  try{
    const result = await query(insert_entity_code, entity_values);
    resultRows = +result.rows
  } catch (error) {
    console.error(error);
  }

  const delete_fields_code = `
    DELETE FROM entity_fields
    WHERE entity_id = $1
  `;

  try{
    await query(delete_fields_code, [entityId]);
  } catch (error) {
    console.error(error);
  }

  // Update entity fields based on update payload
  fields.map(async ({id, name, field_type_id, field_class_id, value_function}:EntityField) => {
    const fieldId = id as string
    const fields_insert = `
      INSERT INTO entity_fields (id, name, entity_id, field_type_id, field_class_id, value_function)
        VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO UPDATE 
        SET
          name = EXCLUDED.name, 
          field_type_id = EXCLUDED.field_type_id,
          field_class_id = EXCLUDED.field_class_id,
          value_function = EXCLUDED.value_function
    `;
    const fields_values = [
      fieldId,
      name,
      entityId,
      field_type_id,
      field_class_id,
      escape(value_function)
    ];
    try {
      await query(fields_insert, fields_values);
    } catch (error) {
      console.error(error);
    }    
  });  

  ///////////////////////////////////////////////////////////
  /// It should be possible to do this with a transaction ///
  ///////////////////////////////////////////////////////////

  return { "rows": resultRows + fields.length };
}

export type EntityResult = {
  row_to_json: Entity;
}
export async function fetch(id: string) {
  const sql_code = `
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
        json_agg(field_types) AS fieldType,
        json_agg(field_classes) AS fieldClass
      FROM entity_fields
      LEFT JOIN field_types ON field_types.id = entity_fields.field_type_id
      LEFT JOIN field_classes ON field_classes.id = entity_fields.field_class_id
      GROUP BY entity_fields.id
      ORDER by entity_fields.id
    ), entities AS (
      SELECT
        entities.*,
        json_agg(entity_fields) AS fields
      FROM entities
      LEFT JOIN entity_fields ON entity_fields.entity_id = entities.id
      GROUP BY entities.id
      ORDER by entities.id
    )
    SELECT row_to_json(entities)
    FROM entities WHERE entities.id=$1
  `;
  const results = await query(sql_code, [id]);

  const resultRow: EntityResult = results?.rows[0] as EntityResult
  return resultRow?.row_to_json;
}

export async function list() {
  const sql_code = `
      SELECT
        entities.*
      FROM entities
      GROUP BY entities.id
      ORDER by entities.id
  `;
  const results = await query(sql_code,[]);

  return results?.rows;
}

export async function destroy(id: string) {
  const sql_code = `
    DELETE
    FROM entities
    WHERE entities.id=$1
  `;
  const results = await query(sql_code, [id]);

  return 1;
}