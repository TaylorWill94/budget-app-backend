const transactionsArray = require("./models/transactions.js");
// DEPENDENCIES 
const express = require("express");
// ALLOWS BACKEND TO ACCEPT REQUESTS FROM OTHER PORTS
const cors = require("cors");
//const { response, request } = require("express");
// CREATES THE EXPRESS APP
const app = express();

// Connects other PORTS and allows requests from them
// Requests from the backend
app.use(cors());
// Middleware that parses incoming information as JSON
app.use(express.json());

app.get('/', (request, response) => {
    console.log("Getting the ('/') route");
    response.send('Welcome to the Budget App')
});

app.get('/transactions', (request, response) => {
    console.log("Getting route ('/transactions')");
    console.log(request);
    response.json(transactionsArray)
});

app.get('/transactions/:index', (request, response) => {
    if (transactionsArray[request.params.index]) {
        console.log("Getting individual transaction")
        response.send(transactionsArray[request.params.index]);
    } else {
        response.status(404).json({ error: "Transaction not found"})
    }
});

app.post('/transactions', (request, response) => {
    // console.log(transactionsArray, 'Before adding')
    console.log(request.body)
    transactionsArray.push(request.body);
    // console.log(transactionsArray, 'After adding')
    response.status(201).json(transactionsArray);
});

app.delete('/transactions/:index', (request, response) => {
    if (transactionsArray[request.params.index]) {
        const [deletedTransaction] = 
        transactionsArray.splice(request.params.index, 1);
        response.status(200).json(deletedTransaction)
    }
});

app.put('/transactions/:index', (request, response) => {
    transactionsArray[request.params.index] = request.body;
    response.status(200).json(transactionsArray);
})

module.exports = app;