"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;
// import { list } from "../../providers/book";
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