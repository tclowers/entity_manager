import express from 'express';
const {VM} = require('vm2');
const bodyParser = require('body-parser')

const app = express();

// Accept JSON request bodies
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello, Logic World!');
});

const port = process.env.PORT || 5000;

function evaluateCode(code: string) {
    const vm = new VM({
        timeout: 1000,
        allowAsync: false,
        sandbox: {}
    });
    const sanitizedCode = code.replace(/fs|process|child_process/g, '');
    return vm.run(sanitizedCode);
}

app.post('/evaluate', (req, res) => {
    try {
        const result = evaluateCode(req.body.code);
        res.json({ result });
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
});

// move this
export enum FieldClasses {
    Required = '2ea5efde-5ab1-456b-9ad8-8fc7132b8079',
    Optional = '3525ab51-31ce-4b6e-ad8c-422ab11c8a5d',
    Derived = 'b34ead69-dd7e-4006-9f5d-5b093e658e3f',
}

// move this
export enum FieldTypes {
    Integer = '227cc35c-a475-45ad-95d5-b998b25b17b6',
    String = '5e0cfb65-7cda-494c-844a-87bb922535da',
    Entity = 'd016d367-8e3a-40f5-a8c0-813787496f30',
}

interface ResourceField {
    id: string;
    name: string;
    fieldValue: any | null;
    value_function: string | null;
    field_type_id: FieldTypes.String | FieldTypes.Integer;
    field_class_id: FieldClasses.Required | FieldClasses.Optional | FieldClasses.Derived;
}

function evaluateResource(fields: ResourceField[]): {[key: string]: any} {
    console.log("evaluating resource: %s\n", fields);
    let updated = true;
    while (updated) {
      updated = false;

      for (let i = 0; i < fields.length; i++) {
        if (fields[i].field_type_id === FieldTypes.Integer) {
          if ( (fields[i].fieldValue !== null && fields[i].fieldValue !== undefined && !isNaN(fields[i].fieldValue) ) || fields[i].value_function === null || fields[i].field_class_id !== FieldClasses.Derived) {
            continue;
          }
        } else {
          if ( (fields[i].fieldValue !== null && fields[i].fieldValue !== undefined ) || fields[i].value_function === null || fields[i].field_class_id !== FieldClasses.Derived)  {
            continue;
          }
        }


        const resourceVars = fields.reduce((obj, resource) => {
            if (resource.fieldValue !== null) {
              obj[resource.name] = resource.fieldValue;
            }
            return obj;
          }, {} as { [key: string]: any });

        try {
          let resource = fields[i];
          let vm = new VM({
            timeout: 1000, // set a timeout for script execution
            sandbox: { ...resourceVars }, // provide the fields array as a sandboxed variable
          });
          resource.fieldValue = vm.run(resource.value_function);
          if (resource.field_type_id === FieldTypes.Integer) {
            resource.fieldValue = Number(resource.fieldValue);
          }
          updated = true;
        } catch (e) {
          console.error(e);
          return fields.map(resource => ({...resource, fieldValue: null}));
        }
      }
    }

    const field_values = fields.reduce((obj, {id, fieldValue}: ResourceField) => {
        obj[id] = fieldValue;
        return obj;
      }, {} as {[key: string]: any});
      
    return field_values;
  }

app.post('/evaluate-resource', (req, res) => {
    try {
        const result = evaluateResource(req.body.resource);
        res.json({ result });
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
});
  

app.listen(port, () => {
  console.log(`Logic Engine running on http://localhost:${port}`);
});