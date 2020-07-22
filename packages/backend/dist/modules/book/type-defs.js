"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.\n\n    # This \"Book\" type defines the queryable fields for every book in our data source.\n    type Book {\n        title: String\n        author: String\n    }\n\n    # The \"Query\" type is special: it lists all of the available queries that\n    # clients can execute, along with the return type for each. In this\n    # case, the \"books\" query returns an array of zero or more Books (defined above).\n    type Query {\n        books: [Book]\n    }\n"]);

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
exports.typeDefs = typeDefs;