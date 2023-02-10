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

const vmSandbox = {
    console: {
        log: (message: string) => {
        console.log(message);
        }
    }
};

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

app.listen(port, () => {
  console.log(`Logic Engine running on http://localhost:${port}`);
});