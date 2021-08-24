require('dotenv').config();

const express = require('express');
const db = require('./clients/db');
const seedDatabase = require('./db/seed');
const User = require('./models/User');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello World')
});

app.get('/seed', (req, res) => {
	seedDatabase().then(() => {
		res.send('success');
	})
})

app.get('/api/users', async (req, res) => {
	const usersRaw = await User.findAll();
	const users = usersRaw.map(rawUser => rawUser.get())

	res.json(users);
})

db.sync().then(() => {
	app.listen(PORT)
});