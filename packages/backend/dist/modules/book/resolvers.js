"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _book = require("../../providers/book");

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
var resolvers = {
  Query: {
    books: function books() {
      return _book.list;
    }
  }
};
exports.resolvers = resolvers;