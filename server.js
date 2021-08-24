require('dotenv').config();

const express = require('express');
const db = require('./clients/db');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello World')
});

db.sync().then(() => {
	app.listen(PORT)
});