"use strict";

var _apolloServer = require("apollo-server");

var _book = require("./modules/book");

var server = new _apolloServer.ApolloServer({
  modules: [_book.bookModule]
}); // The `listen` method launches a web server.

server.listen().then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80  Server ready at ".concat(url));
});