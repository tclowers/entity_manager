"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypes = exports.FieldClasses = void 0;
const express_1 = __importDefault(require("express"));
const { VM } = require('vm2');
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
// Accept JSON request bodies
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello, Logic World!');
});
const port = process.env.PORT || 5000;
function evaluateCode(code) {
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
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// move this
var FieldClasses;
(function (FieldClasses) {
    FieldClasses["Required"] = "2ea5efde-5ab1-456b-9ad8-8fc7132b8079";
    FieldClasses["Optional"] = "3525ab51-31ce-4b6e-ad8c-422ab11c8a5d";
    FieldClasses["Derived"] = "b34ead69-dd7e-4006-9f5d-5b093e658e3f";
})(FieldClasses = exports.FieldClasses || (exports.FieldClasses = {}));
// move this
var FieldTypes;
(function (FieldTypes) {
    FieldTypes["Integer"] = "227cc35c-a475-45ad-95d5-b998b25b17b6";
    FieldTypes["String"] = "5e0cfb65-7cda-494c-844a-87bb922535da";
    FieldTypes["Entity"] = "d016d367-8e3a-40f5-a8c0-813787496f30";
})(FieldTypes = exports.FieldTypes || (exports.FieldTypes = {}));
function evaluateResource(fields) {
    let updated = true;
    while (updated) {
        updated = false;
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].fieldValue !== null || fields[i].value_function === null || fields[i].field_class_id !== FieldClasses.Derived) {
                continue;
            }
            const resourceVars = fields.reduce((obj, resource) => {
                if (resource.fieldValue !== null) {
                    obj[resource.name] = resource.fieldValue;
                }
                return obj;
            }, {});
            try {
                let resource = fields[i];
                let vm = new VM({
                    timeout: 1000,
                    sandbox: Object.assign({}, resourceVars), // provide the fields array as a sandboxed variable
                });
                resource.fieldValue = vm.run(resource.value_function);
                if (resource.field_type_id === FieldTypes.Integer) {
                    resource.fieldValue = Number(resource.fieldValue);
                }
                updated = true;
            }
            catch (e) {
                console.error(e);
                return fields.map(resource => (Object.assign(Object.assign({}, resource), { fieldValue: null })));
            }
        }
    }
    const field_values = fields.reduce((obj, { id, fieldValue }) => {
        obj[id] = fieldValue;
        return obj;
    }, {});
    return field_values;
}
app.post('/evaluate-resource', (req, res) => {
    try {
        const result = evaluateResource(req.body.resource);
        res.json({ result });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.listen(port, () => {
    console.log(`Logic Engine running on http://localhost:${port}`);
});
