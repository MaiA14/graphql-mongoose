const graphql = require('graphql');
const _ = require('lodash');
const Series = require('../models/series');
const Creator = require('../models/creator');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;


const SeriesType = new GraphQLObjectType({
    name: 'Series',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        creator: {
            type: CreatorType,
            resolve(parent, args) {
                console.log(parent);
                return Creator.findById(parent.creatorId);
            }
        }
    })
})

const CreatorType = new GraphQLObjectType({
    name: 'Creator',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        series: {
            type: new GraphQLList(SeriesType),
            resolve(parent, args) {
                return Series.find({ creatorId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        series: {
            type: SeriesType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Series.findById(args.id);
            }
        },
        creator: {
            type: CreatorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Creator.findById(args.id);
            }
        },
        allSeries: {
            type: new GraphQLList(SeriesType),
            resolve(parent, args) {
                return Series.find({});
            }
        },
        creators: {
            type: new GraphQLList(CreatorType),
            resolve(parent, args) {
                return Creator.find({});
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCreator: {
            type: CreatorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let creator = new Creator({
                    name: args.name,
                    age: args.age
                });
                return creator.save();
            }
        },
        addSeries: {
            type: SeriesType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                creatorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let series = new Series({
                    name: args.name,
                    genre: args.genre,
                    creatorId: args.creatorId
                });
                return series.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
}) 