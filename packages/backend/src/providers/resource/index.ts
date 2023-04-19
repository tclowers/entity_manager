import { query } from '../database';
import { v4 as uuidv4 } from 'uuid';
import { EntityField } from '/models/entity-field';
import { Entity } from '/models/entity';
import { Resource } from '/models/resource';

const placeholder = (n: number) => "$" + String(n);

export async function create({ fields, table_name }:Entity, resourceFields:any[string]) {
    const resourceId = uuidv4();
    const insert_resource_header = `INSERT INTO ${table_name} `;

    let columns:any[] = ["id"];
    let values:any[] = [resourceId];
    let columnNames:any[string] = [];
    
    fields.forEach(({id, column_name}:EntityField) => {
        columnNames[String(id)] = column_name; // set column name
    })

    let fieldIndex = 1;
    let placeHolders:any[] = [placeholder(fieldIndex)];
    fieldIndex++;

    for (const key in resourceFields) {
        columns.push(columnNames[key]);
        values.push(resourceFields[key]);
        placeHolders.push(placeholder(fieldIndex));
        fieldIndex++;
    }

    const insert_resource_columns = "(" + columns.join(",") + ")";
    const insert_resource_placeholders = "(" + placeHolders.join(",") + ")";

    const insert_resource_code = insert_resource_header + insert_resource_columns + ' VALUES ' + insert_resource_placeholders;
    console.log("\n\n insert_resource_code: %s\n\n", insert_resource_code);

    const result = await query(insert_resource_code, values);
  
    const resultRows: number = +result.rows
  
    return { "resourceId": resourceId };
}

export async function fetch({ table_name, name }:Entity, id: string) {
    // This code should get more complicated when views/faces are introduced
    // faces will be preset templates for displaying resources and
    // nesting certain objects
    const sql_code = `
        SELECT *
        FROM ${table_name}
        WHERE ${table_name}.id=$1
    `;
    const results = await query(sql_code, [id]);

    return { entity_name: name, resource: results?.rows[0] };
}

export async function list({ table_name, name }:Entity) {
    const sql_code = `
        SELECT
            t.*
        FROM ${table_name} t
        ORDER by t.id
    `;
    const results = await query(sql_code,[]);
  
    return { entity_name: name, resources: results?.rows };
}

export async function update({ fields, table_name }:Entity, id: string, resourceFields:any[string]) {
    const update_resource_header = `UPDATE ${table_name} SET `;

    let columns:any[] = [];
    let values:any[] = [];
    let columnNames:any[string] = [];
    
    fields.forEach(({id, column_name}:EntityField) => {
        columnNames[String(id)] = column_name; // set column name
    })

    let fieldIndex = 1;

    for (const key in resourceFields) {
        columns.push(columnNames[key] + " = " + placeholder(fieldIndex));
        values.push(resourceFields[key]);
        fieldIndex++;
    }

    const update_resource_columns = columns.join(",");
    const update_resource_where = " WHERE id = " + placeholder(fieldIndex);
    values.push(id);

    const update_resource_sql = update_resource_header + update_resource_columns + update_resource_where;
    console.log("\n\n update_resource_sql: %s\n\n", update_resource_sql);

    const result = await query(update_resource_sql, values);
  
    const resultRows: number = +result.rows
  
    return { "resourceId": id };
}

export async function destroy ({ table_name }:Entity, resourceId: string) {
    const sql_code = `
        DELETE FROM ${table_name}
        WHERE id=$1
    `;
    const results = await query(sql_code, [resourceId]);

    return results?.rows[0];
}
