"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const vmSandbox = {
    console: {
        log: (message) => {
            console.log(message);
        }
    }
};
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
app.listen(port, () => {
    console.log(`Logic Engine running on http://localhost:${port}`);
});
