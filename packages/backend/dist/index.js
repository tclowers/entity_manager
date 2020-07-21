"use strict";

var _apolloServer = require("apollo-server");

var _book = require("./modules/book");

var _core = require("@graphql-modules/core");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.\n\n  # This \"Book\" type defines the queryable fields for every book in our data source.\n  type Book {\n    title: String\n    author: String\n  }\n\n  # The \"Query\" type is special: it lists all of the available queries that\n  # clients can execute, along with the return type for each. In this\n  # case, the \"books\" query returns an array of zero or more Books (defined above).\n  type Query {\n    books: [Book]\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
var typeDefs = (0, _apolloServer.gql)(_templateObject());
var _books = [{
  title: 'Harry Potter and the Chamber of Secrets',
  author: 'J.K. Rowling'
}, {
  title: 'Jurassic Park',
  author: 'Michael Crichton'
}]; // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

var resolvers = {
  Query: {
    books: function books() {
      return _books;
    }
  }
}; // const bookModule = new GraphQLModule({
//     typeDefs: typeDefs,
//     resolvers: resolvers,
// });
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// const server = new ApolloServer({ typeDefs, resolvers });

var server = new _apolloServer.ApolloServer({
  modules: [_book.bookModule]
}); // The `listen` method launches a web server.

server.listen().then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80  Server ready at ".concat(url));
});