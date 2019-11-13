const graphql = require("graphql");
const uuidv4 = require('uuid/v4')
const pool = require("../db/pool").pool;
const { GraphQLList, GraphQLString, GraphQLObjectType } = graphql;
const { EventType } = require("./type");

/*Example Add Mutation insert line into table*/
const RootMutation = new GraphQLObjectType({
	name: "RootMutationType",
	type: "Mutation",
	fields: {
		addEvent: {
			type: EventType,
			args: {
				name: { type: GraphQLString },
				description: { type: GraphQLString },
				guests: { type: new GraphQLList(GraphQLString) },
				start_date: { type: GraphQLString },
				end_date: { type: GraphQLString },
				id: {type: GraphQLString},
			},
			resolve(parentValue, args) {
				const query = `INSERT INTO events(name, description, guests, start_date, end_date, id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
				const values = [
					args.name,
					args.description,
					args.guests,
					new Date(),
					new Date(),
					uuidv4()
				];

				return pool.query(query, values)
					.then((res) => {
						console.log('res insert line', res.rows);
						return res.rows[0];
						// pool.end();
					})
					.catch((err) => {
						console.log('err insert line', err);
					//	pool.end();
					});
			}
		}
	}
});

exports.mutation = RootMutation;
