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
    console.log("insert resource result: %s", result);
  
    const resultRows: number = +result.rows
  
    return { "resourceId": resourceId };
}

export async function fetch({ table_name }:Entity, id: string) {
    const sql_code = `
        SELECT *
        FROM ${table_name}
        WHERE ${table_name}.id=$1
    `;
    const results = await query(sql_code, [id]);

    return results?.rows[0];
}
