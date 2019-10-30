const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const { pool, createTable } = require('./db/pool');
const { query } = require("./graphql/query");
const { mutation } = require("./graphql/mutation");

const schema = new GraphQLSchema({
	mutation
});

const app = express();
const port = process.env.APP_PORT;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

/* Example Create table */
const queryText =
	`CREATE TABLE IF NOT EXISTS
      events(
        id UUID PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        description VARCHAR(128),
        guests VARCHAR(128),
        start_date TIMESTAMP,
        end_date TIMESTAMP
      )`;

createTable(queryText);

app.get('/',
	expressGraphQl({
	schema: schema,
	graphql: true
	}),
	(request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
});
