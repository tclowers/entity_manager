"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookModule = exports.resolvers = void 0;

var _core = require("@graphql-modules/core");

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.\n\n    # This \"Book\" type defines the queryable fields for every book in our data source.\n    type Book {\n    title: String\n    author: String\n    }\n\n    # The \"Query\" type is special: it lists all of the available queries that\n    # clients can execute, along with the return type for each. In this\n    # case, the \"books\" query returns an array of zero or more Books (defined above).\n    type Query {\n    books: [Book]\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// import { resolvers } from './resolvers';
// import { typeDefs } from './type-defs';
var list = [{
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
      return list;
    }
  }
};
exports.resolvers = resolvers;
var typeDefs = (0, _apolloServer.gql)(_templateObject());
var bookModule = new _core.GraphQLModule({
  name: "BookModule",
  typeDefs: typeDefs,
  resolvers: resolvers,
  imports: []
});
exports.bookModule = bookModule;