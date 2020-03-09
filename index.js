const express = require('express');
const shortid = require('shortid');
const server = express();

let hubs = [];

server.use(express.json()); //middleware

server.get('/', (req, res) => {
    console.log(req)
    res.status(200).json({
        message: "Hello. Welcome to the server."
    })
})

server.post('/api/hubs', (req, res) => {

    const hubInfo = {...req.body, id: shortid.generate()};
    hubs.push(hubInfo);

    res.status(201).json(hubInfo)
})

const PORT = 5000;
server.listen(PORT, () => {
console.log(`\n ** API running on http://localhost:${PORT} **\n`);

}

);
//To run the server use node index.js