const graphql = require("graphql");
const pool = require("../db/pool").pool;
const { GraphQLObjectType } = graphql;
const { EventType } = require("./type");

/*Example Query*/
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	type: "Query",
	fields: {
		getEvents: {
			type: EventType,
			resolve(parentValue, args) {
				const query = `SELECT * FROM events`;

				return pool.query(query)
					.then((res) => {
						console.log('res get all lines', res);
						return res;
					//	pool.end();
					})
					.catch((err) => {
						console.log('err get all lines', err);
					//	pool.end();
					});
			}
		}
	}
});

exports.query = RootQuery;
