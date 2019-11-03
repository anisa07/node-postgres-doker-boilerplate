const Pool = require('pg').Pool;

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port:  process.env.POSTGRES_PORT,
});

/* Example Create a table */
const createTable = (queryText) => {
	pool.query(queryText)
		.then((res) => {
			console.log('res', res);
		//	pool.end();
		})
		.catch((err) => {
			console.log('err', err);
		//	pool.end();
		});
};

module.exports = {
	pool,
	createTable
};
