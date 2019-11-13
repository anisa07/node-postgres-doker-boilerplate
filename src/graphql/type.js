const graphql = require("graphql");
const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLObjectType } = graphql;

/*Example GraphQL type of table record*/
const EventType = new GraphQLObjectType({
	name: "Event",
	type: "Query",
	fields:() => {
		return {
			id: { type: GraphQLString },
			name: { type: GraphQLString },
			description: { type: GraphQLString },
			guests: { type: new GraphQLList(GraphQLString) },
			start_date: { type: GraphQLString },
			end_date: { type: GraphQLString }
		}
	}
});

module.exports = {
	EventType
};
