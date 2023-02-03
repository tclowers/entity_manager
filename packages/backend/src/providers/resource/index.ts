import { query } from '../database';
import { v4 as uuidv4 } from 'uuid';
import { EntityField } from '/models/entity-field';
import { Entity } from '/models/entity';
import { Resource } from '/models/resource';

export async function create({ fields, table_name }:Entity, { fields: resourceFields }:Resource) {
    const resourceID = uuidv4();
    const insert_resource_header = `INSERT INTO ${table_name} (`;
    const insert_resource_footer = `)`;

    let columnNames:any[string] = [];
    
    fields.forEach(({id, column_name}:EntityField) => {
        columnNames[String(id)] = column_name;
    })

    let columns:any[] = [];
    let values:any[] = [];
    let placeHolders:any[] = [];
    let fieldIndex = 1;

    columns.push("id");
    values.push(resourceID);
    placeHolders.push("$" + String(fieldIndex))
    fieldIndex++;

    for (const key in resourceFields) {
        columns.push(columnNames[key]);
        values.push(resourceFields[key]);
        placeHolders.push("$" + String(fieldIndex));
        fieldIndex++;
    }

    const insert_resource_columns = columns.join(",");
    const insert_resource_placeholders = placeHolders.join(",")

    const insert_resource_code = insert_resource_header + insert_resource_columns + ') VALUES ('+ insert_resource_placeholders + insert_resource_footer;
    console.log("\n\n insert_resource_code: %s\n\n", insert_resource_code);

    const result = await query(insert_resource_code, values);
  
    const resultRows: number = +result.rows
  
    return { "rows": resultRows };
  }