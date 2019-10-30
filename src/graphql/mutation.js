const graphql = require("graphql");
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
				end_date: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				const query = `INSERT INTO event(name, description, guests, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
				const values = [
					args.name,
					args.description,
					args.guests,
					new Date(),
					new Date(),
				];

				return pool.query(query, values)
					.then((res) => {
						console.log('res insert line', res);
						pool.end();
					})
					.catch((err) => {
						console.log('err insert line', err);
						pool.end();
					});
			}
		}
	}
});

exports.mutation = RootMutation;
