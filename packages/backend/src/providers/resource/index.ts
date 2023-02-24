import { query } from '../database';
import { v4 as uuidv4 } from 'uuid';
import { EntityField } from '/models/entity-field';
import { Entity } from '/models/entity';
import { Resource } from '/models/resource';
const {VM} = require('vm2');

const placeholder = (n: number) => "$" + String(n);

export async function create({ fields, table_name }:Entity, { fields: resourceFields }:Resource) {
    const resourceID = uuidv4();
    const insert_resource_header = `INSERT INTO ${table_name} `;

    let columns:any[] = ["id"];
    let values:any[] = [resourceID];
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
  
    return { "rows": resultRows };
  }


//   function generateDerivativeCode(valueFunction: string, replacementValues: {[key: string]: {value: any, valueType: string}}) {
//     let result = valueFunction;
//     const sortedReplacements = Object.keys(replacementValues).sort((a, b) => b.length - a.length);
//     for (const replacement of sortedReplacements) {
//         const value = replacementValues[replacement].valueType === "number" ? replacementValues[replacement].value : `'${replacementValues[replacement].value}'`;
//         result = result.replace(new RegExp(replacement, "g"), value);
//     }
//     return result;
// }

type ReplacementValue = {
    name: string,
    value: string,
    valueType: string
}

function generateDerivativeCode(valueFunction: string, values: ReplacementValue[]) {
    return values.filter(({name}: ReplacementValue) => {
        const matches = valueFunction.match(name) || [];
        return matches.length > 0
    })
    .map(({name, value, valueType}: ReplacementValue) => {
        if (valueType === "number") {
            return "let " + name + "=" + value + ";";
        } else {
            return "let " + name + "=" + `"${value}";` 
        }
    })
    .join(" ");
}

// This should probably be moved to its own service
// perhaps a "logic engine" running in a separate container
// with no database connnection, limited file system access, etc
function evaluateValueFunction(code: string) {
    const vm = new VM({
        timeout: 1000,
        allowAsync: false,
        sandbox: {}
    });
    const sanitizedCode = code.replace(/fs|process|child_process/g, '');
    return vm.run(sanitizedCode);
}