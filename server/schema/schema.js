const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt
      } = graphql;

// dummy data
var books = [
  {name: 'Howard Stern Comes Again', genre: 'Arts & Photography', id: '1', authorId: '1'},
  {name: 'The 5 Love Languages: The Secret to Love that Lasts', genre: 'Arts & Photography', id: '2', authorId: '2'},
  {name: 'Homebody: A Guide to Creating Spaces You Never Want to Leave', genre: 'Arts & Photography', id: '3', authorId: '3'},
  {name: 'Becoming', genre: 'Biographies & Memoirs', id: '1', authorId: '4'},
  {name: 'Educated: A Memoir', genre: 'Biographies & Memoirs', id: '5', authorId: '5'},
  {name: 'Say Nothing: A True Story of Murder and Memory in Northern Ireland', genre: 'Biographies & Memoirs', id: '6', authorId: '6'},
  {name: 'Cracking the Coding Interview: 189 Programming Questions and Solutions', genre: 'Computers & Technology', id: '7', authorId: '7'},
  {name: 'Start with Why: How Great Leaders Inspire Everyone to Take Action', genre: 'Computers & Technology', id: '8', authorId: '8'},
  {name: 'Digital Minimalism: Choosing a Focused Life in a Noisy World', genre: 'Computers & Technology', id: '9', authorId: '9'},
  {name: 'Algorithms (4th Edition)', genre: 'Programming', id: '10', authorId: ['10','11']},
  {name: 'Algorithms in C++ Part 5: Graph Algorithms (3rd Edition) (Pt.5)', genre: 'Programming', id: '11', authorId: '10'},
  {name: 'Automate This: How Algorithms Took Over Our Markets, Our Jobs, and the World', genre: 'Programming', id: '12', authorId: '12' }

];

var authors = [
  {name: 'Howard Stern', age: 51, id: '1'},
  {name: 'Gary Chapman', age: 42, id: '2'},
  {name: 'Joanna Gaines', age: 33, id: '3'},
  {name: 'Michelle Obama', age: 37, id: '4'},
  {name: 'Tara Westover', age: 22, id: '5'},
  {name: 'Patrick Radden Keefe', age: 33, id: '6'},
  {name: 'Gayle Laakmann McDowell', age: 45, id: '7'},
  {name: 'Simon Sinek', age: 49, id: '8'},
  {name: 'Cal Newport', age: 32, id: '9'},
  {name: 'Robert Sedgewick', age: 42, id: '10'},
  {name: 'Kevin Wayne', age: 32, id: '11'},
  {name: 'Christopher Steiner ', age: 35, id: '12'}
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        return _.find(authors, {id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // code to get data from DB or other source
        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // code to get data from DB or other source
        return _.find(authors, {id: args.id});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
