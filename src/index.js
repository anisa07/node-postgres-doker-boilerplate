const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('./db/pool');

const app = express();
const port = process.env.APP_PORT;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

pool.query('SELECT NOW()', (err, res) => {
	console.log('Err', err);
	console.log('Res', res);
	pool.end()
});


app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
});
